#!/usr/bin/env python3
"""Genera la versió en castellà del web (/es/...) a partir de les pàgines en català.

Fonts de traducció, per ordre:
  1. TRANSLATIONS.es (i18n/translations.js) → elements amb data-i18n / data-i18n-html / data-i18n-placeholder
  2. i18n/es.json                  → la resta de textos ({"text en català": "texto en castellano"})
  3. TRANSLATIONS.ca → .es invers  → textos que coincideixen exactament amb una clau existent
Les URLs en castellà es defineixen a i18n/slugs-es.json ({"ruta-ca": "ruta-es"}).

Ús:
  python3 scripts/i18n.py build     regenera es/, actualitza hreflang i selector a les pàgines CA i el sitemap
  python3 scripts/i18n.py missing   llista els textos sense traducció (JSON a stdout)

Després d'editar qualsevol pàgina en català cal tornar a executar `build`.
"""
import html
import json
import os
import re
import subprocess
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://motordigital.cat'
OUT_DIR = 'es'
SKIP_DIRS = {'demos', OUT_DIR, 'scripts', 'i18n', 'node_modules', '.git', '.vercel'}

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
        'source', 'track', 'wbr'}
INLINE = {'a', 'abbr', 'b', 'br', 'code', 'em', 'i', 'img', 'mark', 'small', 'span',
          'strong', 'sub', 'sup', 'time', 'u', 's', 'q', 'cite', 'del', 'ins', 'label'}
RAW = {'script', 'style'}
TEXT_ATTRS = ('alt', 'title', 'aria-label', 'placeholder')
META_TEXT = {'description', 'og:title', 'og:description', 'twitter:title',
             'twitter:description', 'og:image:alt'}
JSONLD_SKIP_KEYS = {'@context', '@type', '@id', 'url', 'item', 'image', 'logo', 'telephone',
                    'email', 'sameAs', 'priceCurrency', 'price', 'datePublished',
                    'dateModified', 'addressCountry', 'postalCode', 'position'}
WORD = re.compile(r'[A-Za-zÀ-ÿ]{2,}')


# ── DOM mínim que preserva el text original ────────────────────────────────
class Node:
    __slots__ = ('kind', 'tag', 'attrs', 'raw', 'end', 'children', 'parent')

    def __init__(self, kind, tag=None, attrs=None, raw='', parent=None):
        self.kind, self.tag, self.attrs, self.raw = kind, tag, attrs, raw
        self.end, self.children, self.parent = '', [], parent

    def attr(self, name):
        for k, v in self.attrs or ():
            if k == name:
                return v
        return None

    def set_attr(self, name, value):
        if self.attr(name) == value:
            return
        self.attrs = [(k, v) for k, v in self.attrs if k != name] + [(name, value)]
        self.raw = start_tag(self.tag, self.attrs)

    def classes(self):
        return (self.attr('class') or '').split()

    def html(self):
        if self.kind != 'el':
            return self.raw
        return self.raw + inner(self) + self.end


def inner(n):
    return ''.join(c.html() for c in n.children)


def start_tag(tag, attrs):
    parts = [tag] + [k if v is None else f'{k}="{html.escape(v, quote=True)}"' for k, v in attrs]
    return '<' + ' '.join(parts) + '>'


class Builder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.root = Node('el', tag='#root', attrs=[])
        self.cur = self.root

    def _add(self, n):
        n.parent = self.cur
        self.cur.children.append(n)

    def _text(self, s):
        last = self.cur.children[-1] if self.cur.children else None
        if last is not None and last.kind == 'text':
            last.raw += s
        else:
            self._add(Node('text', raw=s))

    def handle_starttag(self, tag, attrs):
        n = Node('el', tag, attrs, self.get_starttag_text())
        self._add(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        self._add(Node('el', tag, attrs, self.get_starttag_text()))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is self.root:          # etiqueta de tancament òrfena: es conserva tal qual
            self._text(f'</{tag}>')
            return
        n.end = f'</{tag}>'
        self.cur = n.parent

    def handle_data(self, d): self._text(d)
    def handle_entityref(self, name): self._text(f'&{name};')
    def handle_charref(self, name): self._text(f'&#{name};')
    def handle_comment(self, d): self._add(Node('other', raw=f'<!--{d}-->'))
    def handle_decl(self, d): self._add(Node('other', raw=f'<!{d}>'))
    def handle_pi(self, d): self._add(Node('other', raw=f'<?{d}>'))
    def unknown_decl(self, d): self._add(Node('other', raw=f'<![{d}]>'))


def parse(src):
    b = Builder()
    b.feed(src)
    b.close()
    return b.root


def parse_fragment(src, parent):
    root = parse(src)
    for c in root.children:
        c.parent = parent
    return root.children


def walk(n):
    yield n
    for c in n.children:
        yield from walk(c)


def norm(s):
    return ' '.join(s.split())


def has_words(s):
    return bool(WORD.search(re.sub(r'<[^>]+>', ' ', s)))


def is_i18n(n):
    return n.kind == 'el' and (n.attr('data-i18n') is not None or n.attr('data-i18n-html') is not None)


def is_inline(n):
    if n.kind != 'el':
        return True
    if n.tag not in INLINE:
        return False
    return all(is_inline(c) for c in n.children)


def untagged_words(nodes):
    """Hi ha text amb paraules fora d'elements data-i18n?"""
    for n in nodes:
        if n.kind == 'text' and has_words(html.unescape(n.raw)):
            return True
        if n.kind == 'el' and not is_i18n(n) and untagged_words(n.children):
            return True
    return False


def text_runs(container):
    """Grups de nodes inline consecutius dins d'un contenidor de bloc."""
    run = []
    for c in container.children:
        if is_inline(c):
            run.append(c)
        else:
            if run:
                yield run
            run = []
    if run:
        yield run


# ── Rutes ─────────────────────────────────────────────────────────────────
def page_files():
    out = []
    for dirpath, dirs, files in os.walk(ROOT):
        rel = os.path.relpath(dirpath, ROOT)
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]
        for f in files:
            if f.endswith('.html'):
                out.append(os.path.normpath(os.path.join(rel, f)))
    return sorted(out)


def file_to_route(f):
    r = f[:-5]
    if r == 'index':
        return ''
    if r.endswith('/index'):
        return r[:-6]
    return r


def route_to_file(route, base=''):
    if route == '':
        return os.path.join(base, 'index.html')
    if route in ('blog',):
        return os.path.join(base, route, 'index.html')
    return os.path.join(base, route + '.html')


def url_for(route, lang, slugs):
    if lang == 'ca':
        return f'{SITE}/{route}' if route else f'{SITE}/'
    es = slugs[route]
    return f'{SITE}/es/{es}' if es else f'{SITE}/es'


def path_for(route, lang, slugs):
    return url_for(route, lang, slugs)[len(SITE):]


# ── Fonts de traducció ───────────────────────────────────────────────────
def load_translations():
    src = open(os.path.join(ROOT, 'i18n', 'translations.js'), encoding='utf-8').read()
    start = src.index('const TRANSLATIONS = ') + len('const TRANSLATIONS = ')
    end = src.index('\n};', start) + 2
    js = 'process.stdout.write(JSON.stringify((' + src[start:end] + ')))'
    out = subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


class Dict:
    def __init__(self):
        tr = load_translations()
        self.es = tr['es']
        self.reverse = {}
        for k, v in tr['ca'].items():
            if k in tr['es']:
                self.reverse.setdefault(norm(v), tr['es'][k])
        path = os.path.join(ROOT, 'i18n', 'es.json')
        self.manual = json.load(open(path, encoding='utf-8')) if os.path.exists(path) else {}
        self.missing = {}

    def key(self, k, page):
        if k in self.es:
            return self.es[k]
        self.missing.setdefault(f'[data-i18n] {k}', set()).add(page)
        return None

    def text(self, ca, page):
        k = norm(ca)
        if k in self.manual:
            return self.manual[k]
        if k in self.reverse:
            return self.reverse[k]
        self.missing.setdefault(k, set()).add(page)
        return None


# ── Transformacions ──────────────────────────────────────────────────────
def translate_tree(root, d, page):
    known = {norm(html.unescape(v)) for v in list(d.manual.values()) + list(d.reverse.values())}

    def attr_text(v):
        t = None if norm(v) in known else d.text(v, page)
        return None if t is None else html.unescape(t)

    # 1a passada: blocs de text (contingut sense data-i18n)
    def visit(n):
        if n.kind != 'el' or n.tag in RAW or n.tag in ('svg', 'head') or is_i18n(n) \
                or 'lang-switcher' in n.classes():
            return
        if is_inline(n) and n.tag != '#root':
            return
        new_children = []
        for seg in segment_runs(n):
            if isinstance(seg, Node):
                visit(seg)
                new_children.append(seg)
                continue
            raw = ''.join(c.html() for c in seg)
            t = d.text(raw, page) if untagged_words(seg) else None
            if t is None:
                new_children.extend(seg)
                continue
            lead = raw[:len(raw) - len(raw.lstrip())]
            trail = raw[len(raw.rstrip()):]
            new_children.extend(parse_fragment(lead + t + trail, n))
        n.children = new_children
    visit(root)

    # 2a passada: data-i18n, atributs, <title> i metadades
    def visit2(n):
        if n.kind != 'el' or n.tag in RAW:
            return
        for a in TEXT_ATTRS:
            v = n.attr(a)
            if v and has_words(v) and not (a == 'placeholder' and n.attr('data-i18n-placeholder')):
                t = attr_text(v)
                if t is not None:
                    n.set_attr(a, t)
        ph = n.attr('data-i18n-placeholder')
        if ph:
            t = d.key(ph, page)
            if t is not None:
                n.set_attr('placeholder', t)
        if n.tag == 'meta':
            name = n.attr('name') or n.attr('property')
            if name in META_TEXT and n.attr('content'):
                t = attr_text(n.attr('content'))
                if t is not None:
                    n.set_attr('content', t)
            return
        if n.tag == 'title':
            t = attr_text(html.unescape(inner(n)))
            if t is not None:
                n.children = [Node('text', raw=html.escape(t, quote=False), parent=n)]
            return
        k = n.attr('data-i18n')
        if k is not None:
            t = d.key(k, page)
            if t is not None:
                n.children = [Node('text', raw=html.escape(t, quote=False), parent=n)]
            return
        k = n.attr('data-i18n-html')
        if k is not None:
            t = d.key(k, page)
            if t is not None:
                n.children = parse_fragment(t, n)
            return
        for c in n.children:
            visit2(c)
    visit2(root)


def segment_runs(n):
    run = []
    for c in n.children:
        if is_inline(c):
            run.append(c)
        else:
            if run:
                yield run
                run = []
            yield c
    if run:
        yield run


def ancestors(n):
    p = n.parent
    while p is not None:
        yield p
        p = p.parent


def translate_jsonld(obj, d, page, routes, slugs):
    if isinstance(obj, dict):
        return {k: (translate_url(v, routes, slugs) if k in ('url', 'item', '@id') and isinstance(v, str)
                    else v if k in JSONLD_SKIP_KEYS
                    else translate_jsonld(v, d, page, routes, slugs))
                for k, v in obj.items()}
    if isinstance(obj, list):
        return [translate_jsonld(v, d, page, routes, slugs) for v in obj]
    if isinstance(obj, str) and has_words(obj) and not obj.startswith('http'):
        if obj.strip() == 'Motor Digital':
            return obj
        t = d.text(obj, page)
        return html.unescape(t) if t is not None else obj
    return obj


def route_of_path(path, routes):
    p = path.split('#')[0].split('?')[0]
    if p.endswith('.html'):
        p = p[:-5]
    p = p.strip('/')
    if p == 'index':
        p = ''
    if p.endswith('/index'):
        p = p[:-6]
    return p if p in routes else None


def translate_url(v, routes, slugs):
    if v.startswith(SITE):
        rest = v[len(SITE):] or '/'
        r = route_of_path(rest, routes)
        if r is not None:
            return url_for(r, 'es', slugs) + suffix(rest)
    return v


def suffix(p):
    m = re.search(r'[?#].*$', p)
    return m.group(0) if m else ''


def rewrite_links(root, page, routes, slugs):
    base = os.path.dirname(page)
    for n in walk(root):
        if n.kind != 'el' or 'lang-btn' in n.classes():
            continue
        for a in ('href', 'src'):
            v = n.attr(a)
            if not v or v.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:', '//')):
                continue
            if re.match(r'^[a-z]+:', v):
                if v.startswith(SITE) and not (n.tag == 'link' and n.attr('rel') in ('canonical', 'alternate')):
                    n.set_attr(a, translate_url(v, routes, slugs))
                continue
            absolute = v if v.startswith('/') else '/' + os.path.normpath(os.path.join(base, v.split('#')[0].split('?')[0])).lstrip('/') + suffix(v)
            if absolute.startswith('/..'):
                continue
            r = route_of_path(absolute, routes)
            if r is not None:
                n.set_attr(a, path_for(r, 'es', slugs) + suffix(v))
            elif absolute != v:
                n.set_attr(a, absolute)
        if n.tag == 'meta' and n.attr('property') == 'og:url':
            n.set_attr('content', translate_url(n.attr('content'), routes, slugs))


def set_head(root, route, lang, slugs, has_es):
    head = next(n for n in walk(root) if n.kind == 'el' and n.tag == 'head')
    # treu hreflang existents (amb l'espai que els precedeix)
    kept = []
    for c in head.children:
        if c.kind == 'el' and c.tag == 'link' and c.attr('rel') == 'alternate' and c.attr('hreflang'):
            if kept and kept[-1].kind == 'text' and not kept[-1].raw.strip():
                kept.pop()
            continue
        kept.append(c)
    head.children = kept
    canon = next((c for c in head.children if c.kind == 'el' and c.tag == 'link' and c.attr('rel') == 'canonical'), None)
    if canon is not None:
        canon.set_attr('href', url_for(route, lang, slugs))
    if has_es:
        idx = head.children.index(canon) if canon is not None else len(head.children)
        new = []
        for hl, lg in (('ca', 'ca'), ('es', 'es'), ('x-default', 'ca')):
            new += parse_fragment(f'\n  <link rel="alternate" hreflang="{hl}" href="{url_for(route, lg, slugs)}" />', head)
        if canon is not None:
            new.append(Node('text', raw='\n  ', parent=head))
            # l'espai previ al canonical passa a precedir els hreflang
            if idx > 0 and head.children[idx - 1].kind == 'text' and not head.children[idx - 1].raw.strip():
                head.children[idx - 1].raw = head.children[idx - 1].raw.rstrip(' ').rstrip('\n') or ''
        head.children[idx:idx] = new
    for n in walk(head):
        if n.kind == 'el' and n.tag == 'meta' and n.attr('property') == 'og:locale':
            n.set_attr('content', 'es_ES' if lang == 'es' else 'ca_ES')
    html_el = next(n for n in walk(root) if n.kind == 'el' and n.tag == 'html')
    html_el.set_attr('lang', lang)


def lang_switcher_html(route, lang, slugs, extra_attrs=''):
    def btn(lg, label):
        active = ' active' if lg == lang else ''
        return (f'<a class="lang-btn{active}" data-lang="{lg}" hreflang="{lg}" lang="{lg}" '
                f'href="{path_for(route, lg, slugs)}">{label}</a>')
    return (f'<div class="lang-switcher"{extra_attrs}>\n        {btn("ca", "CA")}\n        '
            f'{btn("es", "ES")}\n      </div>')


def set_switchers(root, route, lang, slugs):
    # substitueix els selectors existents (enllaços reals en lloc de botons JS)
    for n in list(walk(root)):
        if n.kind == 'el' and 'lang-switcher' in n.classes():
            style = n.attr('style')
            extra = f' style="{html.escape(style)}"' if style else ''
            frag = parse_fragment(lang_switcher_html(route, lang, slugs, extra), n.parent)
            i = n.parent.children.index(n)
            n.parent.children[i:i + 1] = frag
    # i n'afegeix on falti: barra superior (escriptori) i menú desplegable (mòbil)
    for n in list(walk(root)):
        if n.kind != 'el' or not ({'nav-right', 'nav-drawer'} & set(n.classes())):
            continue
        if any(c.kind == 'el' and 'lang-switcher' in c.classes() for c in walk(n)):
            continue
        extra = ' style="margin-bottom:1.5rem"' if 'nav-drawer' in n.classes() else ''
        indent = '\n    ' if 'nav-drawer' in n.classes() else '\n      '
        n.children[0:0] = parse_fragment(indent + lang_switcher_html(route, lang, slugs, extra), n)


def process_page(page, routes, slugs, d, lang):
    src = open(os.path.join(ROOT, page), encoding='utf-8').read()
    root = parse(src)
    route = file_to_route(page)
    has_es = route in slugs
    set_head(root, route, lang, slugs, has_es)
    if has_es:
        set_switchers(root, route, lang, slugs)
    if lang == 'es':
        translate_tree(root, d, page)
        for n in walk(root):
            if n.kind == 'el' and n.tag == 'script' and n.attr('type') == 'application/ld+json':
                data = json.loads(inner(n))
                data = translate_jsonld(data, d, page, routes, slugs)
                body = json.dumps(data, ensure_ascii=False, indent=2).replace('</', '<\\/')
                n.children = [Node('text', raw='\n  ' + body.replace('\n', '\n  ') + '\n  ', parent=n)]
        rewrite_links(root, page, routes, slugs)
    return root.html()


# ── Sitemap ──────────────────────────────────────────────────────────────
def build_sitemap(routes, slugs):
    path = os.path.join(ROOT, 'sitemap.xml')
    old = open(path, encoding='utf-8').read()
    entries = []
    for m in re.finditer(r'<url>(.*?)</url>', old, re.S):
        block = m.group(1)
        loc = re.search(r'<loc>([^<]+)</loc>', block).group(1).strip()
        if loc.startswith(f'{SITE}/es'):
            continue
        rest = loc[len(SITE):]
        r = route_of_path(rest or '/', routes)
        extra = re.findall(r'<(changefreq|priority|lastmod)>([^<]+)</\1>', block)
        entries.append((r, loc, extra))
    out = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
           '        xmlns:xhtml="http://www.w3.org/1999/xhtml">']

    def url_block(loc, r, extra):
        lines = ['  <url>', f'    <loc>{loc}</loc>']
        if r is not None and r in slugs:
            lines += [f'    <xhtml:link rel="alternate" hreflang="ca" href="{url_for(r, "ca", slugs)}" />',
                      f'    <xhtml:link rel="alternate" hreflang="es" href="{url_for(r, "es", slugs)}" />',
                      f'    <xhtml:link rel="alternate" hreflang="x-default" href="{url_for(r, "ca", slugs)}" />']
        lines += [f'    <{k}>{v}</{k}>' for k, v in extra]
        lines.append('  </url>')
        return lines

    for r, loc, extra in entries:
        out += url_block(loc, r, extra)
    for r, loc, extra in entries:
        if r is not None and r in slugs:
            out += url_block(url_for(r, 'es', slugs), r, extra)
    out.append('</urlset>')
    open(path, 'w', encoding='utf-8').write('\n'.join(out) + '\n')


# ── Ordres ───────────────────────────────────────────────────────────────
def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'build'
    pages = page_files()
    routes = {file_to_route(p) for p in pages}
    slugs = json.load(open(os.path.join(ROOT, 'i18n', 'slugs-es.json'), encoding='utf-8'))
    d = Dict()

    if cmd == 'missing':
        for p in pages:
            if file_to_route(p) in slugs:
                process_page(p, routes, slugs, d, 'es')
        json.dump([{'ca': k, 'pages': sorted(v)} for k, v in d.missing.items()],
                  sys.stdout, ensure_ascii=False, indent=1)
        return

    if cmd != 'build':
        sys.exit(__doc__)

    out_root = os.path.join(ROOT, OUT_DIR)
    if os.path.isdir(out_root):
        for dirpath, _, files in os.walk(out_root, topdown=False):
            for f in files:
                os.remove(os.path.join(dirpath, f))
            os.rmdir(dirpath)
    for p in pages:
        route = file_to_route(p)
        ca_html = process_page(p, routes, slugs, d, 'ca')
        open(os.path.join(ROOT, p), 'w', encoding='utf-8').write(ca_html)
        if route not in slugs:
            continue
        es_html = process_page(p, routes, slugs, d, 'es')
        dest = os.path.join(out_root, route_to_file(slugs[route]))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        open(dest, 'w', encoding='utf-8').write(es_html)
    build_sitemap(routes, slugs)
    if d.missing:
        print(f'⚠️  {len(d.missing)} textos sense traducció (python3 scripts/i18n.py missing)', file=sys.stderr)
        sys.exit(1)
    print(f'✓ {sum(1 for p in pages if file_to_route(p) in slugs)} pàgines generades a /{OUT_DIR}')


if __name__ == '__main__':
    main()

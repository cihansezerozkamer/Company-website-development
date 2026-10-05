"""Statik SEO, site haritası, yerel bağlantı ve varlık kontrolleri. Python standart kütüphanesi."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = 'https://xn--istkesintisizg-tjb94a.com'


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.canonical = []
        self.refs = []
        self.ids = set()
        self.h1 = []
        self.title = ''
        self.schemas = []
        self.capture = None
        self.text = ''
        self.main_count = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, f"Yinelenen id: {a['id']}"
            self.ids.add(a['id'])
        if tag == 'meta':
            key = a.get('name', a.get('property'))
            if key:
                assert key not in self.meta, f'Yinelenen meta: {key}'
                self.meta[key] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical.append(a['href'])
        for attr in ('href', 'src'):
            if attr in a:
                self.refs.append(a[attr])
        if tag == 'img':
            assert 'alt' in a, 'Görsel alt açıklaması eksik'
        if tag == 'main':
            self.main_count += 1
        if tag in ('title', 'h1') or (tag == 'script' and a.get('type') == 'application/ld+json'):
            assert self.capture is None, 'Başlık içinde geçersiz iç içe yapı'
            self.capture = tag
            self.text = ''
        elif self.capture == 'h1':
            assert tag not in ('article', 'div', 'h2', 'h3'), 'H1 içinde kart veya başlık var'

    def handle_data(self, text):
        if self.capture:
            self.text += text

    def handle_endtag(self, tag):
        if self.capture == tag:
            if tag == 'title':
                self.title = self.text.strip()
            elif tag == 'h1':
                self.h1.append(self.text.strip())
            else:
                self.schemas.append(json.loads(self.text))
            self.capture = None


def check():
    pages = {}
    for file in ROOT.glob('*.html'):
        page = Page()
        try:
            page.feed(file.read_text(encoding='utf-8'))
            assert len(page.h1) == 1 and page.h1[0], 'Tek ve dolu H1 gerekli'
            assert page.main_count == 1, 'Tek main gerekli'
            assert page.title, 'Başlık eksik'
            if file.name == 'urun-detay.html':
                assert 'noindex' in page.meta['robots'], 'Eski şablon noindex olmalı'
            else:
                expected = ORIGIN + ('/' if file.name == 'index.html' else '/' + file.name)
                assert page.canonical == [expected], 'Canonical yanlış veya yineleniyor'
                assert page.meta['description'], 'Açıklama eksik'
                assert 'noindex' not in page.meta['robots'], 'Sayfa dizine kapalı'
                assert page.meta['og:url'] == expected, 'Paylaşım adresi canonical ile farklı'
                assert page.schemas, 'Yapılandırılmış veri eksik'
                graph = page.schemas[0]['@graph']
                business = next(n for n in graph if n['@type'] == 'LocalBusiness')
                assert business['address']['addressLocality'] == 'Çekmeköy'
                assert business['telephone'] == '+905422568003'
                assert business['areaServed']['name'] == 'İstanbul'
            pages[file.name] = page
        except (AssertionError, KeyError, ValueError) as e:
            raise AssertionError(f'{file.name}: {e}') from e
    canonical_pages = {p.canonical[0] for p in pages.values() if p.canonical}
    titles = [p.title for name, p in pages.items() if name != 'urun-detay.html']
    assert len(titles) == len(set(titles)), 'Tekrarlanan sayfa başlığı'
    sitemap = ElementTree.parse(ROOT / 'sitemap.xml')
    urls = [n.text for n in sitemap.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    assert len(urls) == len(set(urls)), 'Sitemap içinde yinelenen URL'
    assert set(urls) == canonical_pages, 'Sitemap ve canonical sayfalar farklı'
    referenced = set()
    for filename, page in pages.items():
        for ref in page.refs:
            parts = urlsplit(ref)
            if parts.scheme in ('mailto', 'tel', 'data') or (parts.netloc and parts.netloc != urlsplit(ORIGIN).netloc):
                continue
            target = unquote(parts.path).lstrip('/') or (filename if not parts.netloc else 'index.html')
            if target.endswith('/'):
                target += 'index.html'
            assert (ROOT / target).is_file(), f'{filename}: eksik bağlantı/varlık {ref}'
            if target.endswith('.html'):
                referenced.add(target)
                if parts.fragment:
                    assert parts.fragment in pages[target].ids, f'{filename}: eksik hedef {ref}'
    for name, page in pages.items():
        if page.canonical and name != 'index.html':
            assert name in referenced, f'İç bağlantısı olmayan sayfa: {name}'
    robots = (ROOT / 'robots.txt').read_text(encoding='utf-8')
    assert f'Sitemap: {ORIGIN}/sitemap.xml' in robots
    assert 'Disallow: /' not in robots
    print(f'Başarılı: {len(canonical_pages)} dizine açık sayfa; başlık, H1, canonical, JSON-LD, sitemap, tüm yerel bağlantılar ve varlıklar.')


if __name__ == '__main__':
    check()

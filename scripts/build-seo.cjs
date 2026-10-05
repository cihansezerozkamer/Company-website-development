// Bağımlılık gerektirmez: node scripts/build-seo.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
const data = context.window.siteData;
const { origin, name, legalName } = data.seo;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, value) => fs.writeFileSync(path.join(root, file), value, 'utf8');
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const asset = file => `assets/images/${file}`;
const businessId = `${origin}/#business`;
const phone = `+90${data.contact.phone.replace(/\D/g, '').replace(/^0/, '')}`;
const business = {
  '@type': 'LocalBusiness', '@id': businessId, name, legalName,
  url: `${origin}/`, logo: `${origin}/assets/images/logo.png`, image: `${origin}/assets/images/logo.png`,
  description: data.footer.description, telephone: phone, email: data.contact.email,
  address: { '@type': 'PostalAddress', streetAddress: data.contact.address, addressLocality: 'Çekmeköy', addressRegion: 'İstanbul', addressCountry: 'TR' },
  areaServed: { '@type': 'City', name: 'İstanbul' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }]
};
const pages = {
  'index.html': ['İstanbul UPS ve Kesintisiz Güç Kaynağı | İST Kesintisiz Güç', 'İST Kesintisiz Güç, Çekmeköy merkezinden İstanbul genelinde UPS satışı, kesintisiz güç kaynağı kurulumu, bakım ve 7/24 teknik servis desteği sunar.', 'Ana Sayfa'],
  'hizmetler.html': ['İstanbul UPS Servisi, Bakım ve Kurulum | İST Kesintisiz Güç', 'İstanbul UPS servisi: Çekmeköy merkezli teknik servis, arıza tespiti, periyodik bakım, akü kontrolü, UPS satışı ve kurulum hizmetlerimizi inceleyin.', 'Hizmetler'],
  'urunler.html': ['UPS ve Kesintisiz Güç Kaynakları | İstanbul İST Kesintisiz Güç', 'İstanbul için UPS ve kesintisiz güç kaynakları: Line Interactive, asansör, rack ve 6–800 kVA ürün gruplarını ve teknik dokümanlarını inceleyin.', 'Ürünlerimiz'],
  'iletisim.html': ['Çekmeköy UPS İletişim ve Adres | İST Kesintisiz Güç', 'Çekmeköy, Kirazlıdere’de İST Kesintisiz Güç. İstanbul UPS satış ve servis talepleriniz için 0542 256 80 03: adres, harita ve çalışma saatleri.', 'İletişim'],
  'kurumsal.html': ['İST Kesintisiz Güç ve Enerji Sistemleri | Hakkımızda', 'Çekmeköy, İstanbul merkezli İST Kesintisiz Güç ve Enerji Sistemleri: UPS, regülatör ve endüstriyel akü sistemlerinde satış, bakım ve onarım.', 'Kurumsal'],
  'referanslar.html': ['UPS Referanslarımız | İST Kesintisiz Güç İstanbul', 'İST Kesintisiz Güç UPS ve enerji çözümlerinde birlikte çalıştığımız kurumları ve referanslarımızı inceleyin. İstanbul satış ve teknik servis desteği.', 'Referanslar'],
  'cekmekoy-ups.html': ['Çekmeköy UPS Satışı ve Teknik Servis | İST Kesintisiz Güç', 'Çekmeköy UPS satışı, kesintisiz güç kaynağı bakımı ve teknik servis. Kirazlıdere’deki İST Kesintisiz Güç merkezinden İstanbul geneline destek.', 'Çekmeköy UPS']
};
function slot(html, attr, content) {
  const start = `<!-- seo:${attr} -->`, end = `<!-- /seo:${attr} -->`;
  if (html.includes(start)) return html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}${content}${end}`);
  const re = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\b${attr}(?=[\\s=>])(?:="[^"]*")?[^>]*>)[\\s\\S]*?(</\\2>)`, 'i');
  return html.replace(re, (_, open, tag, close) => `${open}${start}${content}${end}${close}`);
}
const cards = data.products.map(p => `<article class="card product-card"><div class="product-image"><img src="${esc(asset(p.image))}" alt="${esc(p.title)}" width="640" height="405" loading="lazy"></div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><a class="btn btn-outline" href="${p.url}" aria-label="${esc(p.title)} ürününü incele">İncele</a></article>`).join('\n');
const services = data.services.map(s => `<article class="card service-card"><h3>${esc(s.title)}</h3>${s.intro ? `<p><b>${esc(s.intro)}</b></p>` : ''}${s.description ? `<p>${esc(s.description)}</p>` : ''}${s.items ? `<ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}<a class="btn btn-outline" href="${s.link}">${esc(s.button)}</a></article>`).join('\n');
const references = data.references.map(r => `<div class="reference-item${r.theme ? ` reference-item--${r.theme}` : ''}"><img src="${esc(asset(r.image))}" alt="${esc(r.name)}" loading="lazy"></div>`).join('\n');
const footer = `<footer class="footer"><div class="container footer-main"><div><a class="brand" href="index.html"><img class="brand-logo" src="assets/images/logo.png" alt="${name}"></a><p style="margin-top:20px">${esc(data.footer.description)}</p></div><div><h3>Kurumsal</h3><a href="index.html">Ana Sayfa</a><a href="kurumsal.html">Kurumsal</a><a href="urunler.html">Ürünler</a><a href="hizmetler.html">Servis &amp; Bakım</a><a href="referanslar.html">Referanslar</a><a href="iletisim.html">İletişim</a></div><div><h3>Hizmetler</h3><a href="urunler.html">UPS Satışı</a><a href="hizmetler.html">Standart Bakım</a><a href="hizmetler.html">Premium Bakım</a><a href="hizmetler.html">Teknik Servis</a><a href="cekmekoy-ups.html">Çekmeköy UPS Satış ve Servis</a></div><div><h3>İletişim</h3><p>⌖ ${esc(data.contact.address)}<br>${esc(data.contact.city)}</p><p><a href="tel:${phone}">${esc(data.contact.phone)}</a></p><p><a href="mailto:${esc(data.contact.email)}">${esc(data.contact.email)}</a></p></div></div><div class="footer-bottom"><div class="container"><span>${esc(data.footer.copyright)}</span><span>Tüm hakları saklıdır</span></div></div></footer>`;
function fill(html) {
  const slots = { 'data-products-title': data.productsTitle, 'data-services-title': data.servicesTitle, 'data-services-description': data.servicesDescription, 'data-products': cards, 'data-home-products': cards, 'data-services': services, 'data-reference-gallery': references, 'data-references-track': references, 'data-contact-description': esc(data.contact.description), 'data-contact-address': `${esc(data.contact.address)}<br>${esc(data.contact.city)}`, 'data-contact-phone': esc(data.contact.phone), 'data-contact-email': esc(data.contact.email), 'data-contact-hours': esc(data.contact.hours), 'data-footer': footer };
  for (const [attr, content] of Object.entries(slots)) html = slot(html, attr, content);
  return html.replace(/20261004-(?:copy-1|products-2)/g, '20261005-seo-1');
}
function metadata(html, file, title, description, label, product) {
  const url = file === 'index.html' ? `${origin}/` : `${origin}/${file}`;
  const graph = [business, { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name, inLanguage: 'tr-TR', publisher: { '@id': businessId } }, { '@type': file === 'iletisim.html' ? 'ContactPage' : file === 'kurumsal.html' ? 'AboutPage' : 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'tr-TR', isPartOf: { '@id': `${origin}/#website` }, about: { '@id': businessId } }];
  if (file !== 'index.html') {
    const crumbs = [{ name: 'Ana Sayfa', item: `${origin}/` }];
    if (product) crumbs.push({ name: 'Ürünlerimiz', item: `${origin}/urunler.html` });
    crumbs.push({ name: label, item: url });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, ...c })) });
  }
  if (file === 'hizmetler.html' || file === 'cekmekoy-ups.html') graph.push({ '@type': 'Service', name: label === 'Çekmeköy UPS' ? 'Çekmeköy UPS Satış ve Teknik Servis' : data.servicesTitle, description, url, provider: { '@id': businessId }, areaServed: { '@type': 'City', name: 'İstanbul' }, serviceType: ['UPS satışı ve kurulum', 'UPS teknik servis', 'Kesintisiz güç kaynağı bakımı'] });
  if (product) graph.push({ '@type': 'Product', '@id': `${url}#product`, name: product.title, description: product.description, image: `${origin}/${asset(product.image)}`, url, category: 'UPS / Kesintisiz Güç Kaynağı', mainEntityOfPage: { '@id': `${url}#webpage` } });
  const imageUrl = `${origin}/${product ? asset(product.image) : 'assets/images/logo.png'}`;
  const block = `<!-- seo:metadata -->
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="${name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${esc(product ? product.title : name)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2).replace(/</g, '\\u003c')}</script>
  <!-- /seo:metadata -->`;
  html = html.replace(/<!-- seo:metadata -->[\s\S]*?<!-- \/seo:metadata -->\s*/g, '').replace(/<title>[\s\S]*?<\/title>\s*/, `<title>${esc(title)}</title>\n  ${block}\n  `);
  return html;
}
const header = read('urun-detay.html').match(/<header\b[\s\S]*?<\/header>/)[0];
const shell = (body, attrs = '') => `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title></title><link rel="icon" type="image/png" href="assets/images/favicon.png"><link rel="stylesheet" href="tasarım.css?v=20261005-seo-1"></head><body${attrs}>
${header}
${body}
<div data-footer></div><script src="data.js?v=20261005-seo-1"></script><script src="app.js?v=20261005-seo-1"></script></body></html>\n`;
write('cekmekoy-ups.html', shell(`<div class="crumbs"><div class="container">⌂ <a href="index.html">Ana Sayfa</a><span>/</span>Çekmeköy UPS</div></div>
<main class="page"><div class="container local-seo"><h1 class="section-title">Çekmeköy UPS Satışı ve Teknik Servis</h1><p class="section-lead">İST Kesintisiz Güç, Kirazlıdere'deki merkezinden Çekmeköy ve İstanbul genelinde kesintisiz güç kaynağı satış, kurulum, bakım ve onarım desteği sunar.</p>
<div class="service-grid"><article class="card service-card"><h2>İhtiyacınıza Uygun Güç Kaynağı</h2><p>Bilgisayar ve POS sistemleri, sunucu ve network altyapısı, asansörler ve endüstriyel yükler için farklı UPS ürün gruplarımız bulunur. Cihazların toplam gücü, kurulum koşulları ve kesintide ihtiyaç duyulan çalışma süresi birlikte değerlendirilerek uygun çözüm belirlenir.</p><a class="btn btn-outline" href="urunler.html">UPS ürünlerini inceleyin</a></article>
<article class="card service-card"><h2>UPS Bakımı ve Arıza Desteği</h2><p>UPS'inizin marka ve modelini, gücünü, hata kodunu ve arıza belirtilerini paylaşarak teknik servis talebi oluşturabilirsiniz. Periyodik kontrol, akü durumu, onarım ve devreye alma ihtiyaçları değerlendirilir. Standart ve Premium bakım paketlerinin kapsamını hizmetler sayfamızda inceleyebilirsiniz.</p><a class="btn btn-outline" href="hizmetler.html">Bakım paketlerini inceleyin</a></article></div>
<section class="local-section"><h2>Çekmeköy Merkezimiz ve İstanbul Hizmet Alanı</h2><p>Adresimiz: ${esc(data.contact.address)}, ${esc(data.contact.city)}. İş yerimizi ziyaret edebilir veya İstanbul genelinde yerinde hizmet ihtiyacınız için bize ulaşabilirsiniz. Ziyaret ve servis planlamasını telefonla görüşebilirsiniz.</p><p>Çalışma saatleri: ${esc(data.contact.hours)}. Premium bakım paketinde 7/24 acil müdahale desteği bulunur.</p><p><a class="btn" href="tel:${phone}">${esc(data.contact.phone)}</a> <a class="btn btn-outline" href="iletisim.html">Adres ve harita</a></p></section>
<section class="local-section"><h2>UPS Seçimi ve Servis Hakkında</h2><h3>Kesintisiz güç kaynağı ne sağlar?</h3><p>UPS, elektrik kesildiğinde bağlı cihazları aküden besler. Çalışma süresi, yükün tüketimine ve akü kapasitesine bağlıdır. Ürün gruplarının teknik özelliklerini ilgili ürün sayfası ve dokümanından kontrol edebilirsiniz.</p><h3>Teklif için hangi bilgiler gerekir?</h3><p>Beslenecek cihazları, toplam güç ihtiyacını, istenen yedekleme süresini ve kurulum adresini paylaşın. Mevcut UPS'e servis gerekiyorsa marka, model ve hata bilgilerini de iletin.</p><h3>Çekmeköy dışında hizmet veriyor musunuz?</h3><p>Evet, Çekmeköy merkezimizden tüm İstanbul'a yerinde hizmet sunuyoruz. Talebinize göre servis kapsamını ve ziyaret planını birlikte belirliyoruz.</p></section></div></main>`));
for (const [file, [title, description, label]] of Object.entries(pages)) write(file, metadata(fill(read(file)), file, title, description, label));
for (const product of data.products) {
  const title = `${product.title}${/\bUPS\b/i.test(product.title) ? '' : ' UPS'} | İstanbul İST Kesintisiz Güç`;
  const description = `${product.title}: ${product.description} Teknik doküman, İstanbul UPS satış ve Çekmeköy teknik servis desteği için İST Kesintisiz Güç.`;
  const documentUrl = esc(asset(product.document));
  const previews = product.documentPages ? `<div class="document-pdf-pages">${product.documentPages.map((p, i) => `<a class="document-pdf-page" href="${documentUrl}#page=${i + 1}" target="_blank" rel="noopener"><img src="${esc(asset(p))}" alt="${esc(product.title)} teknik dokümanı — sayfa ${i + 1}" loading="lazy"></a>`).join('')}</div>` : `<figure class="document-figure"><img src="${esc(asset(product.image))}" alt="${esc(product.title)}" width="640" height="405"></figure><p>Teknik özellikler için ürün dokümanını indirin.</p>`;
  let html = shell(`<div class="crumbs"><div class="container">⌂ <a href="index.html">Ana Sayfa</a><span>/</span><a href="urunler.html">Ürünlerimiz</a><span>/</span>${esc(product.title)}</div></div><main class="page"><div class="container document-page"><h1 class="section-title" data-document-title>${esc(product.title)}</h1><p class="section-lead" data-document-description>${esc(product.description)}</p><div class="document-actions"><a class="btn btn-outline" href="urunler.html">← Ürünlere dön</a><a class="btn" href="${documentUrl}" data-document-download download>${/\.pdf$/i.test(product.document) ? 'PDF' : 'DOCX'} indir</a></div><article class="document-content" data-document-content aria-live="polite">${previews}</article><section class="local-section"><h2>İstanbul UPS Satış, Kurulum ve Bakım Desteği</h2><p>${esc(product.title)} ürün grubu için güç ihtiyacınızı, yedekleme sürenizi ve kurulum koşullarınızı paylaşarak teklif isteyebilirsiniz. Çekmeköy merkezimizden İstanbul genelinde satış, kurulum ve teknik servis desteği sunuyoruz.</p><p><a class="btn" href="iletisim.html">Ürün için teklif ve servis isteyin</a></p><p><a href="hizmetler.html">UPS bakım hizmetleri</a> · <a href="cekmekoy-ups.html">Çekmeköy UPS merkezimiz</a></p></section></div></main>`, ` data-product-id="${product.id}"`);
  write(product.url, metadata(fill(html), product.url, title, description, product.title, product));
}
let legacy = fill(read('urun-detay.html'));
if (!legacy.includes('name="robots"')) legacy = legacy.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>');
legacy = slot(legacy, 'data-document-content', `<p>Ürününüzün güncel sayfasını açmak için <a href="urunler.html">UPS ürünlerini inceleyin</a>.</p><ul>${data.products.map(p => `<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')}</ul>`);
write('urun-detay.html', legacy);
const urls = [...Object.keys(pages).map(f => f === 'index.html' ? `${origin}/` : `${origin}/${f}`), ...data.products.map(p => `${origin}/${p.url}`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`SEO üretimi tamamlandı: ${urls.length} canonical sayfa ve eski ürün bağlantısı uyumluluğu.`);

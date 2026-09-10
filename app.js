document.addEventListener("DOMContentLoaded", () => {
  const data = window.siteData;
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");
  const drop = document.querySelector(".drop");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
  if (drop) drop.querySelector(".drop-toggle").addEventListener("click", () => drop.classList.toggle("open"));

 

  const renderProducts = () => {
    const grids = document.querySelectorAll("[data-products], [data-home-products]");
    if (!grids.length) return;
    const title = document.querySelector("[data-products-title]");
    if (title) title.textContent = data.productsTitle;
    const cards = data.products.map((product) => `
      <article class="card product-card">
        <div class="product-image"><img src="assets/images/${product.image}" alt="${product.title}" loading="lazy"></div>
        <h3>${product.title}</h3><p>${product.description}</p>
        <a class="btn btn-outline" href="iletisim.html">İncele</a>
      </article>`).join("");
    grids.forEach((grid) => { grid.innerHTML = cards; });
    const homeGrid = document.querySelector("[data-home-products]");
    if (homeGrid) {
      const carousel = homeGrid.closest(".home-products-carousel");
      const move = (direction) => homeGrid.scrollBy({ left: direction * Math.max(260, homeGrid.clientWidth * .72), behavior: "smooth" });
      carousel.querySelector("[data-product-prev]").addEventListener("click", () => move(-1));
      carousel.querySelector("[data-product-next]").addEventListener("click", () => move(1));
    }
  };

  const renderReferences = () => {
    const track = document.querySelector("[data-references-track]");
    if (!track) return;
    track.innerHTML = data.references.map((reference) => `
      <div class="reference-item"><img src="assets/images/${reference.image}" alt="${reference.name}" loading="lazy"></div>
    `).join("");
    const carousel = track.closest(".reference-carousel");
    const previous = carousel.querySelector("[data-reference-prev]");
    const next = carousel.querySelector("[data-reference-next]");
    const move = (direction) => track.scrollBy({ left: direction * Math.max(220, track.clientWidth * .72), behavior: "smooth" });
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
  };

  const renderCatalog = () => {
    const catalog = document.querySelector("[data-catalog]");
    if (!catalog) return;
    catalog.querySelector("[data-catalog-eyebrow]").textContent = data.catalog.eyebrow;
    catalog.querySelector("[data-catalog-title]").textContent = data.catalog.title;
    catalog.querySelector("[data-catalog-description]").textContent = data.catalog.description;
    catalog.querySelector("[data-catalog-link]").href = data.catalog.file;
  };

  const renderServices = () => {
    const grid = document.querySelector("[data-services]");
    if (!grid) return;
    const title = document.querySelector("[data-services-title]");
    const description = document.querySelector("[data-services-description]");
    if (title) title.textContent = data.servicesTitle;
    if (description) description.textContent = data.servicesDescription;
    grid.innerHTML = data.services.map((service) => `
      <article class="card service-card"><h3>${service.title}</h3>
      ${service.intro ? `<p><b>${service.intro}</b></p>` : ""}
      ${service.description ? `<p>${service.description}</p>` : ""}
      ${service.items ? `<ul>${service.items.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
      <a class="btn btn-outline" href="${service.link}">${service.button}</a></article>`).join("");
  };

  const renderContact = () => {
    const contact = data.contact;
    document.querySelectorAll("[data-contact-address]").forEach((el) => { el.innerHTML = `${contact.address}<br>${contact.city}`; });
    document.querySelectorAll("[data-contact-phone]").forEach((el) => { el.textContent = contact.phone; });
    document.querySelectorAll("[data-contact-email]").forEach((el) => { el.textContent = contact.email; });
    document.querySelectorAll("[data-contact-hours]").forEach((el) => { el.textContent = contact.hours; });
    const description = document.querySelector("[data-contact-description]");
    if (description) description.textContent = contact.description;
    const map = document.querySelector("[data-map]");
    if (map) map.innerHTML = `<iframe src="${data.map.embedUrl}" title="ist kesintisiz güç konumu" loading="lazy"></iframe>`;
  };

  document.querySelectorAll("[data-footer]").forEach((slot) => {
    slot.outerHTML = `<footer class="footer"><div class="container footer-main">
      <div><a class="brand" href="index.html"><img class="brand-logo" src="assets/images/logo.png" alt="ist kesintisiz güç"></a><p style="margin-top:20px">${data.footer.description}</p></div>
      <div><h3>Kurumsal</h3><a href="index.html">Anasayfa</a><a href="kurumsal.html">Kurumsal</a><a href="urunler.html">Ürünler</a><a href="hizmetler.html">Servis &amp; Bakım</a><a href="iletisim.html">İletişim</a></div>
      <div><h3>Hizmetler</h3><a href="urunler.html">UPS Satışı</a><a href="hizmetler.html">Standart Bakım</a><a href="hizmetler.html">Premium Bakım</a><a href="hizmetler.html">Teknik Servis</a></div>
      <div><h3>İletişim</h3><p>⌖ <span data-contact-address></span></p><p>⌕ <span data-contact-phone></span></p><p>✉ <span data-contact-email></span></p></div>
    </div><div class="footer-bottom"><div class="container"><span>${data.footer.copyright}</span><span>Tüm hakları saklıdır</span></div></div></footer>`;
  });
  renderProducts();
  renderReferences();
  renderCatalog();
  renderServices();
  renderContact();

  const form = document.querySelector("#contact-form");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.querySelector(".notice").style.display = "block";
    form.reset();
  });
});

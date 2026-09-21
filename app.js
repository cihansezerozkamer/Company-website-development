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
        <a class="btn btn-outline" href="urun-detay.html?urun=${encodeURIComponent(product.id)}">İncele</a>
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
    const gallery = document.querySelector("[data-reference-gallery]");
    if (!track && !gallery) return;
    const references = data.references.map((reference) => `
      <div class="reference-item${reference.theme ? ` reference-item--${reference.theme}` : ""}"><img src="assets/images/${reference.image}" alt="${reference.name}" loading="lazy"></div>
    `).join("");
    if (track) track.innerHTML = references;
    if (gallery) gallery.innerHTML = references;
    if (!track) return;
    const carousel = track.closest(".reference-carousel");
    const previous = carousel.querySelector("[data-reference-prev]");
    const next = carousel.querySelector("[data-reference-next]");
    const move = (direction) => track.scrollBy({ left: direction * Math.max(220, track.clientWidth * .72), behavior: "smooth" });
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
  };

  const renderHomeSlider = () => {
    const slider = document.querySelector("[data-home-slider]");
    if (!slider || !data.homeSlides?.length) return;
    let active = 0;
    slider.innerHTML = `<div class="home-slider-media">${data.homeSlides.map((slide, index) =>
      `<div class="home-slide${index === 0 ? " is-active" : ""}">${slide.type === "video"
        ? `<video controls playsinline preload="metadata" aria-label="${slide.alt}"><source src="assets/images/${slide.src}" type="video/mp4"></video>`
        : `<img src="assets/images/${slide.src}" alt="${slide.alt}" loading="${index ? "lazy" : "eager"}">`}</div>`).join("")}</div>
      <button class="home-slider-arrow previous" type="button" aria-label="Önceki slayt">‹</button><button class="home-slider-arrow next" type="button" aria-label="Sonraki slayt">›</button>
      <div class="home-slider-dots">${data.homeSlides.map((slide, index) => `<button type="button" aria-label="${slide.alt}" class="${index === 0 ? "is-active" : ""}"></button>`).join("")}</div>`;
    const slides = [...slider.querySelectorAll(".home-slide")];
    const dots = [...slider.querySelectorAll(".home-slider-dots button")];
    const setRatio = (slide) => {
      const media = slide.querySelector("img, video");
      const width = media.videoWidth || media.naturalWidth;
      const height = media.videoHeight || media.naturalHeight;
      slider.style.aspectRatio = width && height ? `${width} / ${height}` : "16 / 9";
    };
    let timer;
    const stopTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
    const nextImageIndex = () => {
      for (let offset = 1; offset <= slides.length; offset++) {
        const index = (active + offset) % slides.length;
        if (!slides[index].querySelector("video")) return index;
      }
      return active;
    };
    const startTimer = () => {
      stopTimer();
      if (slides[active].querySelector("video") || document.hidden) return;
      timer = setTimeout(() => { show(nextImageIndex()); }, 6000);
    };
    const show = (index, playVideo = false) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === active);
        const video = slide.querySelector("video");
        if (video && i !== active) video.pause();
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === active));
      setRatio(slides[active]);
      const video = slides[active].querySelector("video");
      slider.classList.toggle("is-video-active", Boolean(video));
      if (video && playVideo) video.play().catch(() => {});
      startTimer();
    };
    slider.querySelector(".previous").addEventListener("click", () => show(active - 1, true));
    slider.querySelector(".next").addEventListener("click", () => show(active + 1, true));
    dots.forEach((dot, index) => dot.addEventListener("click", () => show(index, true)));
    slides.forEach((slide) => {
      const media = slide.querySelector("img, video");
      const updateRatio = () => { if (slide.classList.contains("is-active")) setRatio(slide); };
      media.addEventListener("load", updateRatio);
      media.addEventListener("loadedmetadata", updateRatio);
      if (media.tagName === "VIDEO") {
        media.addEventListener("play", stopTimer);
        media.addEventListener("ended", () => { if (slide.classList.contains("is-active")) show(active + 1); });
      }
    });
    slider.addEventListener("mouseenter", stopTimer);
    slider.addEventListener("mouseleave", startTimer);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { slides.forEach((slide) => slide.querySelector("video")?.pause()); stopTimer(); }
      else startTimer();
    });
    show(0);
  };

  const unzipDocxEntry = async (buffer, filename) => {
    const view = new DataView(buffer); const bytes = new Uint8Array(buffer);
    let end = bytes.length - 22;
    while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end--;
    if (end < 0) throw new Error("DOCX arşivi okunamadı.");
    let offset = view.getUint32(end + 16, true);
    const decoder = new TextDecoder();
    for (let count = 0; count < view.getUint16(end + 10, true); count++) {
      if (view.getUint32(offset, true) !== 0x02014b50) break;
      const compressed = view.getUint32(offset + 20, true); const method = view.getUint16(offset + 10, true);
      const nameLength = view.getUint16(offset + 28, true); const extraLength = view.getUint16(offset + 30, true); const commentLength = view.getUint16(offset + 32, true);
      const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLength)); const local = view.getUint32(offset + 42, true);
      if (name === filename) {
        const localNameLength = view.getUint16(local + 26, true); const localExtraLength = view.getUint16(local + 28, true);
        const source = bytes.slice(local + 30 + localNameLength + localExtraLength, local + 30 + localNameLength + localExtraLength + compressed);
        if (method === 0) return source;
        if (method === 8 && "DecompressionStream" in window) return new Uint8Array(await new Response(new Blob([source]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
        throw new Error("Tarayıcınız DOCX sıkıştırmasını desteklemiyor.");
      }
      offset += 46 + nameLength + extraLength + commentLength;
    }
    throw new Error("Doküman içeriği bulunamadı.");
  };

  const renderDocument = async () => {
    const content = document.querySelector("[data-document-content]");
    if (!content) return;
    const product = data.products.find((item) => item.id === new URLSearchParams(location.search).get("urun"));
    if (!product) { content.textContent = "Ürün bulunamadı."; return; }
    document.querySelector("[data-document-title]").textContent = product.title;
    document.querySelector("[data-document-description]").textContent = product.description;
    const download = document.querySelector("[data-document-download]");
    if (!product.document) { download.hidden = true; content.innerHTML = `<p>Bu ürün için teknik doküman yakında eklenecektir.</p>`; return; }
    download.href = `assets/images/${product.document}`;
    try {
      const response = await fetch(download.href);
      if (!response.ok) throw new Error("Doküman yüklenemedi.");
      const archive = await response.arrayBuffer();
      const decodeEntry = async (name) => new TextDecoder().decode(await unzipDocxEntry(archive, name));
      const xml = new DOMParser().parseFromString(await decodeEntry("word/document.xml"), "application/xml");
      const relationshipXml = new DOMParser().parseFromString(await decodeEntry("word/_rels/document.xml.rels"), "application/xml");
      const relationships = Object.fromEntries([...relationshipXml.getElementsByTagName("Relationship")].map((relationship) => [relationship.getAttribute("Id"), relationship.getAttribute("Target")]));
      const imageType = (file) => ({ png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml" })[file.split(".").pop().toLowerCase()];
      const documentImage = async (drawing) => {
        const blip = drawing.getElementsByTagName("a:blip")[0];
        const target = blip && relationships[blip.getAttribute("r:embed")];
        if (!target) return null;
        const file = `word/${target.replace(/^\.\.\//, "")}`;
        const type = imageType(file);
        if (!type) return null;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(new Blob([await unzipDocxEntry(archive, file)], { type }));
        image.alt = product.title;
        const extent = drawing.getElementsByTagName("wp:extent")[0];
        if (extent) image.style.aspectRatio = `${extent.getAttribute("cx")} / ${extent.getAttribute("cy")}`;
        const figure = document.createElement("figure");
        figure.className = "document-figure";
        figure.append(image);
        return figure;
      };
      const blocks = [];
      for (const node of [...xml.getElementsByTagName("w:body")[0].children]) {
        if (node.localName === "p") {
          for (const drawing of node.getElementsByTagName("w:drawing")) { const figure = await documentImage(drawing); if (figure) blocks.push(figure); }
          const text = [...node.getElementsByTagName("w:t")].map((part) => part.textContent).join("").trim();
          if (!text) continue;
          const paragraph = document.createElement("p"); paragraph.textContent = text;
          const style = node.getElementsByTagName("w:pStyle")[0]?.getAttribute("w:val") || ""; if (/heading/i.test(style)) paragraph.className = "document-heading";
          blocks.push(paragraph);
        }
        if (node.localName === "tbl") { const table = document.createElement("table"); [...node.getElementsByTagName("w:tr")].forEach((row) => { const tr = document.createElement("tr"); [...row.getElementsByTagName("w:tc")].forEach((cell) => { const td = document.createElement("td"); td.textContent = [...cell.getElementsByTagName("w:t")].map((part) => part.textContent).join(" ").trim(); tr.append(td); }); table.append(tr); }); blocks.push(table); }
      }
      content.replaceChildren(...blocks);
    } catch (error) { content.innerHTML = `<p>Doküman tarayıcıda görüntülenemedi. <a href="${download.href}" download>DOCX dosyasını indirin</a>.</p>`; }
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
      <div><h3>Kurumsal</h3><a href="index.html">Anasayfa</a><a href="kurumsal.html">Kurumsal</a><a href="urunler.html">Ürünler</a><a href="hizmetler.html">Servis &amp; Bakım</a><a href="referanslar.html">Referanslar</a><a href="iletisim.html">İletişim</a></div>
      <div><h3>Hizmetler</h3><a href="urunler.html">UPS Satışı</a><a href="hizmetler.html">Standart Bakım</a><a href="hizmetler.html">Premium Bakım</a><a href="hizmetler.html">Teknik Servis</a></div>
      <div><h3>İletişim</h3><p>⌖ <span data-contact-address></span></p><p>⌕ <span data-contact-phone></span></p><p>✉ <span data-contact-email></span></p></div>
    </div><div class="footer-bottom"><div class="container"><span>${data.footer.copyright}</span><span>Tüm hakları saklıdır</span></div></div></footer>`;
  });
  renderProducts();
  renderReferences();
  renderHomeSlider();
  renderDocument();
  renderServices();
  renderContact();

  const form = document.querySelector("#contact-form");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.querySelector(".notice").style.display = "block";
    form.reset();
  });
});

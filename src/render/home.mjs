import { homeData } from "../data/home-data.mjs";

const html = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const attrs = (values) =>
  Object.entries(values)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => `${key}="${html(value)}"`)
    .join(" ");

const icon = (name) => {
  const icons = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
    cart: '<path d="M6 6h15l-2 8H8L6 3H3"/><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.32 1.8.6 2.65a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6.25 6.25l1.26-1.26a2 2 0 0 1 2.11-.45c.85.28 1.74.48 2.65.6A2 2 0 0 1 22 16.92Z"/>',
    package: '<path d="m3 7 9-5 9 5-9 5-9-5Z"/><path d="M3 7v10l9 5 9-5V7"/><path d="M12 12v10"/>',
    truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-5"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
  };

  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name] || icons.chevron}</svg>`;
};

const animalIcon = (type) => {
  const detail = {
    dog: '<path d="M18 34c5 0 9 4 9 9v7H11v-7c0-5 3-9 7-9Z"/><path d="M17 32 11 21l8 4 5-4 8 4-6 11"/><circle cx="21" cy="30" r="1.8"/><circle cx="30" cy="30" r="1.8"/>',
    cat: '<path d="M17 25 14 15l9 6h10l9-6-3 10a18 18 0 0 1 3 10c0 10-8 17-19 17S14 45 14 35c0-4 1-7 3-10Z"/><path d="M23 35h.1M33 35h.1M24 43c3 2 6 2 9 0"/>',
    horse: '<path d="M19 48V30c0-8 7-14 16-14h7v11l6 6-6 6H30v9"/><path d="M28 16c-5 4-7 9-6 15"/><path d="M40 17c4 1 7 4 8 8"/>',
    farm: '<path d="M10 48V29l18-12 18 12v19"/><path d="M18 48V35h20v13"/><path d="M9 29h38"/><path d="M18 17V9h9v4"/>',
    bird: '<path d="M43 23c-10 0-17 5-21 15-4-3-7-8-7-15 8 1 13-1 18-8 3 2 7 5 10 8Z"/><path d="M32 27c5 2 9 6 12 12"/><path d="M21 45h16"/>',
    nac: '<path d="M19 38c-4-2-6-5-6-10 0-8 7-14 15-14s15 6 15 14c0 5-2 8-6 10"/><path d="M21 47c4 3 10 3 14 0"/><path d="M19 17 13 8M37 17l6-9"/><circle cx="24" cy="29" r="2"/><circle cx="32" cy="29" r="2"/>',
    bee: '<path d="M25 34c0-7 5-12 11-12s11 5 11 12-5 12-11 12-11-5-11-12Z"/><path d="M29 25c-7-7-15-4-17 3 6 1 11 3 15 8"/><path d="M43 25c7-7 15-4 17 3-6 1-11 3-15 8"/><path d="M31 27h10M29 34h14M31 41h10"/>',
  }[type];

  return `<svg class="animal-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${detail}</svg>`;
};

const renderTopBar = (data) => `
  <div class="topbar">
    <div class="container topbar__inner">
      <span>${icon("truck")}${html(data.site.shipping)}</span>
      <span>${icon("star")}Avis ${html(data.site.rating)}</span>
      <span>${icon("card")}Paiement sécurisé</span>
      <a href="tel:${html(data.site.phone.replaceAll(" ", ""))}">${icon("phone")}${html(data.site.phone)}</a>
    </div>
  </div>
`;

const renderLogo = (extraClass = "") => `
  <a class="brand ${extraClass}" href="/" aria-label="Accueil Produits-veto.com">
    <span class="brand__mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false">
        <path d="M32 7c10 0 19 7 22 16 5 16-11 27-22 34C21 50 5 39 10 23 13 14 22 7 32 7Z"/>
        <path d="M22 35c7-2 11-8 12-18 7 3 11 7 12 13-4 1-7 3-10 8-5-2-10-3-14-3Z"/>
        <path d="M20 39c6 3 14 4 22 0"/>
      </svg>
    </span>
    <span class="brand__copy">
      <strong>PRODUITS-VETO<span>.COM</span></strong>
        <small>Site français</small>
    </span>
  </a>
`;

const renderSearch = () => `
  <form class="search" role="search" action="/recherche/" method="get" data-search-form>
    <label class="sr-only" for="site-search">Rechercher sur Produits-veto.com</label>
    ${icon("search")}
    <input id="site-search" name="q" type="search" autocomplete="off" placeholder="${html(homeData.site.searchPlaceholder)}" aria-controls="search-suggestions" aria-expanded="false" data-search-input>
    <button type="submit">Rechercher</button>
    <div class="search__panel" id="search-suggestions" role="listbox" aria-label="Suggestions de recherche" data-search-panel hidden></div>
  </form>
`;

const renderSecondaryLink = ([label, href]) => {
  const slug = label.toLowerCase();
  const strong = slug.includes("promotion") || slug.includes("médicament");
  const medicine = slug.includes("médicament");

  return `<a class="secondary-nav__link${strong ? " secondary-nav__link--strong" : ""}${medicine ? " secondary-nav__link--medicine" : ""}" href="${html(href)}">${html(label)}</a>`;
};

const renderMegaMenu = (item, index) => `
  <li class="nav-item">
    <button class="nav-link" type="button" aria-expanded="false" aria-controls="mega-${index}" data-mega-trigger>
      ${html(item.label)}
    </button>
    <div class="mega" id="mega-${index}" data-mega-panel aria-hidden="true">
      <div class="mega__inner">
        <div class="mega__headline">
          <a href="${html(item.href)}">Tout pour ${html(item.label.toLowerCase())}</a>
          <p>Catégories prioritaires, produits de saison et conseils utiles.</p>
        </div>
        ${item.columns
          .map(
            (column) => `
          <div class="mega__column">
            <strong>${html(column.title)}</strong>
            ${column.links.map(([label, href]) => `<a href="${html(href)}">${html(label)}</a>`).join("")}
          </div>
        `,
          )
          .join("")}
        <div class="mega__promo">
          <span>Sélection pharmacie</span>
          <p>Retrouvez les indispensables vérifiés pour ${html(item.label.toLowerCase())}.</p>
          <a href="/selection-pharmacie/">Voir la sélection</a>
        </div>
      </div>
    </div>
  </li>
`;

const renderHeader = (data) => `
  <header class="site-header" data-header>
    ${renderTopBar(data)}
    <div class="container header-main">
      <button class="icon-button mobile-only" type="button" aria-label="Ouvrir le menu" aria-controls="mobile-menu" aria-expanded="false" data-menu-button>
        ${icon("menu")}
      </button>
      ${renderLogo()}
      ${renderSearch()}
    <nav class="header-actions" aria-label="Accès rapides">
        <a href="/mon-compte/" aria-label="Compte client">${icon("user")}<span>Compte</span></a>
        <a href="/suivi-commande/" class="desktop-only">${icon("package")}<span>Suivi</span></a>
        <a href="/contact/" class="desktop-only">${icon("phone")}<span>Conseil</span></a>
        <a href="/panier/" class="cart-link" aria-label="Panier, 0 article">${icon("cart")}<span>Panier</span><b data-cart-count>0</b></a>
      </nav>
    </div>
    <nav class="desktop-nav desktop-only" aria-label="Navigation principale">
      <div class="container desktop-nav__inner">
        <ul class="nav-list">
          ${data.primaryNav.map(renderMegaMenu).join("")}
        </ul>
        <div class="secondary-nav">
          ${data.secondaryNav.map(renderSecondaryLink).join("")}
        </div>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
      <div class="mobile-menu__bar">
        ${renderLogo("brand--compact")}
        <button class="icon-button" type="button" aria-label="Fermer le menu" data-menu-close>${icon("close")}</button>
      </div>
      <nav aria-label="Menu mobile">
        <div class="mobile-menu__highlights">
          ${data.secondaryNav.slice(0, 2).map(renderSecondaryLink).join("")}
        </div>
        ${data.primaryNav
          .map(
            (item) => `
          <details class="mobile-accordion">
            <summary>${html(item.label)}</summary>
            <a class="mobile-accordion__main" href="${html(item.href)}">Tout voir</a>
            ${item.columns
              .map(
                (column) => `
              <strong>${html(column.title)}</strong>
              ${column.links.map(([label, href]) => `<a href="${html(href)}">${html(label)}</a>`).join("")}
            `,
              )
              .join("")}
          </details>
        `,
          )
          .join("")}
        <div class="mobile-menu__secondary">
          ${data.secondaryNav.slice(2).map(renderSecondaryLink).join("")}
        </div>
      </nav>
    </div>
  </header>
`;

const renderHeroArt = () => `
  <svg class="hero-art" viewBox="0 0 640 420" role="img" aria-label="Sélection de produits vétérinaires pour animaux">
    <defs>
      <linearGradient id="heroBg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#e8f6ff"/>
        <stop offset="52%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#e9f7ed"/>
      </linearGradient>
    </defs>
    <rect width="640" height="420" rx="28" fill="url(#heroBg)"/>
    <circle cx="522" cy="84" r="58" fill="#d7efc6"/>
    <circle cx="120" cy="328" r="76" fill="#d7edf8"/>
    <g transform="translate(92 92)">
      <rect x="0" y="86" width="108" height="172" rx="18" fill="#ffffff" stroke="#c8ddec" stroke-width="4"/>
      <rect x="18" y="112" width="72" height="30" rx="8" fill="#1677b8"/>
      <rect x="21" y="162" width="66" height="70" rx="12" fill="#67a83b" opacity=".82"/>
      <path d="M39 191c12-4 19-15 20-34 13 5 19 13 20 25-8 1-13 6-18 17-7-4-14-7-22-8Z" fill="#fff"/>
    </g>
    <g transform="translate(268 62)">
      <rect x="0" y="40" width="134" height="226" rx="22" fill="#ffffff" stroke="#bed8e8" stroke-width="4"/>
      <rect x="22" y="72" width="90" height="30" rx="8" fill="#0f5e96"/>
      <rect x="24" y="124" width="86" height="88" rx="16" fill="#eab34e"/>
      <path d="M36 154c22 4 37-2 51-22 11 7 18 15 23 25-29 1-51 15-67 41-5-11-8-26-7-44Z" fill="#fff"/>
      <rect x="28" y="226" width="78" height="13" rx="6" fill="#d7edf8"/>
    </g>
    <g transform="translate(454 122)">
      <rect x="0" y="62" width="96" height="154" rx="18" fill="#ffffff" stroke="#c8ddec" stroke-width="4"/>
      <rect x="17" y="88" width="62" height="26" rx="7" fill="#67a83b"/>
      <path d="M34 144c0-19 12-31 27-31 16 0 28 12 28 31 0 20-12 32-28 32-15 0-27-12-27-32Z" fill="#e8f6ff"/>
      <path d="M44 133h34M42 145h38M45 157h31" stroke="#1677b8" stroke-width="4" stroke-linecap="round"/>
    </g>
    <path d="M108 72c55-38 138-44 205-22M390 366c64 1 117-20 159-63" fill="none" stroke="#67a83b" stroke-width="10" stroke-linecap="round" opacity=".2"/>
  </svg>
`;

const renderHero = (data) => `
  <section class="hero" aria-labelledby="home-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow">${html(data.hero.eyebrow)}</p>
        <h1 id="home-title">${html(data.hero.title)}</h1>
        <p>${html(data.hero.subtitle)}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="${html(data.hero.primaryCta[1])}">${html(data.hero.primaryCta[0])}</a>
          <a class="button button--secondary" href="${html(data.hero.secondaryCta[1])}">${html(data.hero.secondaryCta[0])}</a>
        </div>
        <div class="hero__campaign" data-campaign="${html(data.hero.campaign)}">
          Campagne editable Strapi, ciblable par pays, langue, canal et dates.
        </div>
      </div>
      <div class="hero__visual">
        ${renderHeroArt()}
      </div>
    </div>
  </section>
`;

const renderTrust = (items) => `
  <section class="trust-strip" aria-label="Elements de re-assurance">
    <div class="container trust-strip__grid">
      ${items
        .map(
          ([title, text], index) => `
        <article class="trust-item">
          ${icon(["truck", "shield", "card", "heart", "package"][index] || "shield")}
          <div>
            <strong>${html(title)}</strong>
            <span>${html(text)}</span>
          </div>
        </article>
      `,
        )
        .join("")}
    </div>
  </section>
`;

const sectionHeading = (id, eyebrow, title, text, href = "", cta = "Tout voir") => `
  <div class="section-heading">
    <div>
      <p class="eyebrow">${html(eyebrow)}</p>
      <h2 id="${html(id)}">${html(title)}</h2>
      ${text ? `<p>${html(text)}</p>` : ""}
    </div>
    ${href ? `<a href="${html(href)}" class="section-link">${html(cta)} ${icon("chevron")}</a>` : ""}
  </div>
`;

const renderAnimals = (animals) => `
  <section class="section section--flush" id="animaux" aria-labelledby="animals-title">
    <div class="container">
      ${sectionHeading("animals-title", "Navigation rapide", "Choisir par animal", "Un accès direct aux univers les plus recherchés, pensé pour mobile et pour le maillage SEO.")}
      <div class="animal-grid">
        ${animals
          .map(
            ([title, text, href, type]) => `
          <a class="animal-card" href="${html(href)}">
            <span class="animal-card__icon">${animalIcon(type)}</span>
            <strong>${html(title)}</strong>
            <span>${html(text)}</span>
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderCategories = (categories) => `
  <section class="section" id="categories" aria-labelledby="categories-title">
    <div class="container">
      ${sectionHeading("categories-title", "Besoins prioritaires", "Catégories populaires", "Les entrées les plus utiles pour réduire le temps de recherche dans un catalogue riche.")}
      <div class="category-grid">
        ${categories
          .map(
            ([title, href, text]) => `
          <a class="category-tile" href="${html(href)}">
            <strong>${html(title)}</strong>
            <span>${html(text)}</span>
            ${icon("chevron")}
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderProductVisual = (product) => `
  <div class="product-visual product-visual--${html(product.tone)}" role="img" aria-label="Illustration du produit ${html(product.name)}">
    <span class="product-visual__cap"></span>
    <span class="product-visual__brand">${html(product.brand.split(" ")[0])}</span>
    <span class="product-visual__mark"></span>
  </div>
`;

const renderProductCard = (product) => `
  <article class="product-card">
    <a class="product-card__media" href="/produit/">
      ${product.badge ? `<span class="product-badge">${html(product.badge)}</span>` : ""}
      ${renderProductVisual(product)}
    </a>
    <div class="product-card__body">
      <p class="product-card__brand">${html(product.brand)}</p>
      <h3><a href="/produit/">${html(product.name)}</a></h3>
      <div class="product-card__meta">
        <span>${icon("star")}${html(product.rating)}</span>
        <span class="stock">${html(product.stock)}</span>
      </div>
      ${product.medical ? `<p class="product-card__notice">${html(product.medical)}</p>` : ""}
      <div class="product-card__footer">
        <div class="price">
          ${product.oldPrice ? `<del>${html(product.oldPrice)}</del>` : ""}
          <strong>${html(product.price)}</strong>
        </div>
        <button class="button button--cart" type="button" data-add-cart>Ajouter</button>
      </div>
    </div>
  </article>
`;

const renderProductRails = (rails) => `
  <div class="product-rails">
    ${rails
      .map(
        (rail) => `
      <section class="section product-section" id="${html(rail.id)}" aria-labelledby="${html(rail.id)}-title">
        <div class="container">
          ${sectionHeading(`${rail.id}-title`, "Catalogue Medusa", rail.title, rail.intro, rail.href, "Voir la sélection")}
          <div class="product-row" data-product-row>
            ${rail.products.map(renderProductCard).join("")}
          </div>
        </div>
      </section>
    `,
      )
      .join("")}
  </div>
`;

const renderBrands = (brands) => `
  <section class="section brands" id="marques" aria-labelledby="brands-title">
    <div class="container">
      ${sectionHeading("brands-title", "Laboratoires", "Marques de référence", "Un bloc de confiance et de maillage interne vers les laboratoires importants.", "/marques/", "Toutes les marques")}
      <div class="brand-grid">
        ${brands
          .map(
            (brand) => `
          <a class="brand-chip" href="/marques/${html(brand.toLowerCase().replaceAll(" ", "-"))}/">
            <span>${html(brand.slice(0, 2).toUpperCase())}</span>
            <strong>${html(brand)}</strong>
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderArticles = (articles) => `
  <section class="section articles" id="conseils" aria-labelledby="articles-title">
    <div class="container">
      ${sectionHeading("articles-title", "Conseils Strapi", "Guides santé animale", "Des contenus utiles pour l'expertise perçue, le SEO et l'accompagnement avant achat.", "/blog/", "Tous les conseils")}
      <div class="article-grid">
        ${articles
          .map(
            (article) => `
          <article class="article-card">
            <span>${html(article.animal)}</span>
            <h3><a href="${html(article.href)}">${html(article.title)}</a></h3>
            <p>${html(article.excerpt)}</p>
            <a href="${html(article.href)}" class="text-link">Lire le conseil ${icon("chevron")}</a>
          </article>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderExpertise = () => `
  <section class="section expertise" aria-labelledby="expertise-title">
    <div class="container expertise__grid">
      <div>
        <p class="eyebrow">Expertise pharmacie</p>
        <h2 id="expertise-title">Une pharmacie française au service de la santé animale</h2>
        <p>
          Produits-veto.com est un site spécialisé dans les produits vétérinaires et de parapharmacie animale,
          rattaché à la Pharmacie de l'Envigne. La home doit mettre en avant cette origine officinale pour
          rassurer les clients, clarifier le niveau de conseil et renforcer la confiance avant l'achat.
        </p>
        <a class="button button--secondary" href="/qui-sommes-nous/">Notre pharmacie</a>
      </div>
      <div class="expertise__panel">
        <strong>Points a administrer</strong>
        <ul>
          <li>Horaires de conseil et téléphone.</li>
          <li>Liens vers mentions legales, ARS, Ordre des pharmaciens et ANSES si applicable.</li>
          <li>Rappels de prudence pour médicaments vétérinaires non soumis à ordonnance.</li>
        </ul>
      </div>
    </div>
  </section>
`;

const renderSeo = (faq) => `
  <section class="section seo-block" aria-labelledby="seo-title">
    <div class="container seo-block__grid">
      <div>
        <p class="eyebrow">Contenu SEO utile</p>
        <h2 id="seo-title">Acheter des produits vétérinaires en ligne avec un accompagnement clair</h2>
        <p>
          La home doit rester lisible tout en creant des liens internes vers les univers chien, chat, cheval,
          abeilles, animaux de ferme, oiseaux et NAC. Les categories comme antiparasitaires, vermifuges,
          hygiène, digestion, dermatologie et articulations doivent être accessibles rapidement, avec un texte
          naturel et utile pour les propriétaires d'animaux.
        </p>
        <p>
          Les blocs éditoriaux Strapi permettront d'ajuster les contenus saisonniers, les campagnes laboratoires,
          les FAQ et les liens vers les guides conseils sans redéployer toute l'application.
        </p>
      </div>
      <div class="faq-list">
        ${faq
          .map(
            ([question, answer]) => `
          <details>
            <summary>${html(question)}</summary>
            <p>${html(answer)}</p>
          </details>
        `,
          )
          .join("")}
      </div>
    </div>
  </section>
`;

const renderFooter = (data) => `
  <footer class="site-footer">
    <div class="container footer__top">
      <div class="footer__brand">
        ${renderLogo("brand--footer")}
        <p>${html(data.site.pharmacy)}. Conseil client du lundi au vendredi, expédition des commandes en jours ouvrés.</p>
        <form class="newsletter" data-newsletter>
          <label for="newsletter-email">Newsletter conseils et offres</label>
          <div>
            <input id="newsletter-email" type="email" placeholder="email@exemple.fr">
            <button class="button button--primary" type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
      ${data.footer.columns
        .map(
          (column) => `
        <nav aria-label="${html(column.title)}">
          <h2>${html(column.title)}</h2>
          ${column.links.map(([label, href]) => `<a href="${html(href)}">${html(label)}</a>`).join("")}
        </nav>
      `,
        )
        .join("")}
    </div>
    <div class="container footer__bottom">
      <span>© ${new Date().getFullYear()} Produits-veto.com</span>
      <span>Cookies, confidentialité, conformité et rappels réglementaires à piloter depuis Strapi.</span>
    </div>
  </footer>
`;

const searchData = (data) => {
  const items = [
    ...data.animals.map(([title, text, href]) => ({ type: "Animal", title, text, href })),
    ...data.popularCategories.map(([title, href, text]) => ({ type: "Categorie", title, text, href })),
    ...data.brands.map((title) => ({ type: "Marque", title, text: "Laboratoire partenaire", href: `/marques/${title.toLowerCase().replaceAll(" ", "-")}/` })),
    ...data.productRails.flatMap((rail) =>
      rail.products.map((product) => ({
        type: "Produit",
        title: product.name,
        text: product.brand,
        href: "/produit/",
      })),
    ),
    ...data.articles.map((article) => ({
      type: "Conseil",
      title: article.title,
      text: article.animal,
      href: article.href,
    })),
  ];

  return JSON.stringify(items).replaceAll("<", "\\u003c");
};

const renderStructuredData = (data) => {
  const products = data.productRails.flatMap((rail) => rail.products).slice(0, 10);
  const graph = [
    {
      "@type": "Organization",
      name: data.site.name,
      url: "https://www.produits-veto.com/",
      telephone: data.site.phone,
      parentOrganization: {
        "@type": "Pharmacy",
        name: "Pharmacie de l'Envigne",
      },
    },
    {
      "@type": "WebSite",
      name: data.site.name,
      url: "https://www.produits-veto.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.produits-veto.com/recherche/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      name: "Produits vétérinaires mis en avant",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          brand: product.brand,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: product.price.replace(" EUR", "").replace(",", "."),
            availability: product.stock === "En stock" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
          },
        },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: data.seoFaq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ];

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replaceAll("<", "\\u003c");
};

export const renderHomePage = (data = homeData) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Produits vétérinaires en ligne pour chien, chat et cheval | Produits-veto.com</title>
    <meta name="description" content="Home page e-commerce vétérinaire moderne pour Produits-veto.com : recherche centrale, pharmacie française, animaux, catégories, produits, marques et conseils.">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="https://www.produits-veto.com/">
    <link rel="stylesheet" href="./src/styles.css">
    <script type="application/ld+json">${renderStructuredData(data)}</script>
  </head>
  <body>
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    ${renderHeader(data)}
    <main id="contenu">
      ${renderHero(data)}
      ${renderTrust(data.trustItems)}
      ${renderAnimals(data.animals)}
      ${renderCategories(data.popularCategories)}
      ${renderProductRails(data.productRails)}
      ${renderBrands(data.brands)}
      ${renderArticles(data.articles)}
      ${renderExpertise()}
      ${renderSeo(data.seoFaq)}
    </main>
    ${renderFooter(data)}
    <nav class="bottom-nav mobile-only" aria-label="Navigation mobile rapide">
      <a href="#contenu">${icon("heart")}Accueil</a>
      <a href="#categories">${icon("package")}Catégories</a>
      <a href="#site-search">${icon("search")}Recherche</a>
      <a href="/mon-compte/">${icon("user")}Compte</a>
      <a href="/panier/">${icon("cart")}Panier</a>
    </nav>
    <div class="toast" role="status" aria-live="polite" data-toast hidden></div>
    <script type="application/json" id="home-search-data">${searchData(data)}</script>
    <script type="module" src="./src/app.js"></script>
  </body>
</html>
`;

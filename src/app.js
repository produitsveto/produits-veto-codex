const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const body = document.body;
const menuButton = qs("[data-menu-button]");
const menuClose = qs("[data-menu-close]");
const mobileMenu = qs("[data-mobile-menu]");
const toast = qs("[data-toast]");
const cartCount = qs("[data-cart-count]");
const searchInput = qs("[data-search-input]");
const searchPanel = qs("[data-search-panel]");
const searchDataNode = qs("#home-search-data");

let cartItems = 0;
let toastTimer;

const announce = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
};

const setMenu = (isOpen) => {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.hidden = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("menu-open", isOpen);
  if (isOpen) {
    menuClose?.focus();
  } else {
    menuButton.focus();
  }
};

menuButton?.addEventListener("click", () => setMenu(true));
menuClose?.addEventListener("click", () => setMenu(false));

mobileMenu?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) setMenu(false);
});

const closeMegaMenus = (except) => {
  qsa("[data-mega-trigger]").forEach((trigger) => {
    if (trigger === except) return;
    trigger.setAttribute("aria-expanded", "false");
    trigger.closest(".nav-item")?.removeAttribute("data-open");
  });
  qsa("[data-mega-panel]").forEach((panel) => {
    if (except && panel.id === except.getAttribute("aria-controls")) return;
    panel.setAttribute("aria-hidden", "true");
    panel.classList.remove("mega--open");
  });
};

const openMega = (trigger) => {
  const panel = qs(`#${trigger.getAttribute("aria-controls")}`);
  closeMegaMenus(trigger);
  trigger.setAttribute("aria-expanded", "true");
  trigger.closest(".nav-item")?.setAttribute("data-open", "true");
  panel?.setAttribute("aria-hidden", "false");
  panel?.classList.add("mega--open");
};

qsa("[data-mega-trigger]").forEach((trigger) => {
  const panel = qs(`#${trigger.getAttribute("aria-controls")}`);

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMegaMenus();
    } else {
      openMega(trigger);
    }
  });

  trigger.addEventListener("pointerenter", () => openMega(trigger));
  trigger.addEventListener("focus", () => openMega(trigger));
  panel?.addEventListener("pointerenter", () => openMega(trigger));
});

qsa(".nav-item").forEach((item) => {
  item.addEventListener("pointerleave", () => {
    window.setTimeout(() => {
      if (!item.matches(":hover") && !item.matches(":focus-within")) closeMegaMenus();
    }, 120);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMegaMenus();
    if (mobileMenu && !mobileMenu.hidden) setMenu(false);
    hideSuggestions();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) closeMegaMenus();
  if (!event.target.closest("[data-search-form]")) hideSuggestions();
});

const parseSearchData = () => {
  try {
    return JSON.parse(searchDataNode?.textContent || "[]");
  } catch {
    return [];
  }
};

const searchItems = parseSearchData();

function hideSuggestions() {
  if (!searchPanel || !searchInput) return;
  searchPanel.hidden = true;
  searchInput.setAttribute("aria-expanded", "false");
}

const renderSuggestions = (query) => {
  if (!searchPanel || !searchInput) return;
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) {
    hideSuggestions();
    return;
  }

  const matches = searchItems
    .filter((item) => `${item.title} ${item.text} ${item.type}`.toLowerCase().includes(normalized))
    .slice(0, 6);

  if (!matches.length) {
    searchPanel.innerHTML = `
      <div class="suggestion" role="option" aria-disabled="true">
        <small>Aucun resultat direct</small>
        <strong>Essayez un animal, une marque ou un besoin</strong>
        <span>Exemples : puces chat, vermifuge chien, varroa, Douxo</span>
      </div>
    `;
  } else {
    searchPanel.innerHTML = matches
      .map(
        (item) => `
          <a class="suggestion" role="option" href="${item.href}">
            <small>${item.type}</small>
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </a>
        `,
      )
      .join("");
  }

  searchPanel.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
};

searchInput?.addEventListener("input", (event) => {
  renderSuggestions(event.currentTarget.value);
});

searchInput?.addEventListener("focus", (event) => {
  renderSuggestions(event.currentTarget.value);
});

qs("[data-search-form]")?.addEventListener("submit", (event) => {
  const value = searchInput?.value.trim();
  if (!value) {
    event.preventDefault();
    announce("Saisissez un produit, une marque ou une catégorie.");
  }
});

qsa("[data-add-cart]").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = String(cartItems);
    const card = button.closest(".product-card");
    const title = qs("h3", card)?.textContent?.trim() || "Produit";
    announce(`${title} ajoute au panier.`);
  });
});

qs("[data-newsletter]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = qs("input", event.currentTarget);
  const value = input?.value.trim();
  if (!value) {
    announce("Renseignez votre email pour la newsletter.");
    return;
  }
  announce("Inscription newsletter prete a brancher au CRM.");
  event.currentTarget.reset();
});

qsa('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu && !mobileMenu.hidden) setMenu(false);
  });
});

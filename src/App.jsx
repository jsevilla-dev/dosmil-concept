import { useState, useMemo, useEffect } from "react";
import heroImg from "./assets/hero.png";
import dosmilLogo from "./assets/dosmil_logo.png";
import logoEnter from "./assets/logo_enter.png";
import { productsCatalog } from "./products.js";
import "./App.css";

// Genuine DOSMIL Products Catalog & Collections from dosmil2000.com
const realProducts = productsCatalog;

const categoryList = [
  "All Products",
  "Tees",
  "Bottoms",
  "Womens",
  "Headwear",
  "Running",
  "Jackets",
  "Hoodies",
  "Sets",
  "Heritage Pieces"
];

const twofaceStoryVideos = [
  {
    title: "DOSMIL HALLOWEEN CAMPAIGN (BTS)",
    tag: "CAMPAIGN / BTS",
    desc: "Behind the dark gritty imagery and nocturnal Manila aesthetic that defined the seasonal capsule.",
    link: "https://www.youtube.com/watch?v=n9rihcpwj4Q&t=5s",
    videoId: "n9rihcpwj4Q",
    year: "2026",
    code: "EP-08"
  },
  {
    title: "MILLIGANS",
    tag: "STREETWEAR ARCHIVE",
    desc: "A raw look into the underground culture, skate parks, and youth spaces shaping DOSMIL.",
    link: "https://www.youtube.com/watch?v=s5wfbO8wVhc",
    videoId: "s5wfbO8wVhc",
    year: "2026",
    code: "EP-07"
  },
  {
    title: "DOS MIL 5TH YEAR ANNIVERSARY WORK",
    tag: "5 YEARS DOCUMENTARY",
    desc: "Five years of community, graphic research, trial, and the evolution of the Twoface mask.",
    link: "https://www.youtube.com/watch?v=nLbwRvROKlo",
    videoId: "nLbwRvROKlo",
    year: "2025",
    code: "EP-06"
  },
  {
    title: "TWOFACE RUNCLUB EASTWOOD - Behind The Cam ep. 5",
    tag: "RUN CLUB COMMUNITY",
    desc: "Every Thursday night in Eastwood. No clocks, no ego, just miles with the community.",
    link: "https://www.youtube.com/watch?v=Mr24LdvnAbY",
    videoId: "Mr24LdvnAbY",
    year: "2026",
    code: "EP-05"
  },
  {
    title: "TWOFACE RUNCLUB EASTWOOD 2026",
    tag: "RUN CLUB HIGHLIGHTS",
    desc: "Pushing limits across the Eastwood asphalt with Manila's core running collective.",
    link: "https://www.youtube.com/watch?v=ISihYjLo8js",
    videoId: "ISihYjLo8js",
    year: "2026",
    code: "EP-04"
  },
  {
    title: "DOSMIL 100 FREE SHIRT POP-UP",
    tag: "COMMUNITY ACTIVATION",
    desc: "Rewarding the core believers who line up before sunrise in Manila for the drop.",
    link: "https://www.youtube.com/watch?v=WPZDsZe3xMg",
    videoId: "WPZDsZe3xMg",
    year: "2025",
    code: "EP-03"
  }
];

const lookbookList = [
  { id: "01", title: "EASTWOOD RUNNERS", season: "TWOFACE RUN CLUB", year: "2026", focus: "Reflective Technical & Activewear" },
  { id: "02", title: "HALLOWEEN NOCTURNE", season: "FALL / WINTER CAPSULE", year: "2026", focus: "Utility Twill & Skull Graphics" },
  { id: "03", title: "MANILA PAVEMENT", season: "SUMMER REBIRTH", year: "2025", focus: "220 GSM Heavyweight Tees & Wave Mesh" },
  { id: "04", title: "BRICK BY BRICK", season: "5TH YEAR ARCHIVE", year: "2025", focus: "420 GSM French Terry Fleece & Denim" },
  { id: "05", title: "AFTER HOURS ARCHIVE", season: "STREET STUDY", year: "2024", focus: "Double-face Mask Concepts & Vintage Dye" }
];

function formatPHP(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(amount);
}

// Original Twoface & DOSMIL Brand Logos
function DosmilHeaderLogo({ className = "header__heading-logo", height = 62 }) {
  return (
    <img
      src={dosmilLogo}
      alt="DOSMIL"
      className={className}
      style={{ height: `${height}px`, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

function TwofaceOriginalLogo({ className = "dsml-original-twoface", size = 120 }) {
  return (
    <img
      src={logoEnter}
      alt="DOSMIL Twoface Logo"
      className={className}
      style={{ width: `${size}px`, height: `${size}px`, objectFit: "contain", display: "inline-block" }}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [emailSub, setEmailSub] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [imgErrors, setImgErrors] = useState({});

  // Video player modal
  const [activeVideo, setActiveVideo] = useState(null);

  // Quick brand intro preloader (Y2K / Streetwear style)
  const [showPreloader, setShowPreloader] = useState(() => {
    return !sessionStorage.getItem("dsml_loaded");
  });

  useEffect(() => {
    if (showPreloader) {
      const timer = setTimeout(() => {
        setShowPreloader(false);
        sessionStorage.setItem("dsml_loaded", "true");
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [showPreloader]);

  // Next Drop Countdown Timer
  const [countdown, setCountdown] = useState({ hours: 48, minutes: 23, seconds: 15 });

  // Pitch Case Study banner toggle
  const [showPitchBadge, setShowPitchBadge] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 48, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cash on Delivery Checkout Form State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [codForm, setCodForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    province: "Metro Manila",
    city: "Quezon City",
    barangay: "",
    address: "",
    notes: ""
  });

  // Run club form
  const [runClubRegistered, setRunClubRegistered] = useState(false);
  const [runForm, setRunForm] = useState({ name: "", igHandle: "", pace: "5K Casual (Easy Pace)" });

  // Keyboard navigation & body locks
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsCartOpen(false);
        setSelectedProduct(null);
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProducts = useMemo(() => {
    return realProducts.filter(p => {
      const matchesCategory =
        selectedCategory === "All Products" ||
        p.category.toLowerCase() === selectedCategory.toLowerCase() ||
        p.collection.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "New" && p.collection === "NEW COLLECTION") ||
        (activeFilter === "Heritage" && p.collection === "HERITAGE PIECES") ||
        (activeFilter === "Under 1500" && p.price <= 1500);

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [selectedCategory, searchQuery, activeFilter]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleAddToCart(product, size = "L", qty = 1) {
    const itemKey = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(i => i.key === itemKey);
      if (existing) {
        return prev.map(i => (i.key === itemKey ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...product, key: itemKey, size, qty }];
    });
    setToastMessage(`Added ${product.title} (${size}) to Bag`);
    setIsCartOpen(true);
    setSelectedProduct(null);
  }

  function handleUpdateQty(itemKey, delta) {
    setCart(prev =>
      prev
        .map(i => (i.key === itemKey ? { ...i, qty: i.qty + delta } : i))
        .filter(i => i.qty > 0)
    );
  }

  function handleNavigate(tab, category = null) {
    setActiveTab(tab);
    if (category) {
      setSelectedCategory(category);
    }
    setActiveDropdown(null);
    setIsMenuOpen(false);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="dsml-root">
      {/* Intro Preloader Animation */}
      {showPreloader && (
        <div className="dsml-preloader-curtain">
          <div className="dsml-preloader-content">
            <div className="dsml-preloader-icon-wrap">
              <TwofaceOriginalLogo size={120} />
            </div>
            <div className="dsml-preloader-text">
              <span className="dsml-glitch-text" data-text="DOSMIL 2000">DOSMIL 2000</span>
              <p>PHILIPPINE STREETWEAR &bull; TWOFACE CREW</p>
            </div>
            <div className="dsml-preloader-bar">
              <div className="dsml-preloader-progress"></div>
            </div>
            <span className="dsml-preloader-loc">MANILA, PH &bull; MMXXVI</span>
          </div>
        </div>
      )}
      {/* Concept Pitch Ribbon */}
      {showPitchBadge && (
        <aside className="dsml-concept-pitch-bar" aria-label="Concept proposal notice">
          <div className="dsml-pitch-content">
            <span className="dsml-pitch-badge">CONCEPT STUDY</span>
            <p>
              Unofficial website redesign &amp; e-commerce proposal for <strong>DOSMIL (Twoface Crew)</strong>.
              All product rights, imagery, and trademarks belong to DOSMIL 2000.
            </p>
          </div>
          <div className="dsml-pitch-controls">
            <a
              href="https://www.dosmil2000.com/"
              target="_blank"
              rel="noreferrer"
              className="dsml-pitch-link"
            >
              VISIT OFFICIAL SITE &#x2197;
            </a>
            <button
              className="dsml-pitch-dismiss"
              onClick={() => setShowPitchBadge(false)}
              aria-label="Dismiss notice"
            >
              &times;
            </button>
          </div>
        </aside>
      )}

      {/* Top Streetwear Marquee Bar */}
      <div className="dsml-topbar">
        <div className="dsml-marquee-track">
          <span>PHILIPPINE STREETWEAR &bull; TWOFACE CREW &bull; MANILA 2000 &bull; ALL ORDERS SHIP NATIONWIDE &bull; CASH ON DELIVERY AVAILABLE &bull; OFFICIAL DOSMIL STORE &bull; PHILIPPINE STREETWEAR &bull; TWOFACE CREW &bull; MANILA 2000 &bull; ALL ORDERS SHIP NATIONWIDE &bull;</span>
        </div>
      </div>

      {/* Main Streetwear Header */}
      <header className="dsml-header">
        <div className="dsml-header-left">
          {/* Mobile hamburger */}
          <button
            className="dsml-icon-btn dsml-mobile-trigger"
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? (
              <span className="dsml-close-icon">&times;</span>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="6" width="18" height="2" />
                <rect x="3" y="11" width="18" height="2" />
                <rect x="3" y="16" width="18" height="2" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="dsml-nav-desktop" aria-label="Main Navigation">
            {/* TWOFACE STORY DROPDOWN */}
            <div
              className="dsml-nav-item"
              onMouseEnter={() => setActiveDropdown("twoface")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`dsml-nav-link ${activeTab === "Twoface Story" || activeTab === "Lookbooks" || activeTab === "Run Club" ? "active" : ""}`}
                onClick={() => handleNavigate("Twoface Story")}
              >
                TWOFACE STORY
                <span className="dsml-chevron">&#x25BE;</span>
              </button>
              {activeDropdown === "twoface" && (
                <div className="dsml-dropdown-menu">
                  <button onClick={() => handleNavigate("Twoface Story")}>
                    TWOFACE STORY <span>BTS & Videos</span>
                  </button>
                  <button onClick={() => handleNavigate("Lookbooks")}>
                    LOOKBOOKS <span>Seasonal Archives</span>
                  </button>
                  <button onClick={() => handleNavigate("Run Club")}>
                    RUN CLUB <span>Eastwood Manila</span>
                  </button>
                </div>
              )}
            </div>

            {/* SHOP DROPDOWN */}
            <div
              className="dsml-nav-item"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`dsml-nav-link ${activeTab === "Shop" ? "active" : ""}`}
                onClick={() => handleNavigate("Shop", "All Products")}
              >
                SHOP
                <span className="dsml-chevron">&#x25BE;</span>
              </button>
              {activeDropdown === "shop" && (
                <div className="dsml-dropdown-menu dsml-shop-dropdown">
                  <div className="dsml-dropdown-grid">
                    {categoryList.map(cat => (
                      <button
                        key={cat}
                        className={selectedCategory === cat ? "active" : ""}
                        onClick={() => handleNavigate("Shop", cat)}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className={`dsml-nav-link ${activeTab === "Help" ? "active" : ""}`}
              onClick={() => handleNavigate("Help")}
            >
              HELP
            </button>
          </nav>
        </div>

        {/* Center Brand Identity (Original DOSMIL Logo from live store) */}
        <div className="dsml-header-center">
          <button className="dsml-brand-btn" onClick={() => handleNavigate("Home")} aria-label="DOSMIL Home">
            <DosmilHeaderLogo height={58} />
          </button>
        </div>

        {/* Right Header Controls */}
        <div className="dsml-header-right">
          <button
            className="dsml-icon-btn dsml-search-toggle"
            onClick={() => {
              const willOpen = !isSearchOpen;
              setIsSearchOpen(willOpen);
              if (willOpen && activeTab !== "Shop") {
                setActiveTab("Shop");
                setActiveDropdown(null);
                setIsMenuOpen(false);
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            title="Search Products"
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <a
            href="https://www.dosmil2000.com/customer_authentication/redirect"
            target="_blank"
            rel="noreferrer"
            className="dsml-icon-btn dsml-user-link"
            title="Customer Account"
            aria-label="Account"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>

          <button
            className="dsml-bag-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open Shopping Bag"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="dsml-bag-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* Search Drawer / Dropdown */}
      {isSearchOpen && (
        <div className="dsml-search-bar">
          <div className="dsml-search-inner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="SEARCH CATALOG (E.G. 'D'BLOOD', 'BULLTWILL', 'HOODIE', 'DENIM')..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button className="dsml-clear-search" onClick={() => setSearchQuery("")}>
                CLEAR
              </button>
            )}
            <button className="dsml-close-search" onClick={() => setIsSearchOpen(false)}>
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="dsml-mobile-drawer">
          <div className="dsml-mobile-drawer-inner">
            <div className="dsml-mobile-group">
              <span className="dsml-group-title">NAVIGATION</span>
              <button onClick={() => handleNavigate("Home")}>HOME</button>
              <button onClick={() => handleNavigate("Shop", "All Products")}>ALL PRODUCTS</button>
              <button onClick={() => handleNavigate("Shop", "Tees")}>TEES</button>
              <button onClick={() => handleNavigate("Shop", "Bottoms")}>BOTTOMS & SHORTS</button>
              <button onClick={() => handleNavigate("Shop", "Hoodies")}>HOODIES & JACKETS</button>
              <button onClick={() => handleNavigate("Shop", "Running")}>RUN CLUB GEAR</button>
            </div>

            <div className="dsml-mobile-group">
              <span className="dsml-group-title">CULTURE & COMMUNITY</span>
              <button onClick={() => handleNavigate("Twoface Story")}>TWOFACE STORY (BTS)</button>
              <button onClick={() => handleNavigate("Lookbooks")}>LOOKBOOKS ARCHIVE</button>
              <button onClick={() => handleNavigate("Run Club")}>TWOFACE RUN CLUB</button>
              <button onClick={() => handleNavigate("Help")}>CUSTOMER SUPPORT</button>
            </div>

            <div className="dsml-mobile-socials">
              <a href="http://instagram.com/dosmil_ph/" target="_blank" rel="noreferrer">INSTAGRAM</a>
              <a href="https://www.youtube.com/@dosmil2000" target="_blank" rel="noreferrer">YOUTUBE</a>
              <a href="https://www.tiktok.com/@dsml2000" target="_blank" rel="noreferrer">TIKTOK</a>
              <a href="http://facebook.com/Dosmil.clothing/" target="_blank" rel="noreferrer">FACEBOOK</a>
            </div>
          </div>
        </div>
      )}

      {/* PAGE CONTENTS */}
      <main className="dsml-main">
        {/* ========================================================
            HOME PAGE: Gritty Streetwear Editorial + Full Catalog
           ======================================================== */}
        {activeTab === "Home" && (
          <>
            {/* Gritty Editorial Hero */}
            <section className="dsml-hero-section">
              <div className="dsml-hero-bg">
                {/* Authentic live background video from dosmil2000.com */}
                <video
                  className="dsml-hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={heroImg}
                >
                  <source
                    src="https://cdn.shopify.com/videos/c/o/v/92e399b5602d41619a641dd345f57efe.mp4"
                    type="video/mp4"
                  />
                  <img src={heroImg} alt="DOSMIL Streetwear Culture" className="dsml-hero-img" />
                </video>
                <div className="dsml-hero-overlay"></div>
                <div className="dsml-hero-grain"></div>
              </div>

              <div className="dsml-hero-content">
                <div className="dsml-hero-top-meta">
                  <span>MANILA, PH &bull; TWOFACE CREW</span>
                  <span>EST. 2020 &bull; MMXXVI</span>
                </div>

                <div className="dsml-hero-center-box">
                  <div className="dsml-hero-mask-wrapper dsml-float-anim">
                    <TwofaceOriginalLogo size={140} className="dsml-hero-mask" />
                  </div>
                  <div className="dsml-hero-logo-center dsml-glow-anim">
                    <DosmilHeaderLogo height={110} />
                  </div>
                  <p className="dsml-hero-subtitle dsml-fade-in-up">PHILIPPINE STREETWEAR &bull; TWOFACE COMMUNITY</p>

                  <div className="dsml-hero-actions">
                    <button
                      className="dsml-btn dsml-btn-primary"
                      onClick={() => handleNavigate("Shop", "NEW COLLECTION")}
                    >
                      EXPLORE NEW COLLECTION &rarr;
                    </button>
                    <button
                      className="dsml-btn dsml-btn-outline"
                      onClick={() => handleNavigate("Twoface Story")}
                    >
                      TWOFACE STORY
                    </button>
                  </div>
                </div>

                <div className="dsml-hero-bottom-meta">
                  <span>AUTONOMOUS STREETWEAR LABEL</span>
                  <span>220 GSM TEES &bull; BULLTWILL &bull; 420 GSM FLEECE</span>
                  <span>SCROLL DOWN &darr;</span>
                </div>
              </div>
            </section>

            {/* Quick Strip Manifesto */}
            <section className="dsml-strip">
              <div className="dsml-strip-col">
                <span className="dsml-strip-num">01 / BRAND</span>
                <h3>BUILT ON TWO FACES</h3>
                <p>One side of relentless dedication; another of underground creative freedom. We engineer garments for Manila pavement.</p>
              </div>
              <div className="dsml-strip-col">
                <span className="dsml-strip-num">02 / STANDARD</span>
                <h3>HEAVYWEIGHT CRAFT</h3>
                <p>220 GSM combed cotton tees, custom 6-pocket bulltwill cuts, French Terry hoodies, and rugged utility cargo.</p>
              </div>
              <div className="dsml-strip-col">
                <span className="dsml-strip-num">03 / CREW</span>
                <h3>RUN CLUB & COMMUNITY</h3>
                <p>Eastwood Manila night runs, studio behind-the-scenes, pop-ups, and genuine cultural activations.</p>
              </div>
            </section>

            {/* Section 1: NEW COLLECTION */}
            <section className="dsml-section">
              <div className="dsml-drop-alert-banner">
                <div className="dsml-drop-alert-left">
                  <span className="dsml-live-dot"></span>
                  <strong>NEXT CAPSULE DROP IN:</strong>
                  <div className="dsml-countdown-digits">
                    <span>{String(countdown.hours).padStart(2, '0')}H</span> :{" "}
                    <span>{String(countdown.minutes).padStart(2, '0')}M</span> :{" "}
                    <span>{String(countdown.seconds).padStart(2, '0')}S</span>
                  </div>
                </div>
                <div className="dsml-drop-alert-right">
                  <span>LIMITED RUN &bull; NO RESTOCKS GUARANTEED</span>
                </div>
              </div>

              <div className="dsml-section-header">
                <div>
                  <span className="dsml-section-badge">SEASONAL RELEASE</span>
                  <h2 className="dsml-section-title">NEW COLLECTION</h2>
                </div>
                <button
                  className="dsml-link-btn"
                  onClick={() => handleNavigate("Shop", "NEW COLLECTION")}
                >
                  VIEW ALL IN COLLECTION &rarr;
                </button>
              </div>

              <div className="dsml-product-grid">
                {realProducts
                  .filter(p => p.collection === "NEW COLLECTION")
                  .slice(0, 4)
                  .map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelect={() => {
                        setSelectedProduct(p);
                        setActiveImageIndex(0);
                      }}
                      onQuickAdd={() => handleAddToCart(p, "L", 1)}
                      imgError={imgErrors[p.id]}
                      onImgError={() => setImgErrors(prev => ({ ...prev, [p.id]: true }))}
                    />
                  ))}
              </div>
            </section>

            {/* Brand Campaign Interstitial Banner */}
            <section className="dsml-interstitial">
              <div className="dsml-interstitial-box">
                <span className="dsml-tag">TWOFACE RUN CLUB &bull; EASTWOOD MANILA</span>
                <h2>NOT A BRAND FOR THE FAINT.<br />A CREW FOR THE DRIVEN.</h2>
                <p>
                  Every drop is released in limited batches with zero compromise on textiles, stitching, and silhouettes.
                  Engineered to withstand the tropical grind, monsoon humidity, and late-night sessions.
                </p>
                <div className="dsml-interstitial-buttons">
                  <button
                    className="dsml-btn dsml-btn-dark"
                    onClick={() => handleNavigate("Shop", "All Products")}
                  >
                    SHOP ALL GEAR
                  </button>
                  <button
                    className="dsml-btn dsml-btn-ghost"
                    onClick={() => handleNavigate("Run Club")}
                  >
                    JOIN RUN CLUB
                  </button>
                </div>
              </div>
            </section>

            {/* Section 2: HERITAGE PIECES & RESTOCKED */}
            <section className="dsml-section">
              <div className="dsml-section-header">
                <div>
                  <span className="dsml-section-badge">VAULT / ESSENTIALS</span>
                  <h2 className="dsml-section-title">HERITAGE PIECES</h2>
                </div>
                <button
                  className="dsml-link-btn"
                  onClick={() => handleNavigate("Shop", "HERITAGE PIECES")}
                >
                  EXPLORE ARCHIVE &rarr;
                </button>
              </div>

              <div className="dsml-product-grid">
                {realProducts
                  .filter(p => p.collection === "HERITAGE PIECES")
                  .slice(0, 4)
                  .map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelect={() => {
                        setSelectedProduct(p);
                        setActiveImageIndex(0);
                      }}
                      onQuickAdd={() => handleAddToCart(p, "L", 1)}
                      imgError={imgErrors[p.id]}
                      onImgError={() => setImgErrors(prev => ({ ...prev, [p.id]: true }))}
                    />
                  ))}
              </div>
            </section>

            {/* Section 3: TWOFACE VIDEO ARCHIVE PREVIEW */}
            <section className="dsml-section dsml-video-section">
              <div className="dsml-section-header">
                <div>
                  <span className="dsml-section-badge">YOUTUBE &bull; BEHIND THE CAM</span>
                  <h2 className="dsml-section-title">TWOFACE STORY</h2>
                </div>
                <a
                  href="https://www.youtube.com/@dosmil2000"
                  target="_blank"
                  rel="noreferrer"
                  className="dsml-link-btn"
                >
                  SUBSCRIBE ON YOUTUBE &#x2197;
                </a>
              </div>

              <div className="dsml-story-grid">
                {twofaceStoryVideos.slice(0, 3).map(story => (
                  <div key={story.title} className="dsml-story-card" onClick={() => setActiveVideo(story)}>
                    <div className="dsml-story-screen">
                      <img
                        src={`https://img.youtube.com/vi/${story.videoId}/hqdefault.jpg`}
                        alt={story.title}
                        className="dsml-story-thumb-img"
                        loading="lazy"
                      />
                      <div className="dsml-story-thumb-overlay"></div>
                      <div className="dsml-story-play">&#x25B6;</div>
                      <span className="dsml-story-code">{story.code}</span>
                      <span className="dsml-story-year">{story.year}</span>
                    </div>
                    <div className="dsml-story-body">
                      <span className="dsml-story-tag">{story.tag}</span>
                      <h4>{story.title}</h4>
                      <p>{story.desc}</p>
                      <button className="dsml-watch-link" onClick={(e) => { e.stopPropagation(); setActiveVideo(story); }}>
                        WATCH VIDEO &#x2197;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ========================================================
            SHOP PAGE: Full Catalog with Filters, Categories & Grid
           ======================================================== */}
        {activeTab === "Shop" && (
          <section className="dsml-section dsml-shop-page">
            <div className="dsml-page-header">
              <span className="dsml-section-badge">OFFICIAL STORE &bull; PHILIPPINES</span>
              <h1 className="dsml-page-title">{selectedCategory.toUpperCase()}</h1>
              <p className="dsml-page-desc">
                High-grade streetwear designed in Manila by Twoface Crew. High-density silkscreens, heavy combed cotton,
                engineered utility hardware, and custom boxy fits.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="dsml-category-pills">
              {categoryList.map(cat => (
                <button
                  key={cat}
                  className={`dsml-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Controls: Tag filter & Search */}
            <div className="dsml-shop-controls">
              <div className="dsml-filter-group">
                <span className="dsml-control-label">FILTER:</span>
                {["All", "New", "Heritage", "Under 1500"].map(f => (
                  <button
                    key={f}
                    className={`dsml-filter-btn ${activeFilter === f ? "active" : ""}`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="dsml-items-count">
                SHOWING <strong>{filteredProducts.length}</strong> PIECES
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="dsml-product-grid">
                {filteredProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={() => setSelectedProduct(p)}
                    onQuickAdd={() => handleAddToCart(p, "L", 1)}
                    imgError={imgErrors[p.id]}
                    onImgError={() => setImgErrors(prev => ({ ...prev, [p.id]: true }))}
                  />
                ))}
              </div>
            ) : (
              <div className="dsml-empty-state">
                <h3>NO PIECES FOUND</h3>
                <p>Try resetting the category filter or searching for another keyword.</p>
                <button
                  className="dsml-btn dsml-btn-primary"
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TWOFACE STORY PAGE: Editorial Behind-the-Scenes & Docs
           ======================================================== */}
        {activeTab === "Twoface Story" && (
          <section className="dsml-section dsml-story-page">
            <div className="dsml-page-header">
              <span className="dsml-section-badge">BRAND DOCUMENTARY &bull; ARCHIVE</span>
              <h1 className="dsml-page-title">TWOFACE STORY</h1>
              <p className="dsml-page-desc">
                DOSMIL is an autonomous lifestyle collective anchored in Manila youth culture. Two faces represent
                the split between who we are during the daily grind and the unrestrained version that creates in the dark.
              </p>
            </div>

            <div className="dsml-story-featured-card">
              <div className="dsml-featured-visual">
                <TwofaceOriginalLogo size={120} />
                <span className="dsml-featured-badge">DIRECT FROM THE STUDIO</span>
              </div>
              <div className="dsml-featured-info">
                <span className="dsml-tag">OFFICIAL YOUTUBE SERIES</span>
                <h2>BEHIND THE CAM</h2>
                <p>
                  Explore raw footage from campaign shoots, screen-printing presses, community night runs in Eastwood,
                  pop-up activations, and conversations with the local scene.
                </p>
                <a
                  href="https://www.youtube.com/@dosmil2000"
                  target="_blank"
                  rel="noreferrer"
                  className="dsml-btn dsml-btn-dark"
                >
                  WATCH ALL EPISODES ON YOUTUBE &#x2197;
                </a>
              </div>
            </div>

            <div className="dsml-story-grid">
              {twofaceStoryVideos.map(video => (
                <div key={video.title} className="dsml-story-card" onClick={() => setActiveVideo(video)}>
                  <div className="dsml-story-screen">
                    <img
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={video.title}
                      className="dsml-story-thumb-img"
                      loading="lazy"
                    />
                    <div className="dsml-story-thumb-overlay"></div>
                    <div className="dsml-story-play">&#x25B6;</div>
                    <span className="dsml-story-code">{video.code}</span>
                    <span className="dsml-story-year">{video.year}</span>
                  </div>
                  <div className="dsml-story-body">
                    <span className="dsml-story-tag">{video.tag}</span>
                    <h4>{video.title}</h4>
                    <p>{video.desc}</p>
                    <button className="dsml-watch-link" onClick={(e) => { e.stopPropagation(); setActiveVideo(video); }}>
                      WATCH BTS EPISODE &#x2197;
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Community Social Dispatches Banner */}
            <div className="dsml-community-banner">
              <div className="dsml-community-left">
                <span className="dsml-tag">OFFICIAL SOCIAL CHANNELS &bull; MANILA</span>
                <h2>JOIN THE TWOFACE COMMUNITY</h2>
                <p>
                  Follow daily dispatches, secret drop codes, BTS factory recordings, and pop-up locations across our official media platforms.
                </p>
                <div className="dsml-community-buttons">
                  <a
                    href="http://instagram.com/dosmil_ph/"
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-dark"
                  >
                    INSTAGRAM @DOSMIL_PH &#x2197;
                  </a>
                  <a
                    href="https://www.youtube.com/@dosmil2000"
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-bordered"
                  >
                    YOUTUBE @DOSMIL2000 &#x2197;
                  </a>
                  <a
                    href="https://www.tiktok.com/@dsml2000"
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-ghost"
                  >
                    TIKTOK @DSML2000 &#x2197;
                  </a>
                </div>
              </div>
              <div className="dsml-community-right">
                <div className="dsml-community-stamp">
                  <TwofaceOriginalLogo size={100} />
                  <span>MANILA 2000</span>
                  <strong>TWOFACE CREW</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
            LOOKBOOKS PAGE: Lookbook Catalog
           ======================================================== */}
        {activeTab === "Lookbooks" && (
          <section className="dsml-section dsml-lookbook-page">
            <div className="dsml-page-header">
              <span className="dsml-section-badge">VISUAL ARCHIVES &bull; EDITORIALS</span>
              <h1 className="dsml-page-title">LOOKBOOKS</h1>
              <p className="dsml-page-desc">
                Seasonal collections shot on location across Manila—from elevated concrete highways and Eastwood cityscapes
                to underground garage studios.
              </p>
            </div>

            <div className="dsml-lookbook-list">
              {lookbookList.map(lb => (
                <article key={lb.id} className="dsml-lookbook-item">
                  <div className="dsml-lb-index">
                    <span>{lb.id}</span>
                  </div>
                  <div className="dsml-lb-details">
                    <span className="dsml-tag">{lb.season} &bull; {lb.year}</span>
                    <h2>{lb.title}</h2>
                    <p>KEY FOCUS: {lb.focus}</p>
                  </div>
                  <div className="dsml-lb-action">
                    <button
                      className="dsml-btn dsml-btn-outline"
                      onClick={() => handleNavigate("Shop", "All Products")}
                    >
                      SHOP LOOKBOOK &rarr;
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================
            RUN CLUB PAGE: Eastwood Run Club & Community Info
           ======================================================== */}
        {activeTab === "Run Club" && (
          <section className="dsml-section dsml-run-page">
            <div className="dsml-page-header">
              <span className="dsml-section-badge">TWOFACE RUN CLUB &bull; MANILA</span>
              <h1 className="dsml-page-title">TWOFACE RUN CLUB</h1>
              <p className="dsml-page-desc">
                Not a competition. Not an exclusive crew. A space for runners, night owls, and community members
                to push their boundaries together on the streets of Eastwood.
              </p>
            </div>

            <div className="dsml-run-hero-banner">
              <div className="dsml-run-hero-left">
                <span className="dsml-run-schedule">THURSDAY NIGHTS &bull; 8:00 PM</span>
                <h2>EASTWOOD CITY &bull; QUEZON CITY</h2>
                <p>
                  All paces welcome. From 5K leisure loops to tempo work. Lock your bag, lace your shoes,
                  and run through the Manila air with the crew.
                </p>
                <div className="dsml-run-stats">
                  <div>
                    <strong>5K / 10K</strong>
                    <span>ROUTE OPTIONS</span>
                  </div>
                  <div>
                    <strong>FREE</strong>
                    <span>ALL PACES</span>
                  </div>
                  <div>
                    <strong>EASTWOOD</strong>
                    <span>MEETING POINT</span>
                  </div>
                </div>

                {/* RSVP Form */}
                <div className="dsml-run-rsvp-box">
                  <h4>RSVP FOR NEXT THURSDAY NIGHT RUN</h4>
                  {runClubRegistered ? (
                    <div className="dsml-run-success">
                      <span>✓ YOU'RE ON THE LIST</span>
                      <p>See you this Thursday, 8:00 PM at Eastwood Central Plaza. Check your IG for updates!</p>
                      <button className="dsml-link-btn" onClick={() => setRunClubRegistered(false)}>REGISTER ANOTHER RUNNER</button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (runForm.name) setRunClubRegistered(true);
                      }}
                      className="dsml-run-form"
                    >
                      <div className="dsml-run-inputs">
                        <input
                          type="text"
                          required
                          placeholder="RUNNER NAME..."
                          value={runForm.name}
                          onChange={(e) => setRunForm({ ...runForm, name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="IG HANDLE (@...)"
                          value={runForm.igHandle}
                          onChange={(e) => setRunForm({ ...runForm, igHandle: e.target.value })}
                        />
                        <select
                          value={runForm.pace}
                          onChange={(e) => setRunForm({ ...runForm, pace: e.target.value })}
                        >
                          <option>5K Casual (Easy Pace)</option>
                          <option>5K Intermediate (Moderate)</option>
                          <option>10K Tempo (Fast Pace)</option>
                        </select>
                      </div>
                      <button type="submit" className="dsml-btn dsml-btn-dark">
                        JOIN THIS THURSDAY &rarr;
                      </button>
                    </form>
                  )}
                </div>
              </div>
              <div className="dsml-run-hero-right">
                <div className="dsml-run-badge-art">
                  <TwofaceOriginalLogo size={90} />
                  <span>TWOFACE</span>
                  <strong>RUN CLUB</strong>
                  <small>EST. MMXXV</small>
                </div>
              </div>
            </div>

            {/* Run Club Gear */}
            <div className="dsml-section-header">
              <div>
                <span className="dsml-section-badge">OFFICIAL APPAREL</span>
                <h3 className="dsml-section-title">ENGINEERED RUNNING GEAR</h3>
              </div>
              <button
                className="dsml-link-btn"
                onClick={() => handleNavigate("Shop", "Running")}
              >
                VIEW ALL RUN GEAR &rarr;
              </button>
            </div>

            <div className="dsml-product-grid">
              {realProducts
                .filter(p => p.category === "Running" || p.tags.includes("Run Club") || p.title.includes("Phantom"))
                .map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={() => setSelectedProduct(p)}
                    onQuickAdd={() => handleAddToCart(p, "L", 1)}
                    imgError={imgErrors[p.id]}
                    onImgError={() => setImgErrors(prev => ({ ...prev, [p.id]: true }))}
                  />
                ))}
            </div>
          </section>
        )}

        {/* ========================================================
            HELP & CUSTOMER SUPPORT PAGE
           ======================================================== */}
        {activeTab === "Help" && (
          <section className="dsml-section dsml-help-page">
            <div className="dsml-page-header">
              <span className="dsml-section-badge">CUSTOMER SUPPORT &bull; FAQ</span>
              <h1 className="dsml-page-title">HELP & SUPPORT</h1>
              <p className="dsml-page-desc">
                Everything you need to know regarding ordering, payments via Cash on Delivery, sizing specifications,
                and shipping throughout the Philippines.
              </p>
            </div>

            <div className="dsml-faq-grid">
              <div className="dsml-faq-card">
                <span className="dsml-faq-num">01</span>
                <h4>CASH ON DELIVERY (COD)</h4>
                <p>
                  Yes, Cash on Delivery is supported nationwide across Metro Manila and provincial regions through our
                  integrated courier partners. Payment is collected directly at your doorstep upon handover.
                </p>
              </div>

              <div className="dsml-faq-card">
                <span className="dsml-faq-num">02</span>
                <h4>SHIPPING & DELIVERY TIMELINES</h4>
                <p>
                  Metro Manila deliveries typically take 2&ndash;4 business days. Provincial Luzon, Visayas, and Mindanao
                  orders arrive within 4&ndash;8 business days. Tracking details are emailed immediately upon dispatch.
                </p>
              </div>

              <div className="dsml-faq-card">
                <span className="dsml-faq-num">03</span>
                <h4>SIZING & FIT SPECIFICATIONS</h4>
                <p>
                  Our tees feature a custom regular boxy streetwear cut crafted in heavy 220 GSM combed cotton.
                  Hoodies utilize 420 GSM French Terry for a substantial drape. If you prefer an exaggerated oversized look,
                  we suggest sizing up one level.
                </p>
              </div>

              <div className="dsml-faq-card">
                <span className="dsml-faq-num">04</span>
                <h4>EXCHANGES & DAMAGED GOODS</h4>
                <p>
                  Items with factory defects or print flaws can be exchanged within 7 days of delivery with original
                  tags and packaging intact. Reach out via Instagram DM (@dosmil_ph) or the official support channel.
                </p>
              </div>
            </div>

            <div className="dsml-official-banner">
              <div>
                <h3>OFFICIAL DOSMIL PORTAL</h3>
                <p>For official order management, tracking lookups, and direct brand inquiries:</p>
              </div>
              <a
                href="https://www.dosmil2000.com/pages/customer-support"
                target="_blank"
                rel="noreferrer"
                className="dsml-btn dsml-btn-dark"
              >
                OPEN OFFICIAL SUPPORT PAGE &#x2197;
              </a>
            </div>
          </section>
        )}
      </main>

      {/* ========================================================
          NEWSLETTER / COMMUNITY SUBSCRIPTION SECTION
         ======================================================== */}
      <section className="dsml-newsletter-section">
        <div className="dsml-newsletter-inner">
          <div className="dsml-newsletter-text">
            <span className="dsml-tag">TWOFACE NOTIFICATIONS &bull; DROP ALERTS</span>
            <h2>NEVER MISS A RELEASE</h2>
            <p>Get early password access to limited capsule releases, pop-up events, and run club announcements.</p>
          </div>

          <form
            className="dsml-newsletter-form"
            onSubmit={e => {
              e.preventDefault();
              if (emailSub.includes("@")) {
                setSubMessage("Thank you for subscribing to DOSMIL drop notifications.");
                setEmailSub("");
              }
            }}
          >
            <div className="dsml-input-row">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL..."
                value={emailSub}
                onChange={e => setEmailSub(e.target.value)}
              />
              <button type="submit" className="dsml-btn dsml-btn-primary">
                SUBSCRIBE &rarr;
              </button>
            </div>
            {subMessage && <p className="dsml-sub-success">{subMessage}</p>}
          </form>
        </div>
      </section>

      {/* ========================================================
          FOOTER WITH SOCIALS & BRAND MARKS
         ======================================================== */}
      <footer className="dsml-footer">
        <div className="dsml-footer-top">
          <div className="dsml-footer-brand">
            <div className="dsml-footer-logo-row">
              <DosmilHeaderLogo height={42} />
            </div>
            <p className="dsml-footer-tagline">
              MANILA 2000 &bull; PHILIPPINE STREETWEAR<br />
              POWERED BY TWOFACE CREW &bull; ALL RIGHTS RESERVED
            </p>
            <div className="dsml-footer-socials">
              <a href="http://facebook.com/Dosmil.clothing/" target="_blank" rel="noreferrer" aria-label="Facebook">
                FB
              </a>
              <a href="http://instagram.com/dosmil_ph/" target="_blank" rel="noreferrer" aria-label="Instagram">
                IG
              </a>
              <a href="https://www.youtube.com/@dosmil2000" target="_blank" rel="noreferrer" aria-label="YouTube">
                YT
              </a>
              <a href="https://www.tiktok.com/@dsml2000" target="_blank" rel="noreferrer" aria-label="TikTok">
                TK
              </a>
              <a href="https://pin.it/75HYmQNaY" target="_blank" rel="noreferrer" aria-label="Pinterest">
                PIN
              </a>
            </div>
          </div>

          <div className="dsml-footer-nav-col">
            <h5>SHOP COLLECTIONS</h5>
            <button onClick={() => handleNavigate("Shop", "NEW COLLECTION")}>NEW COLLECTION</button>
            <button onClick={() => handleNavigate("Shop", "Tees")}>TEES (220 GSM)</button>
            <button onClick={() => handleNavigate("Shop", "Bottoms")}>BOTTOMS & SHORTS</button>
            <button onClick={() => handleNavigate("Shop", "Hoodies")}>HOODIES & FLEECE</button>
            <button onClick={() => handleNavigate("Shop", "HERITAGE PIECES")}>HERITAGE ARCHIVE</button>
          </div>

          <div className="dsml-footer-nav-col">
            <h5>CULTURE</h5>
            <button onClick={() => handleNavigate("Twoface Story")}>TWOFACE STORY</button>
            <button onClick={() => handleNavigate("Lookbooks")}>LOOKBOOKS</button>
            <button onClick={() => handleNavigate("Run Club")}>TWOFACE RUN CLUB</button>
            <button onClick={() => handleNavigate("Help")}>CUSTOMER CARE</button>
          </div>

          <div className="dsml-footer-nav-col">
            <h5>PORTFOLIO PITCH</h5>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GITHUB SOURCE &#x2197;
            </a>
            <button onClick={() => setShowPitchBadge(true)}>
              ABOUT THIS REDESIGN
            </button>
            <a href="https://www.dosmil2000.com/" target="_blank" rel="noreferrer">
              OFFICIAL STORE &#x2197;
            </a>
          </div>

          <div className="dsml-footer-nav-col">
            <h5>OFFICIAL LINKS</h5>
            <a href="https://www.dosmil2000.com/" target="_blank" rel="noreferrer">
              OFFICIAL DOSMIL STORE &#x2197;
            </a>
            <a href="https://www.dosmil2000.com/policies/privacy-policy" target="_blank" rel="noreferrer">
              PRIVACY POLICY &#x2197;
            </a>
            <a href="https://www.dosmil2000.com/pages/customer-support" target="_blank" rel="noreferrer">
              SUPPORT DESK &#x2197;
            </a>
          </div>
        </div>

        <div className="dsml-footer-bottom">
          <span>&copy; {new Date().getFullYear()} DOSMIL. REDESIGNED CONCEPT FAITHFUL TO ACTUAL BRAND STYLE.</span>
          <span>MANILA, PHILIPPINES &bull; 14&deg;35' N 120&deg;59' E</span>
        </div>
      </footer>

      {/* ========================================================
          PRODUCT DETAIL MODAL (Quick View & Purchase)
         ======================================================== */}
      {selectedProduct && (
        <div
          className="dsml-modal-overlay"
          onClick={e => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className="dsml-modal-card">
            <button
              className="dsml-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close Product Modal"
            >
              &times;
            </button>

            <div className="dsml-modal-grid">
              {/* Product Visual Gallery with Angle Thumbnails */}
              <div className="dsml-modal-gallery">
                <div className="dsml-modal-main-img">
                  {selectedProduct.images?.[activeImageIndex] && !imgErrors[`${selectedProduct.id}-${activeImageIndex}`] ? (
                    <img
                      src={selectedProduct.images[activeImageIndex]}
                      alt={`${selectedProduct.title} - View ${activeImageIndex + 1}`}
                      onError={() => setImgErrors(prev => ({ ...prev, [`${selectedProduct.id}-${activeImageIndex}`]: true }))}
                    />
                  ) : (
                    <div className="dsml-product-fallback-visual large">
                      <TwofaceOriginalLogo size={110} />
                      <span>{selectedProduct.sku}</span>
                    </div>
                  )}
                  <span className="dsml-modal-badge">{selectedProduct.badge}</span>
                </div>

                {/* Multiple Image Thumbnails Bottom Strip */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="dsml-modal-thumbnails">
                    {selectedProduct.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        className={`dsml-thumb-btn ${activeImageIndex === idx ? "active" : ""}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} />
                        <span>{idx === 0 ? "FRONT" : idx === 1 ? "BACK" : `0${idx + 1}`}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Information & Controls */}
              <div className="dsml-modal-info">
                <span className="dsml-tag">{selectedProduct.collection} &bull; {selectedProduct.sku}</span>
                <h2 className="dsml-modal-title">{selectedProduct.title}</h2>
                <div className="dsml-modal-price">{formatPHP(selectedProduct.price)}</div>

                <div className="dsml-modal-specs">
                  <span className="dsml-spec-heading">SPECIFICATIONS:</span>
                  <ul>
                    {selectedProduct.specs.map(spec => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </div>

                {/* Size Selector */}
                <div className="dsml-size-picker">
                  <div className="dsml-size-header">
                    <span>SELECT SIZE:</span>
                    <button
                      className="dsml-chart-link"
                      onClick={() => setIsSizeChartOpen(true)}
                    >
                      VIEW SIZE CHART &#x2197;
                    </button>
                  </div>
                  <div className="dsml-size-buttons">
                    {["S", "M", "L", "XL", "2XL"].map(sz => (
                      <button
                        key={sz}
                        className={`dsml-size-btn ${selectedSize === sz ? "active" : ""}`}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="dsml-qty-row">
                  <span>QUANTITY:</span>
                  <div className="dsml-qty-control">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>&minus;</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}>+</button>
                  </div>
                </div>

                {/* Actions */}
                <div className="dsml-modal-actions">
                  <button
                    className="dsml-btn dsml-btn-primary full"
                    onClick={() => {
                      handleAddToCart(selectedProduct, selectedSize, quantity);
                      setQuantity(1);
                    }}
                  >
                    ADD TO CART &bull; {formatPHP(selectedProduct.price * quantity)}
                  </button>
                  <button
                    className="dsml-btn dsml-btn-dark full"
                    onClick={() => {
                      handleAddToCart(selectedProduct, selectedSize, quantity);
                      setIsCheckoutOpen(true);
                      setSelectedProduct(null);
                    }}
                  >
                    BUY WITH CASH ON DELIVERY (COD)
                  </button>
                  <a
                    href={`https://www.dosmil2000.com/products/${selectedProduct.handle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-ghost full"
                  >
                    BUY DIRECT ON LIVE STORE &#x2197;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          SLIDE-OVER CART DRAWER (Authentic Shopify Drawer Style)
         ======================================================== */}
      {isCartOpen && (
        <div
          className="dsml-drawer-overlay"
          onClick={e => {
            if (e.target === e.currentTarget) setIsCartOpen(false);
          }}
        >
          <div className="dsml-cart-drawer">
            <div className="dsml-cart-header">
              <div>
                <span className="dsml-tag">YOUR SHOPPING BAG</span>
                <h3>YOUR CART ({cartCount})</h3>
              </div>
              <button
                className="dsml-close-cart"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
              >
                &times;
              </button>
            </div>

            <div className="dsml-cart-body">
              {cart.length > 0 ? (
                <div className="dsml-cart-list">
                  {cart.map(item => (
                    <div key={item.key} className="dsml-cart-item">
                      <div className="dsml-cart-item-img">
                        {item.images?.[0] && !imgErrors[item.id] ? (
                          <img src={item.images[0]} alt={item.title} />
                        ) : (
                          <div className="dsml-cart-fallback-img">
                            <TwofaceOriginalLogo size={40} />
                          </div>
                        )}
                      </div>

                      <div className="dsml-cart-item-details">
                        <div className="dsml-cart-item-head">
                          <h4>{item.title}</h4>
                          <span className="dsml-cart-price">{formatPHP(item.price * item.qty)}</span>
                        </div>
                        <span className="dsml-cart-meta">SIZE: {item.size}</span>

                        <div className="dsml-cart-stepper">
                          <button onClick={() => handleUpdateQty(item.key, -1)}>&minus;</button>
                          <span>{item.qty}</span>
                          <button onClick={() => handleUpdateQty(item.key, 1)}>+</button>
                          <button
                            className="dsml-remove-item"
                            onClick={() => handleUpdateQty(item.key, -item.qty)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dsml-empty-cart">
                  <TwofaceOriginalLogo size={70} />
                  <h4>YOUR BAG IS EMPTY</h4>
                  <p>Check out our latest releases or core essentials from the catalog.</p>
                  <button
                    className="dsml-btn dsml-btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      handleNavigate("Shop", "All Products");
                    }}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="dsml-cart-footer">
                <div className="dsml-subtotal-row">
                  <span>SUBTOTAL</span>
                  <strong>{formatPHP(cartSubtotal)}</strong>
                </div>
                <p className="dsml-shipping-note">Taxes and shipping calculated at checkout. Cash on Delivery supported.</p>
                <div className="dsml-cart-actions">
                  <button
                    className="dsml-btn dsml-btn-primary full"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    PROCEED TO CHECKOUT &rarr;
                  </button>
                  <button
                    className="dsml-btn dsml-btn-dark full"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                  >
                    BUY WITH CASH ON DELIVERY (COD)
                  </button>
                  <a
                    href="https://www.dosmil2000.com/collections/all"
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-ghost full"
                  >
                    SHOP ON OFFICIAL STORE &#x2197;
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pop-up Toast notification */}
      {toastMessage && (
        <div className="dsml-toast">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage("")}>&times;</button>
        </div>
      )}

      {/* ========================================================
          CASH ON DELIVERY CHECKOUT MODAL
         ======================================================== */}
      {isCheckoutOpen && (
        <div
          className="dsml-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCheckoutOpen(false);
          }}
        >
          <div className="dsml-modal-card dsml-checkout-card">
            <button
              className="dsml-modal-close"
              onClick={() => setIsCheckoutOpen(false)}
            >
              &times;
            </button>

            {orderPlaced ? (
              <div className="dsml-order-success">
                <div className="dsml-success-icon">&#10003;</div>
                <span className="dsml-tag">ORDER CONFIRMED &bull; CASH ON DELIVERY</span>
                <h2>SALAMAT SA ORDER, {orderPlaced.name.toUpperCase()}!</h2>
                <p>
                  Ang iyong order reference number ay <strong>{orderPlaced.orderId}</strong>.
                  Ihahanda na ng Twoface Crew ang iyong package at ipapadala via courier sa address na ito:
                </p>
                <div className="dsml-order-summary-box">
                  <p><strong>Shipping To:</strong> {orderPlaced.address}, {orderPlaced.barangay}, {orderPlaced.city}, {orderPlaced.province}</p>
                  <p><strong>Contact:</strong> {orderPlaced.phone} | {orderPlaced.email}</p>
                  <p><strong>Amount to Prepare upon Delivery:</strong> <span className="dsml-highlight-price">{formatPHP(orderPlaced.total)}</span></p>
                  <p><strong>Estimated Delivery:</strong> 2–4 business days (Metro Manila) / 4–7 days (Provinces)</p>
                </div>
                <div className="dsml-success-actions">
                  <button
                    className="dsml-btn dsml-btn-primary"
                    onClick={() => {
                      setCart([]);
                      setOrderPlaced(null);
                      setIsCheckoutOpen(false);
                    }}
                  >
                    CONTINUE SHOPPING &rarr;
                  </button>
                  <a
                    href="https://www.dosmil2000.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="dsml-btn dsml-btn-dark"
                  >
                    VISIT OFFICIAL DOSMIL STORE &#x2197;
                  </a>
                </div>
              </div>
            ) : (
              <div className="dsml-checkout-grid">
                <div className="dsml-checkout-form-col">
                  <span className="dsml-tag">NATIONWIDE SHIPPING &bull; PHILIPPINES</span>
                  <h2>CASH ON DELIVERY CHECKOUT</h2>
                  <p className="dsml-checkout-sub">Bayaran lamang pagdating ng rider sa iyong pintuan.</p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOrderPlaced({
                        orderId: `DSML-${Math.floor(100000 + Math.random() * 900000)}`,
                        name: codForm.fullName,
                        phone: codForm.phone,
                        email: codForm.email,
                        address: codForm.address,
                        barangay: codForm.barangay,
                        city: codForm.city,
                        province: codForm.province,
                        total: cartSubtotal,
                        items: cart
                      });
                    }}
                  >
                    <div className="dsml-form-group">
                      <label>FULL NAME (BUONG PANGALAN) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Juan Dela Cruz"
                        value={codForm.fullName}
                        onChange={(e) => setCodForm({ ...codForm, fullName: e.target.value })}
                      />
                    </div>

                    <div className="dsml-form-row">
                      <div className="dsml-form-group">
                        <label>MOBILE NUMBER (FOR COURIER SMS) *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0917 123 4567"
                          value={codForm.phone}
                          onChange={(e) => setCodForm({ ...codForm, phone: e.target.value })}
                        />
                      </div>
                      <div className="dsml-form-group">
                        <label>EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@email.com"
                          value={codForm.email}
                          onChange={(e) => setCodForm({ ...codForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="dsml-form-row">
                      <div className="dsml-form-group">
                        <label>PROVINCE / REGION *</label>
                        <select
                          value={codForm.province}
                          onChange={(e) => setCodForm({ ...codForm, province: e.target.value })}
                        >
                          <option>Metro Manila</option>
                          <option>Cavite</option>
                          <option>Laguna</option>
                          <option>Rizal</option>
                          <option>Bulacan</option>
                          <option>Pampanga</option>
                          <option>Cebu</option>
                          <option>Davao</option>
                          <option>Other Provincial Location</option>
                        </select>
                      </div>
                      <div className="dsml-form-group">
                        <label>CITY / MUNICIPALITY *</label>
                        <input
                          type="text"
                          required
                          placeholder="Quezon City, Manila, Makati, etc."
                          value={codForm.city}
                          onChange={(e) => setCodForm({ ...codForm, city: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="dsml-form-group">
                      <label>BARANGAY *</label>
                      <input
                        type="text"
                        required
                        placeholder="Barangay / Village / District"
                        value={codForm.barangay}
                        onChange={(e) => setCodForm({ ...codForm, barangay: e.target.value })}
                      />
                    </div>

                    <div className="dsml-form-group">
                      <label>HOUSE / UNIT NO., STREET & LANDMARKS *</label>
                      <textarea
                        required
                        rows="2"
                        placeholder="House No., Street Name, Landmark malapit sa bahay..."
                        value={codForm.address}
                        onChange={(e) => setCodForm({ ...codForm, address: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="dsml-payment-badge">
                      <div className="dsml-badge-check">&#10003;</div>
                      <div>
                        <strong>PAYMENT METHOD: CASH ON DELIVERY (COD)</strong>
                        <p>Walang kailangang bayaran ngayon. Ihanda ang eksaktong halaga pagdating ng rider.</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={cart.length === 0}
                      className="dsml-btn dsml-btn-primary full"
                    >
                      CONFIRM ORDER VIA CASH ON DELIVERY &bull; {formatPHP(cartSubtotal)}
                    </button>
                  </form>
                </div>

                <div className="dsml-checkout-summary-col">
                  <h3>ORDER SUMMARY ({cartCount})</h3>
                  <div className="dsml-checkout-items">
                    {cart.map((item) => (
                      <div key={item.key} className="dsml-checkout-item">
                        <img src={item.images?.[0]} alt={item.title} />
                        <div>
                          <h5>{item.title}</h5>
                          <span>Size: {item.size} &bull; Qty: {item.qty}</span>
                          <strong>{formatPHP(item.price * item.qty)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="dsml-checkout-totals">
                    <div>
                      <span>Subtotal</span>
                      <strong>{formatPHP(cartSubtotal)}</strong>
                    </div>
                    <div>
                      <span>Shipping Fee (Nationwide)</span>
                      <strong>FREE</strong>
                    </div>
                    <div className="dsml-grand-total">
                      <span>TOTAL PAYABLE (COD)</span>
                      <strong>{formatPHP(cartSubtotal)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          INTERACTIVE SIZE CHART MODAL
         ======================================================== */}
      {isSizeChartOpen && (
        <div
          className="dsml-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSizeChartOpen(false);
          }}
        >
          <div className="dsml-modal-card dsml-size-chart-modal">
            <button className="dsml-modal-close" onClick={() => setIsSizeChartOpen(false)}>
              &times;
            </button>
            <span className="dsml-tag">OFFICIAL MEASUREMENTS &bull; 220 GSM HEAVYWEIGHT</span>
            <h2>DOSMIL STREETWEAR SIZE GUIDE</h2>
            <p>Our tees and hoodies feature an authentic regular boxy streetwear cut crafted in Manila.</p>

            <div className="dsml-table-wrap">
              <table className="dsml-size-table">
                <thead>
                  <tr>
                    <th>SIZE</th>
                    <th>CHEST WIDTH (INCHES)</th>
                    <th>LENGTH (INCHES)</th>
                    <th>SHOULDER (INCHES)</th>
                    <th>RECOMMENDED FIT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>20"</td>
                    <td>27"</td>
                    <td>19"</td>
                    <td>Fitted / Standard</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>21"</td>
                    <td>28"</td>
                    <td>20"</td>
                    <td>Regular Boxy</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>22"</td>
                    <td>29"</td>
                    <td>21"</td>
                    <td>Classic Streetwear Boxy</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>23"</td>
                    <td>30"</td>
                    <td>22"</td>
                    <td>Relaxed Oversized</td>
                  </tr>
                  <tr>
                    <td><strong>2XL</strong></td>
                    <td>24"</td>
                    <td>31"</td>
                    <td>23"</td>
                    <td>Heavy Baggy Fit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="dsml-size-notes">
              <p>• <strong>Note:</strong> Measured flat on garment. Allow &plusmn;0.5 inch difference due to manual tailoring.</p>
              <p>• <strong>Fabric:</strong> 220 GSM 100% Combed Cotton, pre-washed for minimal shrinkage.</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          YOUTUBE VIDEO PLAYER MODAL (Twoface Story BTS)
         ======================================================== */}
      {activeVideo && (
        <div
          className="dsml-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          <div className="dsml-modal-card dsml-video-modal">
            <button className="dsml-modal-close" onClick={() => setActiveVideo(null)}>
              &times;
            </button>
            <span className="dsml-tag">{activeVideo.tag} &bull; {activeVideo.code}</span>
            <h2>{activeVideo.title}</h2>
            <div className="dsml-video-responsive">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="dsml-video-modal-foot">
              <p>{activeVideo.desc}</p>
              <a
                href={activeVideo.link}
                target="_blank"
                rel="noreferrer"
                className="dsml-btn dsml-btn-dark"
              >
                OPEN ON YOUTUBE CHANNEL &#x2197;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component: Product Card
function ProductCard({ product, onSelect, onQuickAdd, imgError, onImgError }) {
  const [isHovered, setIsHovered] = useState(false);

  // If product has a second image (e.g. back print), show it on hover!
  const hasBackImage = product.images && product.images.length > 1;
  const currentImgSrc = (isHovered && hasBackImage) ? product.images[1] : product.images?.[0];

  return (
    <article
      className="dsml-card dsml-card-interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="dsml-card-visual" onClick={onSelect}>
        {currentImgSrc && !imgError ? (
          <img
            src={currentImgSrc}
            alt={product.title}
            className={`dsml-card-img ${isHovered && hasBackImage ? "flipped" : ""}`}
            loading="lazy"
            onError={onImgError}
          />
        ) : (
          <div className="dsml-product-fallback-visual">
            <TwofaceOriginalLogo size={60} />
            <span className="dsml-fallback-sku">{product.sku}</span>
          </div>
        )}

        <span className="dsml-card-badge">{product.badge}</span>
        {hasBackImage && (
          <span className="dsml-hover-hint">{isHovered ? "BACK VIEW" : "HOVER FOR BACK"}</span>
        )}
        <button
          className="dsml-quick-add-btn"
          onClick={e => {
            e.stopPropagation();
            onQuickAdd();
          }}
          title="Quick add to bag"
        >
          + QUICK ADD
        </button>
      </div>

      <div className="dsml-card-body" onClick={onSelect}>
        <div className="dsml-card-tags">
          <span>{product.category.toUpperCase()}</span>
          {product.tags?.[0] && <span>&bull; {product.tags[0]}</span>}
        </div>
        <h3 className="dsml-card-title">{product.title}</h3>
        <div className="dsml-card-price">{formatPHP(product.price)}</div>
      </div>
    </article>
  );
}

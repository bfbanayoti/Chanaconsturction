/* ============================================================
   Nav · Hero · Accreditation marquee
   ============================================================ */
const { useState: uS1, useRef: uR1, useEffect: uE1 } = React;

const CURRENT = (typeof window !== "undefined" && window.PAGE) || "home";

function Brand() {
  return (
    <a className="brand" data-pagelink href={HOME} aria-label="Chana Construction home">
      <span className="brand-mark" />
      <span className="brand-name"><b>Chana</b> <span>Construction</span></span>
    </a>
  );
}

function Nav() {
  const scrolled = useScrollChrome();
  const [open, setOpen] = uS1(false);
  return (
    <React.Fragment>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <Brand />
          <nav className="nav-pill">
            {NAV_LINKS.map(l => (
              <a key={l.label} className={`nav-link ${CURRENT === l.page ? "current" : ""}`}
                data-pagelink href={l.href}>{l.label}</a>
            ))}
            <Magnetic strength={0.4}>
              <a className="nav-link cta" data-pagelink href="Contact.html">Get a quote <Arrow s={14} /></a>
            </Magnetic>
          </nav>
          <button className="nav-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            <span style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}} />
          </button>
        </div>
      </header>
      <div className={`sheet ${open ? "open" : ""}`}>
        {NAV_LINKS.concat([{ label: "Get a quote", href: "Contact.html", page: "contact" }]).map(l => (
          <a key={l.label} data-pagelink href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
    </React.Fragment>
  );
}

function HeroWire() {
  const d = (s) => ({ animationDelay: s });
  return (
    <div className="hero-wire" aria-hidden="true">
      <svg viewBox="0 0 400 300" fill="none">
        {/* blueprint grid */}
        <g className="wire-grid">
          {[...Array(9)].map((_, i) => <line key={"v" + i} x1={20 + i * 45} y1="20" x2={20 + i * 45} y2="288" />)}
          {[...Array(7)].map((_, i) => <line key={"h" + i} x1="20" y1={20 + i * 45} x2="380" y2={20 + i * 45} />)}
        </g>

        {/* house silhouette */}
        <path className="wd wire-ink" pathLength="1" style={d(".0s")}
          d="M40 268 L40 92 L150 92 L150 120 L300 120 L300 170 L380 170 L380 268 Z" />
        {/* storey division */}
        <path className="wd wire-ink" pathLength="1" style={d(".5s")} d="M40 180 L300 180" />
        {/* upper studs / framing */}
        <path className="wd wire-soft" pathLength="1" style={d(".8s")} d="M75 92 L75 180" />
        <path className="wd wire-soft" pathLength="1" style={d(".95s")} d="M110 92 L110 180" />
        <path className="wd wire-soft" pathLength="1" style={d("1.1s")} d="M210 120 L210 180" />
        {/* windows */}
        <rect className="wd wire-ink" pathLength="1" style={d("1.0s")} x="58" y="108" width="74" height="26" />
        <rect className="wd wire-ink" pathLength="1" style={d("1.2s")} x="168" y="134" width="118" height="28" />
        <rect className="wd wire-ink" pathLength="1" style={d("1.45s")} x="58" y="202" width="56" height="46" />
        <rect className="wd wire-ink" pathLength="1" style={d("1.6s")} x="200" y="206" width="72" height="42" />
        <rect className="wd wire-accent" pathLength="1" style={d("1.75s")} x="314" y="190" width="52" height="34" />
        {/* door */}
        <path className="wd wire-ink" pathLength="1" style={d("1.55s")} d="M132 268 L132 200 L172 200 L172 268" />
        {/* dimension line */}
        <path className="wd wire-accent" pathLength="1" style={d("1.9s")} d="M40 286 L380 286" />
        <path className="wd wire-accent" pathLength="1" style={d("2.0s")} d="M40 281 L40 291 M380 281 L380 291" />
      </svg>
      <span className="hero-wire-cap">Design &middot; Build &middot; Interiors</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <HeroWire />
      <div className="hero-top">
        <p className="enter e4">
          We deliver complete, end-to-end property and construction &mdash; empowering homeowners
          and developers with cutting-edge expertise and unwavering attention to detail at every stage.
        </p>
        <div className="right enter e5">
          <div className="big">A London firm built on decades of hands-on experience.</div>
        </div>
      </div>

      <div className="hero-head">
        <div className="eyebrow enter e1">Built on trust, quality &amp; client care</div>
        <h1 className="hero-title">
          <span className="line"><span className="line-i li1">Building</span></span>
          <span className="line"><span className="line-i li2"><span className="shiny">around you.</span></span></span>
        </h1>

        <div className="hero-cta-row enter e6">
          <Magnetic strength={0.3}>
            <a className="btn" data-pagelink href="Contact.html">Request a consultation <Arrow /></a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a className="btn ghost" data-pagelink href="Projects.html">View our work <ArrowUR s={15} /></a>
          </Magnetic>
          <span className="btn-note">Family-run &middot; London, UK</span>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ACCREDS.concat(ACCREDS);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((a, i) => (
          <span className="marquee-item" key={i}><span className="dot" />{a}</span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, Marquee, Brand });

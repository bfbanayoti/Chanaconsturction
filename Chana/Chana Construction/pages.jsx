/* ============================================================
   PageHero (interior pages) · CtaBand · page transitions
   ============================================================ */
const { useEffect: uEp } = React;

function PageHero({ eyebrow, lines, intro }) {
  return (
    <section className="page-hero wrap">
      <div className="eyebrow enter e1">{eyebrow}</div>
      <h1 className="page-hero-title">
        {lines.map((ln, i) => (
          <span className="line" key={i}>
            <span className={`line-i ${i === 0 ? "li1" : "li2"}`}>{ln}</span>
          </span>
        ))}
      </h1>
      {intro && <p className="page-hero-intro enter e4">{intro}</p>}
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div className="cta-glass reveal">
          <div className="cta-inner">
            <div className="reveal">
              <div className="eyebrow" style={{ marginBottom: "20px" }}>Start your project</div>
              <h2>Let's build<br />something lasting.</h2>
            </div>
            <div className="reveal d1 cta-aside">
              <p>Tell us about your plans. We'll arrange a relaxed, no-obligation consultation within one working day.</p>
              <Magnetic strength={0.3}>
                <a className="btn" data-pagelink href="Contact.html">Request a consultation <Arrow /></a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- luxe page transition (curtain wipe up) ---- */
function setupPageTransitions() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const curtain = document.querySelector(".curtain");
  if (!curtain) return;

  if (reduce) { curtain.style.display = "none"; }
  else {
    // ENTER: curtain covers on load, shows brand animation, then lifts away
    curtain.style.transform = "translateY(0)";
    curtain.style.transition = "none";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      curtain.style.transition = "transform 1s cubic-bezier(0.76,0,0.24,1)";
      curtain.style.transform = "translateY(-100%)";
      setTimeout(() => { document.body.style.overflow = ""; }, 1000);
    }, 2200);
    // safety fallback
    setTimeout(() => { curtain.style.transform = "translateY(-100%)"; document.body.style.overflow = ""; }, 3400);
  }

  document.addEventListener("click", (ev) => {
    const a = ev.target.closest("a[data-pagelink]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || a.target === "_blank" || ev.metaKey || ev.ctrlKey) return;
    // same page? ignore
    const here = location.pathname.split("/").pop();
    if (decodeURIComponent(href) === decodeURIComponent(here)) { ev.preventDefault(); return; }
    if (reduce) return; // let it navigate normally
    ev.preventDefault();
    curtain.style.transition = "none";
    curtain.style.transform = "translateY(100%)";
    void curtain.offsetWidth;
    requestAnimationFrame(() => {
      curtain.style.transition = "transform .7s cubic-bezier(0.76,0,0.24,1)";
      curtain.style.transform = "translateY(0)";
    });
    setTimeout(() => { window.location.href = href; }, 640);
  });

  // restore on back/forward cache
  window.addEventListener("pageshow", (e) => {
    if (e.persisted && !reduce) {
      curtain.style.transition = "none";
      curtain.style.transform = "translateY(-100%)";
    }
  });
}

Object.assign(window, { PageHero, CtaBand, setupPageTransitions });

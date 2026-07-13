/* ============================================================
   App — page routing, tweaks, transitions, mount
   ============================================================ */
const { useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b05b36",
  "headline": "Editorial",
  "motion": "Full"
}/*EDITMODE-END*/;

const ACCENTS = ["#b05b36", "#3a5a7a", "#5e6b3b", "#8a3f3a", "#2c2c29"];
const SERIF_STACKS = {
  Editorial: '"Newsreader", Georgia, serif',
  Classic: '"Cormorant Garamond", Georgia, serif',
  Modern: '"Hanken Grotesk", "Helvetica Neue", sans-serif',
};

const PAGE = (typeof window !== "undefined" && window.PAGE) || "home";

const PAGE_META = {
  about:    { eyebrow: "About us", lines: ["A family business,", "a higher standard"], intro: "Founded on a simple principle — exceptional workmanship, honest value, and a level of client care too often missing from the industry." },
  services: { eyebrow: "What we do", lines: ["One team,", "the whole journey"], intro: "An integrated turnkey solution guiding you from land acquisition and bespoke design through construction, handover and dedicated lifetime aftercare." },
  projects: { eyebrow: "Selected work", lines: ["Homes we're", "proud of"], intro: "Bespoke new builds, careful refurbishments and multi-unit developments across London — each treated as if it were our own." },
  contact:  { eyebrow: "Get in touch", lines: ["Let's bring your", "vision to life"], intro: "Tell us about your plans and we'll arrange a relaxed, no-obligation consultation within one working day." },
};

function PageContent() {
  if (PAGE === "about") {
    return (
      <React.Fragment>
        <PageHero {...PAGE_META.about} />
        <About />
        <FounderStory />
        <Stats eyebrow="By the numbers" heading="Standards we hold ourselves to" sub="These are not targets — they are the baseline commitments every Chana client can expect, on every project, without exception." />
        <Values />
        <Process />
        <WhereWeBuild />
        <CtaBand />
      </React.Fragment>
    );
  }
  if (PAGE === "services") {
    return (
      <React.Fragment>
        <PageHero {...PAGE_META.services} />
        <ServiceCards />
        <WhyChana />
        <TradesList />
        <Process />
        <AccredsBand />
        <CtaBand />
      </React.Fragment>
    );
  }
  if (PAGE === "projects") {
    return (
      <React.Fragment>
        <PageHero {...PAGE_META.projects} />
        <ProjectBreakdown />
        <Projects />
        <Testimonials />
        <CtaBand />
      </React.Fragment>
    );
  }
  if (PAGE === "project-detail") {
    return (
      <React.Fragment>
        <ProjectDetail />
        <CtaBand />
      </React.Fragment>
    );
  }
  if (PAGE === "contact") {
    return (
      <React.Fragment>
        <Contact />
      </React.Fragment>
    );
  }
  // home
  return (
    <React.Fragment>
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Projects />
      <Process />
      <Testimonials />
      <CtaBand />
    </React.Fragment>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  uE(() => {
    const id = requestAnimationFrame(() => document.body.classList.add("loaded"));
    document.body.classList.add(`page-${PAGE}`);
    setupPageTransitions();
    return () => cancelAnimationFrame(id);
  }, []);

  uE(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-deep", `color-mix(in oklch, ${t.accent}, black 16%)`);
    r.setProperty("--accent-tint", `color-mix(in oklch, ${t.accent}, transparent 90%)`);
    window.__pendingAccent = t.accent;
    if (window.__house) window.__house.setAccent(t.accent);
  }, [t.accent]);

  uE(() => {
    document.documentElement.style.setProperty("--serif", SERIF_STACKS[t.headline] || SERIF_STACKS.Editorial);
    document.body.classList.toggle("headline-modern", t.headline === "Modern");
  }, [t.headline]);

  uE(() => {
    document.body.classList.toggle("calm", t.motion === "Calm");
  }, [t.motion]);

  return (
    <React.Fragment>
      <div className="progress" />
      <Nav />
      <main className={`page page-${PAGE}`}>
        <PageContent />
      </main>
      <Footer />
      <div className="curtain">
        <div className="curtain-inner">
          <span className="curtain-mark-dot" />
          <span className="curtain-name"><b>Chana</b> <span>Design &amp; Build</span></span>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Brand accent" />
        <TweakColor label="Accent colour" value={t.accent} options={ACCENTS}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Typography" />
        <TweakRadio label="Headlines" value={t.headline}
          options={["Editorial", "Classic", "Modern"]}
          onChange={(v) => setTweak("headline", v)} />
        <TweakSection label="Motion" />
        <TweakRadio label="Animation" value={t.motion}
          options={["Full", "Calm"]}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

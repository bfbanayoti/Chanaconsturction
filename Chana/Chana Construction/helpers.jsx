/* ============================================================
   Helpers, hooks & small shared components
   (exported to window for cross-file use)
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---- Icons (lucide-style strokes, hand-kept simple) ---- */
const Arrow = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
  </svg>
);
const ArrowUR = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
);
const Check = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ---- Scroll reveal (position-based — robust even when IO can't fire) ---- */
function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
      return;
    }
    let raf = null;
    const check = () => {
      raf = null;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.in)").forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();
    // settle pass after fonts/layout
    const t = setTimeout(check, 400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);
}

/* ---- Count up ---- */
function CountUp({ to, suffix = "", prefix = "", dur = 1700, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setVal(to); return; }
    const run = () => {
      done.current = true;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const check = () => {
      if (done.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) { run(); cleanup(); }
    };
    const onScroll = () => check();
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check();
    const t = setTimeout(check, 400);
    return () => { cleanup(); clearTimeout(t); };
  }, [to, dur]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref}>{prefix}{shown}<span className="suf">{suffix}</span></span>;
}

/* ---- Magnetic wrapper ---- */
function Magnetic({ children, strength = 0.35, className = "", ...rest }) {
  const ref = useRef(null);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onMove = useCallback((e) => {
    if (reduce) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength, reduce]);
  const onLeave = useCallback(() => {
    const el = ref.current; if (el) el.style.transform = "translate(0,0)";
  }, []);
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ display: "inline-flex", transition: "transform .45s cubic-bezier(0.22,1,0.36,1)" }} {...rest}>
      {children}
    </span>
  );
}

/* ---- Parallax (translateY on scroll) ---- */
function useParallax(ref, factor = 0.12) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = null;
    const update = () => {
      raf = null;
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * -factor}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [ref, factor]);
}

/* ---- Placeholder image (striped) ---- */
function Ph({ label = "Photography", dark = false, className = "", style }) {
  return <div className={`ph ${dark ? "dark" : ""} ${className}`} data-label={label} style={style} />;
}

/* ---- Reading progress + scroll state ---- */
function useScrollChrome() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const bar = document.querySelector(".progress");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      setScrolled(h.scrollTop > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

Object.assign(window, {
  Arrow, ArrowUR, Check, useReveal, CountUp, Magnetic, useParallax, Ph, useScrollChrome,
});

/* ============================================================
   About statement · Services · Stats
   ============================================================ */
const { useState: uS2, useEffect: uE2, useRef: uR2 } = React;

/* ---- Service preview canvas animation ---- */
function SvcAnim({ index, active }) {
  const cvs = uR2(null);
  const raf = uR2(null);
  const t0  = uR2(null);

  uE2(() => {
    if (!active) return;
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let alive = true;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#b05b36";

    function drawScene(ts) {
      if (!alive) return;
      if (!t0.current) t0.current = ts;
      const t = (ts - t0.current) / 1000;
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // subtle warm gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "oklch(0.97 0.005 80 / 0.0)");
      bg.addColorStop(1, "oklch(0.93 0.012 75 / 0.15)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      switch (index) {
        case 0: drawLandScan(ctx, W, H, t, accent); break;
        case 1: drawBlueprintLines(ctx, W, H, t, accent); break;
        case 2: drawArchFrame(ctx, W, H, t, accent); break;
        case 3: drawInteriorRoom(ctx, W, H, t, accent); break;
        case 4: drawCheckmarks(ctx, W, H, t, accent); break;
        case 5: drawShieldPulse(ctx, W, H, t, accent); break;
        case 6: drawBuildRise(ctx, W, H, t, accent); break;
        default: drawBlueprintLines(ctx, W, H, t, accent);
      }
      ctx.restore();
      raf.current = requestAnimationFrame(drawScene);
    }

    raf.current = requestAnimationFrame(drawScene);
    return () => {
      alive = false;
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [active, index]);

  // reset timer when becoming active
  uE2(() => {
    if (active) t0.current = null;
  }, [active]);

  return <canvas ref={cvs} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ---- animation scenes ---- */

function drawLandScan(ctx, W, H, t, accent) {
  // Construction site survey — concentric plot rings + scan sweep + building footprint
  const cx = W / 2, cy = H * 0.5;

  // — survey contour rings (same elegant style, slightly more elliptical like a site plan)
  const rings = 7;
  for (let i = 0; i < rings; i++) {
    const rx = (i + 1) * W * 0.075;
    const ry = (i + 1) * H * 0.062;
    const phase = t * 0.4 - i * 0.25;
    const alpha = 0.11 + 0.09 * Math.sin(phase);
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(176,91,54,${alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // — horizontal scan sweep
  const scanY = (t * 0.45 % 1) * H;
  const grad = ctx.createLinearGradient(0, scanY - 28, 0, scanY + 28);
  grad.addColorStop(0,   "rgba(176,91,54,0)");
  grad.addColorStop(0.5, "rgba(176,91,54,0.2)");
  grad.addColorStop(1,   "rgba(176,91,54,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, scanY - 28, W, 56);

  // — building footprint (simple L-shaped plan, fades in then loops)
  const cycle = 7;
  const fp = Math.min(1, (t % cycle) / 3.5);
  if (fp > 0) {
    const bw = W * 0.28, bh = H * 0.22;
    const bx = cx - bw / 2, by = cy - bh / 2;
    // main rectangle outline drawing itself
    const perim = 2 * (bw + bh);
    ctx.save();
    ctx.strokeStyle = `rgba(176,91,54,${0.55 * fp})`;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([perim * fp, perim]);
    ctx.lineDashOffset = 0;
    ctx.strokeRect(bx, by, bw, bh);
    // internal room divider
    if (fp > 0.6) {
      const p2 = (fp - 0.6) / 0.4;
      ctx.setLineDash([bw * 0.5 * p2, bw]);
      ctx.beginPath();
      ctx.moveTo(bx + bw * 0.5, by);
      ctx.lineTo(bx + bw * 0.5, by + bh * p2);
      ctx.strokeStyle = `rgba(176,91,54,${0.3 * p2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();

    // corner survey stakes
    const corners = [[bx,by],[bx+bw,by],[bx+bw,by+bh],[bx,by+bh]];
    corners.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(sx - 5, sy); ctx.lineTo(sx + 5, sy);
      ctx.moveTo(sx, sy - 5); ctx.lineTo(sx, sy + 5);
      ctx.strokeStyle = `rgba(176,91,54,${0.45 * fp})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  // — theodolite crosshair at centre
  const cr = 7;
  ctx.strokeStyle = `rgba(176,91,54,0.5)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - cr * 2.2, cy); ctx.lineTo(cx - cr * 0.5, cy);
  ctx.moveTo(cx + cr * 0.5, cy); ctx.lineTo(cx + cr * 2.2, cy);
  ctx.moveTo(cx, cy - cr * 2.2); ctx.lineTo(cx, cy - cr * 0.5);
  ctx.moveTo(cx, cy + cr * 0.5); ctx.lineTo(cx, cy + cr * 2.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.stroke();
  // centre dot
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  // pulsing ring
  const pulse = (t * 1.2 % 1);
  ctx.beginPath();
  ctx.arc(cx, cy, cr + pulse * 14, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(176,91,54,${0.3 * (1 - pulse)})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawBlueprintLines(ctx, W, H, t, accent) {
  // Blueprint: grid + walls appearing, dimension arrows
  const ox = W * 0.15, oy = H * 0.18;
  const rw = W * 0.7, rh = H * 0.64;
  const progress = Math.min(1, (t % 6) / 3);
  ctx.strokeStyle = "rgba(176,91,54,0.18)";
  ctx.lineWidth = 0.5;
  // grid
  const step = 22;
  for (let x = ox % step; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = oy % step; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // walls
  ctx.strokeStyle = `rgba(176,91,54,${0.7})`;
  ctx.lineWidth = 2;
  const drawW = rw * progress;
  ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + drawW, oy); ctx.stroke();
  if (progress > 0.25) { const p2 = Math.min(1, (progress - 0.25) / 0.75);
    ctx.beginPath(); ctx.moveTo(ox + rw, oy); ctx.lineTo(ox + rw, oy + rh * p2); ctx.stroke(); }
  if (progress > 0.5) { const p3 = Math.min(1, (progress - 0.5) / 0.5);
    ctx.beginPath(); ctx.moveTo(ox + rw, oy + rh); ctx.lineTo(ox + rw - rw * p3, oy + rh); ctx.stroke(); }
  if (progress > 0.75) { const p4 = Math.min(1, (progress - 0.75) / 0.25);
    ctx.beginPath(); ctx.moveTo(ox, oy + rh); ctx.lineTo(ox, oy + rh - rh * p4); ctx.stroke(); }
}

function drawArchFrame(ctx, W, H, t, accent) {
  // Architectural arch / window frame drawing itself
  const cx = W / 2, base = H * 0.82, r = Math.min(W, H) * 0.26;
  const phase = t * 0.6;
  // outer frame
  ctx.strokeStyle = "rgba(176,91,54,0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - r, base);
  ctx.lineTo(cx - r, base - r);
  ctx.arc(cx, base - r, r, Math.PI, 0, false);
  ctx.lineTo(cx + r, base);
  ctx.stroke();
  // inner inset
  const ir = r * 0.72;
  ctx.strokeStyle = "rgba(176,91,54,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - ir, base - 10);
  ctx.lineTo(cx - ir, base - r);
  ctx.arc(cx, base - r, ir, Math.PI, 0, false);
  ctx.lineTo(cx + ir, base - 10);
  ctx.stroke();
  // rotating compass/cross
  ctx.save(); ctx.translate(cx, base - r);
  ctx.rotate(phase * 0.08);
  ctx.strokeStyle = `rgba(176,91,54,0.22)`;
  ctx.lineWidth = 0.8;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * ir * 0.9, Math.sin(a) * ir * 0.9); ctx.stroke();
  }
  ctx.restore();
  // pulsing keystone dot
  const dot = 3 + Math.sin(phase) * 1.5;
  ctx.beginPath(); ctx.arc(cx, base - r * 2, dot, 0, Math.PI * 2);
  ctx.fillStyle = accent; ctx.fill();
}

function drawInteriorRoom(ctx, W, H, t, accent) {
  // One-point perspective room — floor/walls/ceiling
  const vx = W / 2, vy = H * 0.42;
  const corners = [[0,0],[W,0],[W,H],[0,H]];
  const vanish = (px, py) => [px + (vx - px) * 0.55, py + (vy - py) * 0.55];

  ctx.strokeStyle = "rgba(176,91,54,0.5)";
  ctx.lineWidth = 1.2;
  corners.forEach(([px, py]) => {
    const [tx, ty] = vanish(px, py);
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke();
  });
  // back wall box
  const [bx1] = vanish(0, 0); const [bx2] = vanish(W, 0);
  const [, by1] = vanish(0, 0); const [, by2] = vanish(0, H);
  ctx.strokeStyle = "rgba(176,91,54,0.3)";
  ctx.strokeRect(bx1, by1, bx2 - bx1, by2 - by1);
  // window highlight
  const ww = (bx2 - bx1) * 0.35, wh = (by2 - by1) * 0.45;
  const wx = vx - ww / 2, wy = vy - wh * 0.55;
  const winGrad = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(ww, wh) * 0.8);
  winGrad.addColorStop(0, "rgba(176,91,54,0.18)");
  winGrad.addColorStop(1, "rgba(176,91,54,0)");
  ctx.fillStyle = winGrad;
  ctx.fillRect(wx, wy, ww, wh);
  ctx.strokeStyle = `rgba(176,91,54,${0.4 + 0.15 * Math.sin(t * 1.5)})`;
  ctx.strokeRect(wx, wy, ww, wh);
}

function drawCheckmarks(ctx, W, H, t, accent) {
  // Sequential checkmarks appearing — compliance
  const items = 5;
  const spacing = H / (items + 1);
  const elapsed = t % (items * 1.2 + 2);
  ctx.lineWidth = 2;
  for (let i = 0; i < items; i++) {
    const appear = Math.max(0, Math.min(1, (elapsed - i * 1.2) / 0.6));
    const y = spacing * (i + 1);
    const cx2 = W * 0.22;
    // circle
    ctx.beginPath();
    ctx.arc(cx2, y, 10, 0, Math.PI * 2 * appear);
    ctx.strokeStyle = `rgba(176,91,54,${0.3 + 0.5 * appear})`;
    ctx.stroke();
    if (appear > 0.7) {
      // tick
      const a = (appear - 0.7) / 0.3;
      ctx.beginPath();
      ctx.moveTo(cx2 - 5, y);
      ctx.lineTo(cx2 - 1, y + 5 * a);
      ctx.lineTo(cx2 + 6, y - 5 * a);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // label bar
    const barW = (W * 0.55) * appear;
    ctx.fillStyle = `rgba(176,91,54,${0.08 + 0.06 * appear})`;
    ctx.fillRect(cx2 + 18, y - 7, barW, 14);
    ctx.fillStyle = `rgba(176,91,54,${0.45 * appear})`;
    ctx.fillRect(cx2 + 18, y - 7, barW * 0.4, 14);
  }
}

function drawShieldPulse(ctx, W, H, t, accent) {
  // Shield shape with concentric pulses — warranty/peace of mind
  const cx = W / 2, cy = H / 2;
  const sz = Math.min(W, H) * 0.28;
  // pulses
  for (let i = 0; i < 3; i++) {
    const phase = (t * 0.5 + i / 3) % 1;
    const pr = sz * (1 + phase * 1.4);
    ctx.beginPath();
    ctx.arc(cx, cy, pr, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(176,91,54,${0.18 * (1 - phase)})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  // shield path
  ctx.beginPath();
  ctx.moveTo(cx, cy - sz);
  ctx.lineTo(cx + sz * 0.8, cy - sz * 0.55);
  ctx.lineTo(cx + sz * 0.8, cy + sz * 0.1);
  ctx.quadraticCurveTo(cx + sz * 0.8, cy + sz * 1.0, cx, cy + sz * 1.1);
  ctx.quadraticCurveTo(cx - sz * 0.8, cy + sz * 1.0, cx - sz * 0.8, cy + sz * 0.1);
  ctx.lineTo(cx - sz * 0.8, cy - sz * 0.55);
  ctx.closePath();
  ctx.strokeStyle = `rgba(176,91,54,0.65)`;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = `rgba(176,91,54,0.06)`;
  ctx.fill();
  // inner tick
  ctx.beginPath();
  ctx.moveTo(cx - sz * 0.3, cy + sz * 0.05);
  ctx.lineTo(cx - sz * 0.05, cy + sz * 0.38);
  ctx.lineTo(cx + sz * 0.4, cy - sz * 0.25);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

function drawBuildRise(ctx, W, H, t, accent) {
  // Building floors rising up — construction/turnkey
  const floors = 8, fw = W * 0.52, fh = H * 0.068;
  const ox = (W - fw) / 2, base = H * 0.84;
  const cycle = 5;
  const revealed = Math.min(floors, Math.floor((t % (cycle * 1.4)) / (cycle / floors) * 1.4));
  for (let i = 0; i < revealed; i++) {
    const fy = base - (i + 1) * (fh + 4);
    const alpha = 0.55 - i * 0.04;
    ctx.fillStyle = `rgba(176,91,54,${alpha})`;
    ctx.fillRect(ox, fy, fw, fh);
    // floor line
    ctx.strokeStyle = `rgba(255,245,235,0.3)`;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(ox, fy, fw, fh);
    // windows
    const wc = 4, wp = fw / wc;
    for (let w = 0; w < wc; w++) {
      const on = Math.sin(t * 1.5 + i * 0.7 + w * 1.2) > 0.2;
      ctx.fillStyle = on ? `rgba(255,230,180,0.55)` : `rgba(255,245,235,0.08)`;
      ctx.fillRect(ox + w * wp + wp * 0.2, fy + fh * 0.2, wp * 0.55, fh * 0.6);
    }
  }
  // ground line
  ctx.strokeStyle = `rgba(176,91,54,0.3)`;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(ox - 20, base); ctx.lineTo(ox + fw + 20, base); ctx.stroke();
}

function About() {
  return (
    <section className="section statement wrap" id="about">
      <div className="eyebrow reveal" style={{ marginBottom: "34px" }}>Our philosophy</div>
      <div className="statement-grid">
        <h2 className="big-quote reveal d1">
          We place our clients at the <em>centre</em> of everything we build.
        </h2>
        <div className="statement-side reveal d2">
          <p>
            Chana Construction was founded on a simple principle: delivering exceptional
            workmanship, honest value, and a level of client care too often missing from the industry —
            born from years of watching people let down by poor quality and silence after handover.
          </p>
          <p>
            Whether you are building your forever home, undertaking a major refurbishment, or investing
            in a development, we understand this is one of the most significant — and stressful —
            commitments you will ever make. So we make the whole process smooth, transparent and genuinely enjoyable.
          </p>
          <div className="sig">
            The Chana family
            <small>Founders &amp; directors</small>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Visual service cards — shown on Services page */
function ServiceCards() {
  return (
    <section className="section svc-cards-bg" id="service-cards">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">What we offer</div>
            <h2 className="reveal d1">Every stage.<br />One team.</h2>
          </div>
          <p className="lead reveal d2">
            From securing the right plot to handing over the keys — and everything after —
            we manage it all under one roof so nothing falls through the cracks.
          </p>
        </div>
        <div className="svc-cards-grid">
          {SERVICES.map((s, i) => (
            <div className={`svc-card reveal ${i % 3 ? "d" + (i % 3) : ""}`} key={s.name}>
              <div className="svc-card-anim">
                <SvcAnim index={i} active={true} />
              </div>
              <div className="svc-card-body">
                <span className="svc-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="svc-card-name">{s.name}</h3>
                <p className="svc-card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Interactive deep-dive panel — shown on home page */
function Services() {
  const [active, setActive] = uS2(0);
  return (
    <section className="services-bg" id="services">
      <div className="section wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Capabilities</div>
            <h2 className="reveal d1">From land to lifelong aftercare.</h2>
          </div>
          <p className="lead reveal d2">
            A true one-stop solution — from the first search for land through design, construction,
            handover and lifelong aftercare. Hover any service to explore it.
          </p>
        </div>

        <div className="svc-layout">
          <div className="svc-list reveal">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className={`svc-row ${active === i ? "active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="name">{s.name}</span>
                <span className="arrow"><ArrowUR s={20} /></span>
                <div className="desc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="svc-preview reveal d1">
            {SERVICES.map((s, i) => (
              <div key={s.name} className={`frame ${active === i ? "show" : ""}`}>
                <SvcAnim index={i} active={active === i} />
              </div>
            ))}
            <div className="cap">{SERVICES[active].cap}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  { n: "01", h: "Single point of contact", p: "One dedicated project manager from first call to final handover. No juggling contractors, no crossed wires." },
  { n: "02", h: "Fixed, transparent pricing", p: "We cost projects thoroughly before work begins. What we quote is what you pay — no hidden variations." },
  { n: "03", h: "In-house trades network", p: "Our vetted team handles every discipline — structure, M&E, fit-out, smart home — under one contract." },
  { n: "04", h: "10-year structural warranty", p: "Every new-build we complete comes with a full 10-year structural warranty and dedicated aftercare support." },
];

function WhyChana() {
  return (
    <section className="section why-bg" id="why-chana">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Why Chana</div>
            <h2 className="reveal d1">The difference<br />is in the detail.</h2>
          </div>
          <p className="lead reveal d2">
            We are not the biggest firm in London. We are deliberate about that — it means every
            client gets the principals, not the juniors.
          </p>
        </div>
        <div className="why-grid">
          {WHY_ITEMS.map((w, i) => (
            <div className={`why-item reveal ${i ? "d" + (i % 3) : ""}`} key={w.h}>
              <span className="why-n">{w.n}</span>
              <h3 className="why-h">{w.h}</h3>
              <p className="why-p">{w.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ eyebrow, heading, sub }) {
  return (
    <section className="section" id="stats">
      <div className="wrap"><div className="sec-head">
        <div>
          <div className="eyebrow reveal">{eyebrow || "Our track record"}</div>
          <h2 className="reveal d1">{heading || "Measured by trust."}</h2>
        </div>
        <p className="lead reveal d2">
          {sub || "Our success is measured not only by the quality of the homes we create, but by the confidence of the clients we serve."}
        </p>
      </div>
      <div className="stats reveal d1">
        {STATS.map((st, i) => (
          <div className="stat" key={i}>
            <div className="v">
              {st.display
                ? <span>{st.display}</span>
                : <CountUp to={st.to} suffix={st.suffix} />}
            </div>
            <div className="k">{st.k}</div>
          </div>
        ))}
      </div></div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="section founder-bg" id="founder">
      <div className="wrap founder-grid">
        <div className="founder-img reveal">
          <img src="assets/hampstead-house.jpg" alt="Chana family" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"6px" }} />
        </div>
        <div className="founder-copy">
          <div className="eyebrow reveal" style={{ marginBottom:"28px" }}>Our story</div>
          <h2 className="reveal d1">Built on a family<br />tradition of craft.</h2>
          <p className="reveal d2">
            The Chana family has been surrounded by construction and craftsmanship for generations.
            What began as a frustration — watching friends and family be let down by contractors who
            overpromised and underdelivered — became a mission.
          </p>
          <p className="reveal d2">
            We founded Chana Construction on a simple idea: that building someone's home is one of
            the most significant things you can do for them, and it deserves to be treated that way.
            Every project we take on, we treat as if it were our own.
          </p>
          <div className="sig reveal d3">
            The Chana family
            <small>Founders &amp; directors</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="section" id="values">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">What drives us</div>
            <h2 className="reveal d1">Six principles.<br />No exceptions.</h2>
          </div>
          <p className="lead reveal d2">
            These are not aspirations — they are the standards we hold ourselves to on every project,
            every day.
          </p>
        </div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div className={`value-card reveal ${i ? "d"+(i%3) : ""}`} key={v.h}>
              <span className="v-icon">{v.icon}</span>
              <h3 className="v-h">{v.h}</h3>
              <p className="v-p">{v.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradesList() {
  return (
    <section className="section trades-bg" id="trades">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Full scope</div>
            <h2 className="reveal d1">Everything under<br />one roof.</h2>
          </div>
          <p className="lead reveal d2">
            We manage every trade in-house or through our vetted network — so you have one point
            of contact and zero coordination headaches.
          </p>
        </div>
        <div className="trades-grid">
          {TRADES.map((t, i) => (
            <div className={`trade-col reveal ${i ? "d"+(i%3) : ""}`} key={t.cat}>
              <h4 className="trade-cat">{t.cat}</h4>
              <ul className="trade-list">
                {t.items.map(item => (
                  <li key={item}><span className="trade-dot" />{ item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccredsBand() {
  const items = [
    { badge: "CHAS", sub: "Accredited Contractor" },
    { badge: "Constructionline", sub: "Gold Member" },
    { badge: "ISO 9001", sub: "Quality Management" },
    { badge: "NHBC", sub: "Registered Builder" },
    { badge: "FMB", sub: "Federation of Master Builders" },
    { badge: "TrustMark", sub: "Government Endorsed" },
  ];
  return (
    <section className="section accreds-bg" id="accreditations">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Credentials</div>
            <h2 className="reveal d1">Built on trust,<br />backed by proof.</h2>
          </div>
          <p className="lead reveal d2">
            Every accreditation we hold is a promise to you — independently verified standards
            across safety, quality and professionalism, on every project we undertake.
          </p>
        </div>
        <div className="accreds-grid">
          {items.map((a, i) => (
            <div className={`accred-card reveal ${i ? "d"+(i%3) : ""}`} key={a.badge}>
              <span className="accred-badge">{a.badge}</span>
              <span className="accred-sub">{a.sub}</span>
            </div>
          ))}
        </div>
        <p className="accreds-note reveal d2">
          We carry £5m public liability insurance, £2m employer's liability and full professional
          indemnity cover — giving you complete peace of mind from groundwork to handover.
        </p>
      </div>
    </section>
  );
}

const MAP_PINS = [
  { area: "Hampstead",    note: "NW3",           lat: 51.5560, lng: -0.1782 },
  { area: "Islington",   note: "N1",            lat: 51.5362, lng: -0.1033 },
  { area: "Kensington",  note: "W8",            lat: 51.5000, lng: -0.1919 },
  { area: "Chelsea",     note: "SW3",           lat: 51.4875, lng: -0.1687 },
  { area: "Richmond",    note: "TW9",           lat: 51.4613, lng: -0.3037 },
  { area: "Notting Hill",note: "W11",           lat: 51.5138, lng: -0.2044 },
  { area: "Mayfair",     note: "W1K",           lat: 51.5117, lng: -0.1489 },
  { area: "Marylebone",  note: "W1U",           lat: 51.5194, lng: -0.1548 },
  { area: "Fulham",      note: "SW6",           lat: 51.4751, lng: -0.1993 },
  { area: "Greenwich",   note: "SE10",          lat: 51.4828, lng: -0.0098 },
  { area: "Canary Wharf",note: "E14",           lat: 51.5054, lng: -0.0235 },
];

function WhereWeBuild() {
  const mapRef = uR2(null);
  const instanceRef = uR2(null);
  const [active, setActive] = uS2(false);

  uE2(() => {
    if (!window.L || instanceRef.current) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#b05b36";

    const map = window.L.map(mapRef.current, {
      center: [51.505, -0.13],
      zoom: 11,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    });
    instanceRef.current = map;

    // Dark minimal tile layer
    window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Custom terracotta SVG marker
    const svgIcon = (label) => window.L.divIcon({
      className: "",
      html: `<div class="map-pin"><span class="map-pin-dot"></span><span class="map-pin-label">${label}</span></div>`,
      iconAnchor: [6, 6],
    });

    MAP_PINS.forEach(p => {
      window.L.marker([p.lat, p.lng], { icon: svgIcon(p.area) })
        .addTo(map)
        .bindPopup(`<b>${p.area}</b><br><span style="font-family:monospace;font-size:11px;opacity:0.7">${p.note}</span>`, {
          className: "map-popup",
          closeButton: false,
        });
    });

    window.L.control.zoom({ position: "bottomright" }).addTo(map);

    return () => { map.remove(); instanceRef.current = null; };
  }, []);

  return (
    <section className="section where-bg" id="where-we-build">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Where we build</div>
            <h2 className="reveal d1">Across<br />London.</h2>
          </div>
          <p className="lead reveal d2">
            We work across London, from period townhouses in conservation areas
            to new-build developments and multi-unit schemes. If you're unsure
            whether we cover your area, just ask.
          </p>
        </div>
      </div>
      <div className="where-map-wrap reveal d1" style={{position:"relative"}}>
        <div ref={mapRef} style={{width:"100%",height:"100%"}} />
        {!active && (
          <div className="map-overlay" onClick={() => setActive(true)}>
            <span className="map-overlay-hint">Click to interact</span>
          </div>
        )}
      </div>
      <div className="wrap">
        <p className="where-foot reveal d2">
          Not on the list? We consider projects outside these areas on a case-by-case basis.{" "}
          <a data-pagelink href="Contact.html" style={{color:"var(--accent)"}}>Get in touch.</a>
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { About, Services, ServiceCards, Stats, FounderStory, Values, TradesList, WhyChana, AccredsBand, WhereWeBuild });

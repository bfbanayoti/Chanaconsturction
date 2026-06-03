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
  // Animated topographic map — scan line sweeps over contours
  const cx = W / 2, cy = H / 2;
  const rings = 7;
  for (let i = 0; i < rings; i++) {
    const r = (i + 1) * Math.min(W, H) * 0.072;
    const phase = t * 0.4 - i * 0.25;
    const alpha = 0.12 + 0.1 * Math.sin(phase);
    ctx.beginPath();
    ctx.arc(cx + Math.sin(t * 0.3 + i) * 8, cy + Math.cos(t * 0.25 + i * 0.7) * 5, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(176,91,54,${alpha})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  // scan line
  const scanY = ((t * 0.5 % 1) * H);
  const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
  grad.addColorStop(0, "rgba(176,91,54,0)");
  grad.addColorStop(0.5, "rgba(176,91,54,0.22)");
  grad.addColorStop(1, "rgba(176,91,54,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, scanY - 30, W, 60);
  // pin
  const pinX = cx + Math.sin(t * 0.2) * 18, pinY = cy + Math.cos(t * 0.15) * 12;
  ctx.beginPath();
  ctx.arc(pinX, pinY, 5, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(pinX, pinY, 5 + 4 * (Math.sin(t * 2) * 0.5 + 0.5), 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(176,91,54,0.35)`;
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

function Stats() {
  return (
    <section className="section wrap" id="stats">
      <div className="sec-head">
        <div>
          <div className="eyebrow reveal">Our track record</div>
          <h2 className="reveal d1">Measured by trust.</h2>
        </div>
        <p className="lead reveal d2">
          Our success is measured not only by the quality of the homes we create, but by the confidence
          of the clients we serve.
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
      </div>
    </section>
  );
}

Object.assign(window, { About, Services, Stats });

/* ============================================================
   Nav · Hero · Accreditation marquee
   ============================================================ */
const { useState: uS1, useRef: uR1, useEffect: uE1 } = React;

const CURRENT = (typeof window !== "undefined" && window.PAGE) || "home";

function Brand() {
  return (
    <a className="brand" data-pagelink href={HOME} aria-label="Chana Design home">
      <span className="brand-mark" />
      <span className="brand-name"><b>Chana</b> <span>Design</span></span>
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

function HeroAnimation() {
  const canvasRef = uR1(null);
  uE1(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, raf, t = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const lerpMouse = { x: 0.5, y: 0.5 };
    const pend = { angle: 0, vel: 0, prevTX: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const loop = () => {
      raf = requestAnimationFrame(loop); t++;
      lerpMouse.x = lerp(lerpMouse.x, mouse.x, 0.04);
      lerpMouse.y = lerp(lerpMouse.y, mouse.y, 0.04);
      ctx.clearRect(0, 0, W, H);
      draw();
    };

    const draw = () => {
      const pad = W * 0.08;
      const bx = pad, bw = W - pad * 2;
      const by = H * 0.3, bh = H * 0.6;
      const cols = 3, rows = 5;
      const colW = bw / cols, rowH = bh / rows;
      const ww = colW * 0.44, wh = rowH * 0.48;

      // Parallax offset from mouse
      const px = (lerpMouse.x - 0.5) * 8;
      const py = (lerpMouse.y - 0.5) * 5;

      // Subtle dot grid
      const gs = 20;
      for (let gx = 0; gx < W; gx += gs) {
        for (let gy = 0; gy < H; gy += gs) {
          ctx.beginPath();
          ctx.arc(gx + px * 0.1, gy + py * 0.1, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(44,44,41,0.06)'; ctx.fill();
        }
      }

      // === 3D CRANE with pendulum swing ===
      const craneX = bx + bw * 0.45 + px * 0.3;
      const craneBaseY = by + py * 0.4;
      const craneTop = H * 0.03;
      const armRight = W - pad * 0.5;
      const armLeft  = craneX - bw * 0.2;
      const cableLen = H * 0.06;
      const depth = 7; // 3D depth offset

      // Auto-swinging trolley — very slow, elegant
      const armLen = armRight - craneX;
      const trolleyT = Math.sin(t * 0.003) * 0.5 + 0.5;
      const trolleyMin = craneX + 20; // never overlap the mast
      const trolleyMax = armRight - 14;
      const trolleyX = Math.max(trolleyMin, Math.min(trolleyMax, craneX + armLen * trolleyT));

      // Pendulum — very gentle, heavily damped
      const trolleyVel = trolleyX - pend.prevTX;
      pend.prevTX = trolleyX;
      pend.vel += -0.002 * Math.sin(pend.angle) - trolleyVel * 0.004;
      pend.vel *= 0.985; // strong damping = silky smooth
      pend.angle += pend.vel;
      pend.angle = Math.max(-0.18, Math.min(0.18, pend.angle)); // clamp to subtle range
      const _jibY = craneTop + H * 0.14; // same as jibY below, computed early for hook
      const hookX = trolleyX + Math.sin(pend.angle) * cableLen;
      const hookY = _jibY + 8 + Math.cos(pend.angle) * cableLen;

      // 3D box beam: draws front + top + right-side faces with lighting
      const box3d = (x, y, w, h, d, alpha) => {
        // d = depth (isometric offset: goes up-right)
        const dx = d * 0.7, dy = d * 0.4;
        // Front face (base tone)
        ctx.beginPath();
        ctx.moveTo(x, y); ctx.lineTo(x+w, y); ctx.lineTo(x+w, y+h); ctx.lineTo(x, y+h);
        ctx.closePath();
        ctx.fillStyle = `rgba(176,91,54,${alpha})`; ctx.fill();
        ctx.strokeStyle = `rgba(140,65,35,${alpha * 0.5})`; ctx.lineWidth = 0.5; ctx.stroke();
        // Top face (lighter — lit)
        ctx.beginPath();
        ctx.moveTo(x, y); ctx.lineTo(x+w, y);
        ctx.lineTo(x+w+dx, y-dy); ctx.lineTo(x+dx, y-dy);
        ctx.closePath();
        ctx.fillStyle = `rgba(220,140,90,${alpha * 0.85})`; ctx.fill();
        ctx.strokeStyle = `rgba(140,65,35,${alpha * 0.3})`; ctx.lineWidth = 0.4; ctx.stroke();
        // Right side face (darker — shadow)
        ctx.beginPath();
        ctx.moveTo(x+w, y); ctx.lineTo(x+w+dx, y-dy);
        ctx.lineTo(x+w+dx, y+h-dy); ctx.lineTo(x+w, y+h);
        ctx.closePath();
        ctx.fillStyle = `rgba(120,50,25,${alpha * 0.65})`; ctx.fill();
        ctx.strokeStyle = `rgba(140,65,35,${alpha * 0.3})`; ctx.lineWidth = 0.4; ctx.stroke();
      };

      // Horizontal beam (lying on its side)
      const hbeam3d = (x, y, len, h, d, alpha) => box3d(x, y - h/2, len, h, d, alpha);
      // Vertical beam
      const vbeam3d = (x, y, w, h, d, alpha) => box3d(x - w/2, y, w, h, d, alpha);

      const accent = a => `rgba(176,91,54,${a})`;

      const D = 7; // isometric depth offset

      // === MAST with X-bracing lattice ===
      const mW = 14; // mast width
      const mx1 = craneX - mW/2, mx2 = craneX + mW/2;
      const jibY = craneTop + H * 0.14; // jib height
      const peakY = craneTop + H * 0.01; // A-frame peak

      // Mast front face
      ctx.fillStyle = 'rgba(176,91,54,0.7)';
      ctx.fillRect(mx1, jibY, mW, craneBaseY - jibY);
      // Mast top face (isometric)
      ctx.beginPath();
      ctx.moveTo(mx1, jibY); ctx.lineTo(mx2, jibY);
      ctx.lineTo(mx2+D, jibY-D*0.5); ctx.lineTo(mx1+D, jibY-D*0.5);
      ctx.closePath(); ctx.fillStyle = 'rgba(220,140,90,0.65)'; ctx.fill();
      // Mast right side face
      ctx.beginPath();
      ctx.moveTo(mx2, jibY); ctx.lineTo(mx2+D, jibY-D*0.5);
      ctx.lineTo(mx2+D, craneBaseY-D*0.5); ctx.lineTo(mx2, craneBaseY);
      ctx.closePath(); ctx.fillStyle = 'rgba(110,45,20,0.5)'; ctx.fill();
      // Mast outline
      ctx.strokeStyle = 'rgba(140,60,30,0.5)'; ctx.lineWidth = 0.6;
      ctx.strokeRect(mx1, jibY, mW, craneBaseY - jibY);

      // X-bracing on mast
      const segH = 16;
      for (let my = jibY + 4; my < craneBaseY - segH; my += segH) {
        ctx.beginPath(); ctx.moveTo(mx1+1, my); ctx.lineTo(mx2-1, my+segH);
        ctx.strokeStyle = 'rgba(140,60,30,0.5)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx2-1, my); ctx.lineTo(mx1+1, my+segH); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(mx1, my+segH); ctx.lineTo(mx2, my+segH);
        ctx.strokeStyle = 'rgba(140,60,30,0.3)'; ctx.lineWidth = 0.5; ctx.stroke();
      }

      // === A-FRAME peak structure above jib ===
      // Peak sits above the jib junction
      const peakX = craneX;
      const jibRight = armRight;
      const jibLeft  = armLeft;

      // Peak vertical (mast continues above jib)
      vbeam3d(craneX, peakY, 10, jibY - peakY, D, 0.7);
      // X-bracing on upper mast
      for (let my = peakY + 4; my < jibY - 10; my += 14) {
        ctx.beginPath(); ctx.moveTo(craneX-5, my); ctx.lineTo(craneX+5, my+10);
        ctx.strokeStyle = 'rgba(140,60,30,0.45)'; ctx.lineWidth = 0.9; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(craneX+5, my); ctx.lineTo(craneX-5, my+10); ctx.stroke();
      }

      // A-frame cables: peak → jib right tip + peak → jib left tip
      ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(jibRight, jibY);
      ctx.strokeStyle = 'rgba(140,60,30,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(jibLeft, jibY);
      ctx.stroke();
      // Second A-frame cables slightly offset for 3D
      ctx.beginPath(); ctx.moveTo(peakX+D, peakY-D*0.5); ctx.lineTo(jibRight+D, jibY-D*0.5);
      ctx.strokeStyle = 'rgba(220,140,90,0.25)'; ctx.lineWidth = 0.8; ctx.stroke();

      // === MAIN JIB (right arm) — 3D beam ===
      hbeam3d(craneX, jibY, jibRight - craneX, 8, D, 0.7);

      // Jib lattice under-beam
      for (let jx = craneX + 14; jx < jibRight - 10; jx += 18) {
        ctx.beginPath(); ctx.moveTo(jx, jibY-3); ctx.lineTo(jx+10, jibY+5);
        ctx.strokeStyle = 'rgba(140,60,30,0.25)'; ctx.lineWidth = 0.6; ctx.stroke();
      }

      // === COUNTER JIB (left arm) — shorter ===
      hbeam3d(jibLeft, jibY, craneX - jibLeft, 6, D, 0.55);

      // === COUNTERWEIGHTS — stacked 3D blocks ===
      const cwX = jibLeft - 22, cwY = jibY - 3;
      [0, 5, 10].forEach(offset => {
        box3d(cwX, cwY - offset, 22, 7, D * 0.8, 0.35);
      });

      // === TROLLEY — 3D box on jib ===
      box3d(trolleyX - 7, jibY - 7, 14, 9, D * 0.7, 0.9);
      // Pulley wheel on trolley
      ctx.beginPath(); ctx.arc(trolleyX, jibY + 4, 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(140,60,30,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.beginPath(); ctx.arc(trolleyX, jibY + 4, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(140,60,30,0.6)'; ctx.fill();

      // Hoist cable — starts from pulley centre, hangs to hook
      const pulleyY = jibY + 4;
      ctx.beginPath();
      ctx.moveTo(trolleyX, pulleyY);
      ctx.lineTo(hookX, hookY);
      ctx.strokeStyle = 'rgba(140,60,30,0.55)'; ctx.lineWidth = 1; ctx.stroke();

      // Hook block (small 3D box above hook)
      box3d(hookX - 4, hookY, 8, 6, D * 0.5, 0.7);

      // Hook J-curve
      ctx.beginPath();
      ctx.moveTo(hookX, hookY + 6);
      ctx.lineTo(hookX, hookY + 14);
      ctx.arc(hookX - 4, hookY + 14, 4, 0, Math.PI * 0.85, false);
      ctx.strokeStyle = 'rgba(140,60,30,0.75)'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
      ctx.lineCap = 'butt';

      // Building body (main parallax layer)
      const bxP = bx + px * 0.6, byP = by + py * 0.5;

      // Subtle facade gradient
      const fGrad = ctx.createLinearGradient(bxP, byP, bxP + bw, byP + bh);
      fGrad.addColorStop(0, 'rgba(240,235,228,0.4)');
      fGrad.addColorStop(1, 'rgba(220,215,208,0.15)');
      ctx.fillStyle = fGrad; ctx.fillRect(bxP, byP, bw, bh);

      // Building outline
      ctx.strokeStyle = 'rgba(44,44,41,0.2)'; ctx.lineWidth = 1;
      ctx.strokeRect(bxP, byP, bw, bh);

      // Cornice line (top architectural detail)
      ctx.beginPath(); ctx.moveTo(bxP - 3, byP); ctx.lineTo(bxP + bw + 3, byP);
      ctx.strokeStyle = 'rgba(44,44,41,0.3)'; ctx.lineWidth = 2; ctx.stroke();

      // Vertical column lines
      for (let c = 1; c < cols; c++) {
        ctx.beginPath(); ctx.moveTo(bxP + colW * c, byP); ctx.lineTo(bxP + colW * c, byP + bh);
        ctx.strokeStyle = 'rgba(44,44,41,0.06)'; ctx.lineWidth = 0.5; ctx.stroke();
      }

      // Floor lines
      for (let r = 1; r < rows; r++) {
        ctx.beginPath(); ctx.moveTo(bxP, byP + rowH * r); ctx.lineTo(bxP + bw, byP + rowH * r);
        ctx.strokeStyle = 'rgba(44,44,41,0.07)'; ctx.lineWidth = 0.4; ctx.stroke();
      }

      // Windows — luxury arched style + interactive glow
      const mx = lerpMouse.x * W, my = lerpMouse.y * H;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = bxP + colW * c + (colW - ww) / 2;
          const wy = byP + rowH * r + (rowH - wh) / 2;
          const wcx = wx + ww / 2, wcy = wy + wh / 2;

          const dist = Math.sqrt((wcx - mx) ** 2 + (wcy - my) ** 2);
          const proximity = Math.max(0, 1 - dist / 110);
          const ambient = (Math.sin(t * 0.009 + r * 1.4 + c * 2.1) + 1) / 2;
          const lit = Math.max(proximity, ambient * 0.18 + 0.04);

          // Window glow halo
          if (proximity > 0.05) {
            const grd = ctx.createRadialGradient(wcx, wcy, 0, wcx, wcy, ww * 1.2);
            grd.addColorStop(0, `rgba(176,91,54,${proximity * 0.18})`);
            grd.addColorStop(1, 'rgba(176,91,54,0)');
            ctx.fillStyle = grd; ctx.fillRect(wx - ww * 0.5, wy - wh * 0.3, ww * 2, wh * 1.6);
          }

          // Window fill
          ctx.fillStyle = `rgba(176,91,54,${lit * 0.45})`;
          // Arched top window
          ctx.beginPath();
          ctx.moveTo(wx, wcy);
          ctx.lineTo(wx, wy + wh * 0.4);
          ctx.arc(wcx, wy + wh * 0.4, ww / 2, Math.PI, 0, false);
          ctx.lineTo(wx + ww, wcy);
          ctx.lineTo(wx + ww, wy + wh);
          ctx.lineTo(wx, wy + wh);
          ctx.closePath();
          ctx.fill();

          // Window border
          ctx.strokeStyle = `rgba(44,44,41,${0.12 + proximity * 0.2})`;
          ctx.lineWidth = 0.6; ctx.stroke();

          // Sill line
          ctx.beginPath(); ctx.moveTo(wx - 2, wy + wh); ctx.lineTo(wx + ww + 2, wy + wh);
          ctx.strokeStyle = 'rgba(44,44,41,0.1)'; ctx.lineWidth = 1; ctx.stroke();
        }
      }

      // Ground line
      const gy = byP + bh;
      ctx.beginPath(); ctx.moveTo(bxP - 16, gy); ctx.lineTo(bxP + bw + 16, gy);
      ctx.strokeStyle = 'rgba(44,44,41,0.25)'; ctx.lineWidth = 1.2; ctx.stroke();

      // Shadow
      const shGrd = ctx.createLinearGradient(0, gy, 0, gy + 22);
      shGrd.addColorStop(0, 'rgba(44,44,41,0.08)'); shGrd.addColorStop(1, 'rgba(44,44,41,0)');
      ctx.fillStyle = shGrd; ctx.fillRect(bxP - 16, gy, bw + 32, 22);

      // Dimension line
      const dl = gy + 12;
      ctx.beginPath(); ctx.moveTo(bxP, dl); ctx.lineTo(bxP + bw, dl);
      ctx.strokeStyle = 'rgba(176,91,54,0.25)'; ctx.lineWidth = 0.5; ctx.stroke();
      [bxP, bxP + bw].forEach(ex => {
        ctx.beginPath(); ctx.moveTo(ex, dl - 4); ctx.lineTo(ex, dl + 4);
        ctx.strokeStyle = 'rgba(176,91,54,0.3)'; ctx.stroke();
      });
      ctx.fillStyle = 'rgba(176,91,54,0.4)';
      ctx.font = `${Math.max(9, W * 0.028)}px "Spline Sans Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('ELEVATION · FRONT', W / 2, dl + Math.max(12, W * 0.042));
    };

    const onMove = e => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    };
    const onLeave = () => { mouse.x = 0.5; mouse.y = 0.5; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize(); loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="hero-anim" />;
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
      <HeroAnimation />

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

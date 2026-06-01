/* ============================================================
   About statement · Services · Stats
   ============================================================ */
const { useState: uS2 } = React;

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
                <Ph label={s.cap} />
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
    <section className="section wrap">
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

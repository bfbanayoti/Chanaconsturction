/* ============================================================
   Projects · Process · Testimonials · Contact · Footer
   ============================================================ */
const { useState: uS3 } = React;

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap"><div className="sec-head">
        <div>
          <div className="eyebrow reveal">Portfolio</div>
          <h2 className="reveal d1">A closer look.</h2>
        </div>
        <p className="lead reveal d2">
          New builds, careful refurbishments and multi-unit developments across the South East —
          each treated as if it were our own.
        </p>
      </div>
      <div className="proj-grid">
        {PROJECTS.map((p, i) => (
          <article className={`proj ${p.cls} reveal ${i ? "d" + i : ""}`} key={p.t}>
            <span className="tag">{p.tag}</span>
            <div className="proj-img">
              {p.img
                ? <img src={p.img} alt={p.label} loading="lazy" />
                : <Ph label={p.label} />}
            </div>
            {p.budget && (
              <div className="proj-specs">
                <span>{p.budget}</span>
                <span className="sep">·</span>
                <span>{p.duration}</span>
                <span className="sep">·</span>
                <span>{p.year}</span>
              </div>
            )}
            <a className="meta" data-pagelink href={p.slug ? p.slug + ".html" : "#"}>
              <div>
                <div className="t">{p.t}</div>
                <div className="s">{p.s}</div>
              </div>
              <ArrowUR s={22} />
            </a>
          </article>
        ))}
      </div></div>
    </section>
  );
}

function Process() {
  return (
    <section className="process-bg" id="process">
      <div className="section wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">How we work</div>
            <h2 className="reveal d1">Five stages,<br />zero surprises.</h2>
          </div>
          <p className="lead reveal d2">
            From the initial consultation through to completion and beyond, we provide clear
            communication, expert guidance and transparency at every step.
          </p>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step reveal" key={s.n}>
              <span className="n">{s.n}</span>
              <span className="h">{s.h}</span>
              <span className="p">{s.p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="wrap"><div className="sec-head">
        <div>
          <div className="eyebrow reveal">Client care</div>
          <h2 className="reveal d1">Relationships<br />that last.</h2>
        </div>
        <p className="lead reveal d2">
          We build lasting relationships founded on trust, integrity and a shared commitment to excellence.
        </p>
      </div>
      <div className="testi-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className={`testi reveal ${i ? "d" + i : ""}`} key={t.nm}>
            <div className="stars">{"\u2605".repeat(t.stars)}</div>
            <p className="q">&ldquo;{t.q}&rdquo;</p>
            <div className="who">
              <span className="av"><Ph label="" /></span>
              <span>
                <span className="nm" style={{ display: "block" }}>{t.nm}</span>
                <span className="rl">{t.rl}</span>
              </span>
            </div>
          </div>
        ))}
      </div></div>
    </section>
  );
}

const PROJECT_TYPES = ["New build", "Extension", "Refurbishment", "Development", "Not sure yet"];

function Contact() {
  const [form, setForm] = uS3({ name: "", email: "", postcode: "", type: "New build", message: "" });
  const [touched, setTouched] = uS3({});
  const [sent, setSent] = uS3(false);

  const errs = {
    name: !form.name.trim(),
    email: !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email),
    message: form.message.trim().length < 8,
  };
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!errs.name && !errs.email && !errs.message) setSent(true);
  };

  return (
    <section className="section wrap" id="contact">
      <div className="contact-grid">
        <div className="contact-left">
          <div className="eyebrow reveal">Start your project</div>
          <h2 className="reveal d1" style={{ marginTop: "22px" }}>Let's build<br />something lasting.</h2>
          <p className="lead reveal d2">
            Tell us a little about your plans. We'll come back within one working day to arrange a
            relaxed, no-obligation consultation.
          </p>
          <div className="contact-details reveal d2">
            <div className="cdetail"><span className="k">Call</span><span className="v">020 8000 0000</span></div>
            <div className="cdetail"><span className="k">Email</span><span className="v">hello@chanadesign.co.uk</span></div>
          </div>
        </div>

        <div className="reveal d1">
          {sent ? (
            <div className="form-success">
              <div className="ico"><Check /></div>
              <h3>Thank you, {form.name.split(" ")[0] || "there"}.</h3>
              <p>Your enquiry is with the Chana family. We'll be in touch within one working day.</p>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className={`field ${touched.name && errs.name ? "invalid" : ""}`}>
                <label>Your name</label>
                <input value={form.name} onChange={set("name")} onBlur={() => setTouched(t => ({ ...t, name: true }))} placeholder="Jane Smith" />
                <span className="err">Please tell us your name.</span>
              </div>
              <div className={`field ${touched.email && errs.email ? "invalid" : ""}`}>
                <label>Email</label>
                <input value={form.email} onChange={set("email")} onBlur={() => setTouched(t => ({ ...t, email: true }))} placeholder="jane@email.com" />
                <span className="err">Please enter a valid email.</span>
              </div>
              <div className="field">
                <label>Project postcode <span style={{ textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <input value={form.postcode} onChange={set("postcode")} placeholder="e.g. TN1 1AA" />
              </div>
              <div className="field">
                <label>Project type</label>
                <div className="chiprow">
                  {PROJECT_TYPES.map(t => (
                    <button type="button" key={t} className={`chip ${form.type === t ? "on" : ""}`}
                      onClick={() => setForm(f => ({ ...f, type: t }))}>{t}</button>
                  ))}
                </div>
              </div>
              <div className={`field ${touched.message && errs.message ? "invalid" : ""}`}>
                <label>Tell us about it</label>
                <textarea value={form.message} onChange={set("message")} onBlur={() => setTouched(t => ({ ...t, message: true }))} placeholder="A few words about your site, your plans and your timeline…" />
                <span className="err">A sentence or two helps us prepare.</span>
              </div>
              <button className="btn" type="submit">Send enquiry <Arrow /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="fbrand">
            <Brand />
            <p>A family-run construction company built on trust, quality and genuine client care &mdash; a new firm serving London and the surrounding areas.</p>
          </div>
          <div className="fcol">
            <h4>Explore</h4>
            {NAV_LINKS.map(l => <a key={l.label} data-pagelink href={l.href}>{l.label}</a>)}
          </div>
          <div className="fcol">
            <h4>Services</h4>
            <a data-pagelink href="Services.html">New builds</a>
            <a data-pagelink href="Services.html">Extensions</a>
            <a data-pagelink href="Services.html">Refurbishments</a>
            <a data-pagelink href="Services.html">Developments</a>
          </div>
          <div className="fcol">
            <h4>Get in touch</h4>
            <a data-pagelink href="Contact.html">020 8000 0000</a>
            <a data-pagelink href="Contact.html">hello@chanadesign.co.uk</a>
            <a data-pagelink href="Contact.html">Request a quote</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Chana Design and Build Ltd. All rights reserved.</span>
          <span>Registered in England &amp; Wales · CHAS · Constructionline Gold</span>
        </div>
      </div>
    </footer>
  );
}

function ProjectBreakdown() {
  const [active, setActive] = uS3(0);
  const p = PROJECTS[active];
  return (
    <section className="section proj-breakdown-bg" id="proj-breakdown">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">Project detail</div>
            <h2 className="reveal d1">Behind every build.</h2>
          </div>
          <p className="lead reveal d2">Select a project to see the brief, scope and outcome.</p>
        </div>
        <div className="pb-layout reveal d1">
          <div className="pb-tabs">
            {PROJECTS.map((proj, i) => (
              <button key={proj.t} className={`pb-tab ${active === i ? "active" : ""}`} onClick={() => setActive(i)}>
                <span className="pb-tag">{proj.tag}</span>
                <span className="pb-name">{proj.t}</span>
              </button>
            ))}
          </div>
          <div className="pb-detail">
            <div className="pb-img">
              <img src={p.img} alt={p.t} loading="lazy" />
            </div>
            <div className="pb-info">
              <div className="pb-stats">
                <div className="pb-stat"><span className="k">Budget</span><span className="v">{p.budget}</span></div>
                <div className="pb-stat"><span className="k">Duration</span><span className="v">{p.duration}</span></div>
                <div className="pb-stat"><span className="k">Completed</span><span className="v">{p.year}</span></div>
                <div className="pb-stat"><span className="k">Type</span><span className="v">{p.tag}</span></div>
              </div>
              <p className="pb-brief">{p.brief}</p>
              <div className="pb-scope">
                <span className="pb-scope-label">Scope of works</span>
                <ul>
                  {p.scope.map(s => <li key={s}><span className="trade-dot" />{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDetail() {
  const slug = (typeof window !== "undefined" && window.PROJECT_SLUG) || "";
  const p = PROJECTS.find(x => x.slug === slug) || PROJECTS[0];
  const gallery = p.gallery || [p.img];
  const [light, setLight] = uS3(null);

  return (
    <React.Fragment>
      {/* ── Hero ── */}
      <section className="proj-detail-hero">
        <img src={p.img} alt={p.t} style={p.imgPos ? {objectPosition: p.imgPos} : {}} />
        <div className="proj-detail-hero-overlay">
          <div className="wrap">
            <a className="back-link" data-pagelink href="Projects.html"><span>←</span> All projects</a>
            <span className="tag" style={{marginLeft:"auto"}}>{p.tag}</span>
          </div>
        </div>
      </section>

      {/* ── Title + specs ── */}
      <section className="section" id="proj-detail-intro">
        <div className="wrap proj-detail-grid">
          <div>
            <div className="eyebrow reveal" style={{marginBottom:"22px"}}>{p.s}</div>
            <h1 className="reveal d1" style={{fontFamily:"var(--serif)", fontSize:"clamp(36px,5vw,72px)", lineHeight:0.96, letterSpacing:"-0.02em"}}>{p.t}</h1>
            <p className="reveal d2" style={{marginTop:"28px", fontSize:"17px", lineHeight:1.7, color:"var(--ink-soft)", maxWidth:"52ch"}}>{p.brief}</p>
            <a className="btn reveal d3" style={{display:"inline-flex", marginTop:"36px"}} data-pagelink href="Contact.html">Start a similar project <Arrow /></a>
          </div>
          <div className="proj-detail-stats reveal d1">
            {[{k:"Budget",v:p.budget},{k:"Duration",v:p.duration},{k:"Completed",v:p.year},{k:"Type",v:p.tag}].map(st => (
              <div className="pb-stat" key={st.k}>
                <span className="k">{st.k}</span>
                <span className="v">{st.v}</span>
              </div>
            ))}
            <div className="proj-detail-scope">
              <span className="pb-scope-label">Scope of works</span>
              <ul>
                {p.scope.map(s => <li key={s}><span className="trade-dot" />{s}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Challenge / Approach / Outcome ── */}
      {(p.challenge || p.approach || p.outcome) && (
        <section className="section proj-story-bg" id="proj-story">
          <div className="wrap">
            <div className="eyebrow reveal" style={{marginBottom:"clamp(32px,4vw,56px)"}}>The story</div>
            <div className="proj-story-grid">
              {p.challenge && (
                <div className="proj-story-block reveal">
                  <span className="proj-story-num">01</span>
                  <h3 className="proj-story-h">The challenge</h3>
                  <p className="proj-story-p">{p.challenge}</p>
                </div>
              )}
              {p.approach && (
                <div className="proj-story-block reveal d1">
                  <span className="proj-story-num">02</span>
                  <h3 className="proj-story-h">Our approach</h3>
                  <p className="proj-story-p">{p.approach}</p>
                </div>
              )}
              {p.outcome && (
                <div className="proj-story-block reveal d2">
                  <span className="proj-story-num">03</span>
                  <h3 className="proj-story-h">The outcome</h3>
                  <p className="proj-story-p">{p.outcome}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── After gallery ── */}
      {gallery.length > 1 && (
        <section className="section" id="proj-gallery">
          <div className="wrap">
            <div className="eyebrow reveal" style={{marginBottom:"8px"}}>After</div>
            <h3 className="reveal d1" style={{fontFamily:"var(--serif)",fontSize:"clamp(24px,3vw,40px)",lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:"clamp(28px,4vw,48px)"}}>The finished home.</h3>
            <div className="proj-gallery-grid">
              {gallery.map((src, i) => (
                <button key={src+i} className={`proj-gallery-item reveal ${i ? "d"+(i%3) : ""} ${i===0?"span2":""}`}
                  onClick={() => setLight(src)} style={{background:"none",border:"none",padding:0,cursor:"zoom-in"}}>
                  <img src={src} alt={p.t + " — after " + (i+1)} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Before gallery ── */}
      {p.before && p.before.length > 0 && (
        <section className="section proj-story-bg" id="proj-before">
          <div className="wrap">
            <div className="eyebrow reveal" style={{marginBottom:"8px"}}>Before</div>
            <h3 className="reveal d1" style={{fontFamily:"var(--serif)",fontSize:"clamp(24px,3vw,40px)",lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:"clamp(28px,4vw,48px)"}}>Where we started.</h3>
            <div className="proj-gallery-grid">
              {p.before.map((src, i) => (
                <button key={src+i} className={`proj-gallery-item reveal ${i ? "d"+(i%3) : ""} ${i===0?"span2":""}`}
                  onClick={() => setLight(src)} style={{background:"none",border:"none",padding:0,cursor:"zoom-in"}}>
                  <img src={src} alt={p.t + " — before " + (i+1)} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {light && (
        <div className="proj-lightbox" onClick={() => setLight(null)}>
          <button className="proj-lightbox-close" onClick={() => setLight(null)}>✕</button>
          <img src={light} alt="Enlarged view" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* ── More projects ── */}
      <section className="section proj-others-bg">
        <div className="wrap">
          <div className="eyebrow reveal" style={{marginBottom:"32px"}}>More projects</div>
          <div className="proj-others-grid">
            {PROJECTS.filter(x => x.slug !== slug).map((op, i) => (
              <a key={op.t} className={`proj-other reveal ${i ? "d"+i : ""}`} data-pagelink href={op.slug + ".html"}>
                <div className="proj-img"><img src={op.img} alt={op.t} loading="lazy" /></div>
                <div className="meta">
                  <div><div className="t">{op.t}</div><div className="s">{op.s}</div></div>
                  <ArrowUR s={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { Projects, Process, Testimonials, Contact, Footer, ProjectBreakdown, ProjectDetail });

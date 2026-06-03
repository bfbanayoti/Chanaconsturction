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
            <div className="meta">
              <div>
                <div className="t">{p.t}</div>
                <div className="s">{p.s}</div>
              </div>
              <ArrowUR s={22} />
            </div>
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
            <div className="cdetail"><span className="k">Email</span><span className="v">hello@chanaconstruction.co.uk</span></div>
            <div className="cdetail"><span className="k">Studio</span><span className="v">London</span></div>
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
            <a data-pagelink href="Contact.html">hello@chanaconstruction.co.uk</a>
            <a data-pagelink href="Contact.html">Request a quote</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Chana Construction Ltd. All rights reserved.</span>
          <span>Registered in England &amp; Wales · CHAS · Constructionline Gold</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Projects, Process, Testimonials, Contact, Footer });

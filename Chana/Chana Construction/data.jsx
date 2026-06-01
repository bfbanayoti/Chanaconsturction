/* ============================================================
   Content data for Chana Construction
   ============================================================ */
const HOME = "Chana Construction.html";
const NAV_LINKS = [
  { label: "Home", href: HOME, page: "home" },
  { label: "About", href: "About.html", page: "about" },
  { label: "Services", href: "Services.html", page: "services" },
  { label: "Projects", href: "Projects.html", page: "projects" },
];

const ACCREDS = [
  "CHAS Accredited", "Constructionline Gold", "ISO 9001", "NHBC Registered",
  "Federation of Master Builders", "TrustMark Approved", "10-Year Structural Warranty", "Considerate Constructors",
];

const SERVICES = [
  {
    name: "Land & Property Acquisition",
    cap: "Site sourcing",
    desc: "We help clients identify and secure suitable land for new-build developments, as well as properties for refurbishment, extension, or redevelopment — with the right due diligence from day one.",
  },
  {
    name: "Planning & Development Consultancy",
    cap: "Planning",
    desc: "Comprehensive support throughout the planning process — managing applications, approvals, and all associated documentation to bring your vision through committee and into reality.",
  },
  {
    name: "Architectural & Technical Services",
    cap: "Design & engineering",
    desc: "We work alongside our network of architects, structural engineers, and party-wall surveyors so every project is expertly planned and detailed from the outset.",
  },
  {
    name: "Interior Design & Visualisation",
    cap: "3D & interiors",
    desc: "Bespoke interior design including space planning, material selection, 3D visualisations, and immersive walkthroughs — so you experience your home before construction begins.",
  },
  {
    name: "Building Regulations & Quality Assurance",
    cap: "Compliance",
    desc: "We collaborate closely with local authorities and private building control to ensure all work complies with current regulations and is delivered to the highest industry standards.",
  },
  {
    name: "New Build Warranties",
    cap: "Peace of mind",
    desc: "Strong relationships with leading warranty providers give our clients confidence and protection throughout the construction process and for years beyond handover.",
  },
  {
    name: "Construction, Turnkey & Aftercare",
    cap: "Build & beyond",
    desc: "From groundwork to final handover we provide a fully managed turnkey service — and our commitment continues with dedicated post-build support long after the keys change hands.",
  },
];

const STATS = [
  { to: 100, suffix: "%", k: "Fixed, transparent pricing — no hidden costs, no surprises" },
  { to: 10, suffix: "yr", k: "Structural warranty on every new-build home we complete" },
  { to: 24, suffix: "h", k: "We respond to every enquiry within one working day" },
  { to: 0, suffix: "", k: "Corners cut — quality and transparency, without exception", display: "Zero" },
];

const PROJECTS = [
  { t: "Hampstead House", s: "New build · 5 bed · NW3", tag: "New Build", cls: "tall", label: "HAMPSTEAD HOUSE" },
  { t: "Islington Townhouse", s: "Refurbishment · Period home · N1", tag: "Refurbishment", cls: "wide", label: "ISLINGTON TOWNHOUSE" },
  { t: "Richmond Mews", s: "Development · 6 units · TW9", tag: "Development", cls: "full", label: "RICHMOND MEWS — STREET VIEW" },
];

const STEPS = [
  { n: "01", h: "Consultation", p: "We listen first. A relaxed conversation about your site, your ambitions, your budget and your timeline — with honest guidance from the very start." },
  { n: "02", h: "Design & Planning", p: "Architects, engineers and our team translate your brief into drawings and a planning strategy, with 3D visualisations so you can see it before we build it." },
  { n: "03", h: "Pre-Construction", p: "Fixed costings, programme, building-control sign-off and warranties locked in — so there are no surprises once the groundwork begins." },
  { n: "04", h: "Build", p: "A single managed team on site, with clear weekly communication and meticulous attention to detail at every stage of the build." },
  { n: "05", h: "Handover & Aftercare", p: "A thorough handover, your warranties in hand, and dedicated post-build support. We treat every project as if it were our own — long after completion." },
];

const TESTIMONIALS = [
  { q: "They treated our home like their own. Communication was constant and the finish is genuinely flawless.", nm: "Sarah & James Whitmore", rl: "New build · Hampstead", stars: 5 },
  { q: "After being let down before, Chana restored our faith. Transparent costs, no surprises, and real aftercare.", nm: "Daniel Osei", rl: "Developer · East London", stars: 5 },
  { q: "From planning headaches to the final handover, they guided us calmly through the whole journey.", nm: "Priya & Arun Mehta", rl: "Refurbishment · Islington", stars: 5 },
];

Object.assign(window, { NAV_LINKS, ACCREDS, SERVICES, STATS, PROJECTS, STEPS, TESTIMONIALS });

/* ============================================================
   Content data for Chana Design and Build
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
  { t: "Chigwell — Chester Road", s: "New build · 5 bed · Essex", tag: "New Build", cls: "tall", label: "CHIGWELL — CHESTER ROAD",
    slug: "Chigwell-House",
    img: "assets/Chigwell - Chester Road - Hero.png",
    imgPos: "center 35%",
    duration: "12 months", year: "2024",
    brief: "A five-bedroom, five-bathroom new-build family home in Chigwell — 300 square metres of living space designed and delivered from groundwork to handover.",
    challenge: "Delivering a 300sqm family home on a tight programme required careful coordination across every trade, from the structural frame through to the bespoke fitted wardrobes and bathroom suites. The client had a clear vision for the interiors and expected every detail to be executed exactly as specified.",
    approach: "We managed the full build in-house — structure, fit-out, plumbing, electrics and interior joinery — with a single point of contact throughout. Bespoke wardrobes were designed for each bedroom, high-specification bathrooms were tiled in large-format stone effect porcelain, and the exterior was finished in traditional red brick with a block-paved driveway.",
    outcome: "A 300sqm home handed over on programme. The clients moved in to a fully finished, furniture-ready house — from the crystal chandeliers in the master suite to the wall-hung sanitaryware in all five bathrooms. The exterior has become a landmark on the street.",
    scope: ["New build construction", "Bespoke fitted joinery", "Bathroom design & fit-out", "Flooring & tiling", "Landscaping & driveway"],
    gallery: [
      "assets/Chigwell - Chester Road - Hero.png",
      "assets/Chigwell - Chester Road - After 1.jpg",
      "assets/Chigwell - Chester Road - After 2.jpg",
      "assets/Chigwell - Chester Road - After 3.jpg",
      "assets/Chigwell - Chester Road - After 4.jpg",
      "assets/Chigwell - Chester Road - After 5.jpg",
      "assets/Chigwell - Chester Road - After 6.jpg",
    ],
    before: [
      "assets/Chigwell - Chester Road - Before 1.jpg",
      "assets/Chigwell - Chester Road - Before 2.jpg",
      "assets/Chigwell - Chester Road - Before 3.jpg",
      "assets/Chigwell - Chester Road - Before 4.jpg",
      "assets/Chigwell - Chester Road - Before 5.jpg",
      "assets/Chigwell - Chester Road - Before 6.jpg",
    ]
  },
  { t: "Chigwell — Brook Way", s: "New build · Chigwell · Essex", tag: "New Build", cls: "wide", label: "CHIGWELL — BROOK WAY",
    slug: "Chigwell-Brook-Way",
    img: "assets/Chigwell - Brook Way - Hero.png",
    duration: "14 months", year: "2024",
    brief: "A stunning new-build home on Brook Way, Chigwell — designed and delivered to the highest specification, with bespoke interiors throughout.",
    challenge: "The project demanded a high level of finish across every room, with the client's brief calling for luxury materials, custom joinery and a cohesive interior scheme from ground floor to roof. Coordinating multiple specialist trades to a single quality standard required meticulous planning.",
    approach: "Our team managed every element in-house — from the initial structural frame through to the final decoration. We worked closely with the client at each stage, presenting material samples and 3D references before any decision was confirmed, ensuring the finished result matched the vision exactly.",
    outcome: "A beautifully finished home handed over on time. Every room was delivered to the client's specification, with bespoke fitted furniture, premium tiling and a refined finish that has set a new benchmark for the street.",
    scope: ["New build construction", "Interior design", "Bespoke joinery", "Flooring & tiling", "Bathroom fit-out"],
    gallery: [
      "assets/Chigwell - Brook Way - Hero.png",
      "assets/Chigwell - Brook Way - After 1.jpg",
      "assets/Chigwell - Brook Way - After 2.jpg",
      "assets/Chigwell - Brook Way - After 3.jpg",
      "assets/Chigwell - Brook Way - After 4.jpg",
      "assets/Chigwell - Brook Way - After 5.jpg",
      "assets/Chigwell - Brook Way - After 6.jpg",
      "assets/Chigwell - Brook Way - After 7.jpg",
      "assets/Chigwell - Brook Way - After 8.jpg",
      "assets/Chigwell - Brook Way - After 9.jpg",
      "assets/Chigwell - Brook Way - After 10.jpg",
      "assets/Chigwell - Brook Way - After 11.jpg",
      "assets/Chigwell - Brook Way - After 12.jpg",
      "assets/Chigwell - Brook Way - After 13.jpg",
      "assets/Chigwell - Brook Way - After 14.jpg",
      "assets/Chigwell - Brook Way - After 15.jpg",
      "assets/Chigwell - Brook Way - After 16.jpg",
      "assets/Chigwell - Brook Way - After 17.jpg",
      "assets/Chigwell - Brook Way - After 18.jpg",
      "assets/Chigwell - Brook Way - After 19.jpg",
      "assets/Chigwell - Brook Way - After 20.jpg",
    ],
    before: [
      "assets/Chigwell - Brook Way - Before 1.jpg",
      "assets/Chigwell - Brook Way - Before 2.jpg",
      "assets/Chigwell - Brook Way - Before 3.jpg",
      "assets/Chigwell - Brook Way - Before 4.jpg",
      "assets/Chigwell - Brook Way - Before 5.jpg",
      "assets/Chigwell - Brook Way - Before 6.jpg",
    ]
  },
  { t: "Emerson Park — Nelmes Road", s: "Refurbishment · Emerson Park · Essex", tag: "Refurbishment", cls: "sqr", label: "EMERSON PARK — NELMES ROAD",
    slug: "Emerson-Park-Nelmes-Road",
    img: "assets/Emerson Park - Nelmes Road - After 1.jpg",
    duration: "8 months", year: "2024",
    brief: "A full refurbishment of a substantial family home in Emerson Park — transformed from top to bottom with a luxury interior fit-out across all rooms.",
    challenge: "The property required a complete overhaul while the programme had to remain tightly managed to minimise disruption. Achieving a consistent high-end finish across 18 rooms of varying scale and function demanded careful material planning and trade sequencing.",
    approach: "We stripped the property back and rebuilt the interior from scratch — new flooring, bathroom suites, kitchen, joinery and decoration throughout. A dedicated project manager was on site daily, coordinating trades and keeping the client updated at every stage.",
    outcome: "A fully transformed family home delivered on programme. The contrast between the before and after speaks for itself — every room finished to the same exacting standard, from the entrance hall through to the en-suite bathrooms.",
    scope: ["Full refurbishment", "Kitchen & bathroom fit-out", "Flooring & tiling", "Bespoke joinery", "Painting & decorating"],
    gallery: [
      "assets/Emerson Park - Nelmes Road - After 1.jpg",
      "assets/Emerson Park - Nelmes Road - After 2.jpg",
      "assets/Emerson Park - Nelmes Road - After 3.jpg",
      "assets/Emerson Park - Nelmes Road - After 4.jpg",
      "assets/Emerson Park - Nelmes Road - After 5.jpg",
      "assets/Emerson Park - Nelmes Road - After 6.jpg",
      "assets/Emerson Park - Nelmes Road - After 7.jpg",
      "assets/Emerson Park - Nelmes Road - After 8.jpg",
      "assets/Emerson Park - Nelmes Road - After 9.jpg",
      "assets/Emerson Park - Nelmes Road - After 10.jpg",
      "assets/Emerson Park - Nelmes Road - After 11.jpg",
      "assets/Emerson Park - Nelmes Road - After 12.jpg",
      "assets/Emerson Park - Nelmes Road - After 13.jpg",
      "assets/Emerson Park - Nelmes Road - After 14.jpg",
      "assets/Emerson Park - Nelmes Road - After 15.jpg",
      "assets/Emerson Park - Nelmes Road - After 16.jpg",
      "assets/Emerson Park - Nelmes Road - After 17.jpg",
      "assets/Emerson Park - Nelmes Road - After 18.jpg",
    ]
  },
  { hidden: true, t: "Hampstead House", s: "New build · 5 bed · NW3", tag: "New Build", cls: "tall", label: "HAMPSTEAD HOUSE",
    slug: "Hampstead-House",
    img: "assets/hampstead-house.jpg",
    budget: "£1.85m", duration: "14 months", year: "2024",
    brief: "A full new-build family home on a cleared plot in NW3 — five bedrooms, cinema room, landscaped garden and full smart-home integration.",
    challenge: "The client purchased a cleared brownfield plot with a complex ground condition report and strict Hampstead conservation area guidelines. Neighbours on three sides meant our programme and noise management had to be surgical. Every elevation required pre-approval from the local heritage officer before a brick was laid.",
    approach: "We appointed a conservation-specialist architect and coordinated a pre-application meeting with the planning authority before submitting. A concrete raft foundation resolved the ground-bearing issues in one pass. We maintained a daily neighbour communication log and delivered weekly video updates direct to the client — who was based in Dubai throughout the main build.",
    outcome: "Handed over four days ahead of the contracted date. The home achieved an EPC A rating, the smart-home system was installed and fully commissioned before the client flew in, and the landscaping was complete and mature enough to photograph on day one.",
    scope: ["New build construction", "Architectural & planning", "Interior design", "Smart home & AV", "Landscaping"],
    gallery: [
      "assets/hampstead-house.jpg",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop",
    ]
  },
  { hidden: true, t: "Islington Townhouse", s: "Refurbishment · Period home · N1", tag: "Refurbishment", cls: "wide", label: "ISLINGTON TOWNHOUSE",
    slug: "Islington-Townhouse",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85&auto=format&fit=crop",
    budget: "£420k", duration: "7 months", year: "2023",
    brief: "Full gut refurbishment of a four-storey Victorian townhouse — structural alterations, new kitchen extension, and a complete interior overhaul.",
    challenge: "The property had been split into flats in the 1970s, leaving a tangle of compromised structural beams, mismatched service runs and several layers of floor build-up that had robbed the house of its original ceiling heights. The rear elevation also required a party-wall agreement with two adjoining owners before any excavation could begin.",
    approach: "We stripped the building back to its Victorian bones, engaged a structural engineer to redesign the beam layout, and negotiated both party-wall agreements within the first three weeks. The kitchen extension was designed as a contemporary zinc-roofed volume that reads as clearly modern yet respectful of the period facade — a balance the planning department commended.",
    outcome: "The finished house recovered an average of 180mm of ceiling height across all floors, the open-plan ground floor transformed the way the family lives, and the project was completed seven days early — allowing the family to move in before the school term began.",
    scope: ["Structural alterations", "Kitchen extension", "Full fit-out", "Plumbing & electrical", "Bespoke joinery"],
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=900&q=80&auto=format&fit=crop",
    ]
  },
  { hidden: true, t: "Kensington Apartment", s: "Interior fit-out · 3 bed · W8", tag: "Interior", cls: "sqr", label: "KENSINGTON APARTMENT",
    slug: "Kensington-Apartment",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop",
    budget: "£290k", duration: "5 months", year: "2024",
    brief: "Luxury fit-out of a lateral apartment in W8 — bespoke joinery throughout, marble bathrooms, and a full Lutron lighting system.",
    challenge: "A lateral apartment across two original mansion-block floors presented a strict weight loading constraint for the stone flooring — each slab had to be individually assessed and signed off by the structural engineer. The building's listed status also meant all penetrations for the new Lutron wiring loom required listed-building consent.",
    approach: "We engaged a specialist stone consultant to specify a lighter-weight marble composite that met the load limits without compromising the visual intent. The Lutron infrastructure was routed entirely through existing service voids, leaving the original cornicing and plasterwork untouched. Every joinery item was designed in 3D and presented to the client for sign-off before workshop production began.",
    outcome: "The client described it as the most stress-free project they had experienced. The apartment was photographed for an interiors magazine within two weeks of completion, and the Lutron system has since been extended by the client to include the building's communal areas.",
    scope: ["Bespoke joinery", "Marble bathrooms", "Flooring & tiling", "Lutron lighting", "Decorating"],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format&fit=crop",
    ]
  },
  { hidden: true, t: "Richmond Mews", s: "Development · 6 units · TW9", tag: "Development", cls: "full", label: "RICHMOND MEWS",
    slug: "Richmond-Mews",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
    budget: "£2.1m", duration: "18 months", year: "2023",
    brief: "A six-unit mews development from groundwork to handover — planning managed, all units sold off-plan before completion.",
    challenge: "The site had a complex title with an historic covenant restricting commercial use, and the local authority required a Section 106 agreement covering affordable housing contributions and a new pedestrian access. Utilities to the mews lane had never been formally adopted, adding an unexpected infrastructure element to the programme.",
    approach: "Our development consultancy team resolved the covenant issue with a title insurer before contracts exchanged, saving the client an estimated six weeks. We negotiated the S106 contribution down by demonstrating the viability impact, and project-managed the utility adoption in parallel with the main build to avoid any programme delay. All six units were marketed at first-fix stage with CGI walkthroughs produced by our in-house visualisation team.",
    outcome: "All six units sold off-plan at an average of 4% above the initial sales estimates. The development received a commendation from the local authority's design review panel, and two of the six buyers were referrals from the same scheme — the best measure of quality we know.",
    scope: ["Planning & development", "New build construction", "Interior design", "Landscaping", "Sales support"],
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=80&auto=format&fit=crop",
    ]
  },
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

const VALUES = [
  { icon: "◈", h: "Craftsmanship", p: "Every detail matters. We hold ourselves to a standard most companies talk about but few actually deliver." },
  { icon: "◈", h: "Transparency", p: "Fixed costs, honest timelines and open communication from day one through to long after handover." },
  { icon: "◈", h: "Family Values", p: "We treat every client's home as if it were our own — with the care, pride and attention it deserves." },
  { icon: "◈", h: "Excellence", p: "We work only with the best tradespeople, materials and suppliers. There is no shortcut that is worth taking." },
  { icon: "◈", h: "Progressive", p: "Embracing smart home technology, sustainable methods and modern construction techniques on every project." },
  { icon: "◈", h: "Aftercare", p: "Our relationship does not end at handover. Dedicated post-build support and warranties you can count on." },
];

const TRADES = [
  { cat: "Structure & Shell", items: ["New build construction", "Extensions & additions", "Loft conversions", "Basement excavation", "Structural alterations"] },
  { cat: "Fit-out & Finish", items: ["Kitchen & bathroom fitting", "Flooring & tiling", "Plastering & rendering", "Joinery & bespoke carpentry", "Painting & decorating"] },
  { cat: "Mechanical & Electrical", items: ["Plumbing & heating", "Electrical installation", "Underfloor heating", "Air conditioning", "Smart home & home automation"] },
  { cat: "Security & Technology", items: ["CCTV & alarm systems", "Access control", "AV & home cinema", "EV charging points", "Solar & renewables"] },
];

const PROJECTS_ALL = PROJECTS;
const PROJECTS_VISIBLE = PROJECTS.filter(p => !p.hidden);
Object.assign(window, { NAV_LINKS, ACCREDS, SERVICES, STATS, PROJECTS: PROJECTS_VISIBLE, PROJECTS_ALL, STEPS, TESTIMONIALS, VALUES, TRADES });

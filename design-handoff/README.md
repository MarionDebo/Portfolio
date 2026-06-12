# Handoff: Marion Débonnaire — Portfolio (Astro)

> **For Claude Code.** This package describes a personal portfolio for a Senior Product Manager
> specialised in AI-native products. The goal of this handoff is two-fold and **should be done in
> this order**:
>
> 1. **Build the design system first** — centralise every design token as CSS custom properties in
>    `src/styles/global.css`, then build the reusable `.astro` components (`Nav`, `Footer`,
>    `Button`, `ProjectCard`, `SectionHeader`, `Tag`, `BrowserMock`, `PhoneMock`).
> 2. **Then rebuild the four pages** on top of that system — `index` (Home), `work` (Work),
>    `portfolio` case-study (Project Page), and `my-story`.
>
> The project already ships a `CLAUDE.md` at the repo root. **Follow it.** Stack = Astro (SSG), CSS
> custom in `src/styles/` (no Tailwind), `.astro` components first, `<Image />` from `astro:assets`
> for images, fonts via `<link>` in `<head>`. The site language is **English**.

---

## About the design files

The files in `design-references/` are **design references created in HTML** (they were authored as
self-contained prototypes). They are **not production code to copy verbatim** — they use inline
styles and a small runtime wrapper (`support.js`, `<x-dc>`) that has nothing to do with Astro.

Your job is to **recreate these designs inside the Astro codebase** using its conventions:
`.astro` components, CSS variables in `:root`, scoped/global CSS files. Treat the HTML as the
**source of truth for visual values** (colours, spacing, type, layout, copy) — read the exact hex
codes and pixel values out of it — but reimplement the structure idiomatically.

Open any `design-references/*.dc.html` directly in a browser to see the intended result. Ignore the
`<script src="./support.js">`, `<x-dc>`, `<helmet>`, and `data-screen-label` / `data-comment-anchor`
attributes — those are artefacts of the prototyping environment, not part of the design.

## Fidelity

**High-fidelity.** These are pixel-level mockups with final colours, typography, spacing, copy and
interactions. Recreate them faithfully. The one thing left intentionally open is **responsive /
mobile behaviour** — the mockups are designed at desktop width (~1180px content max). You will need
to define the breakpoints yourself; guidance is in the *Responsive* section.

---

# PART 1 — THE DESIGN SYSTEM

## Design tokens

Put all of these in `src/styles/global.css` under `:root {}`. Every component and page must consume
these variables — never hard-code a hex or a px that exists here.

### Colours

```css
:root {
  /* Brand / accent */
  --color-accent:        #6C4DF6;  /* primary violet — links, accents, CTAs, numerals */
  --color-accent-rgb:    108, 77, 246; /* for rgba() borders & tints */

  /* Ink / text */
  --color-ink:           #15131C;  /* near-black headings */
  --color-body:          #2c2836;  /* body copy on light bg */
  --color-body-soft:     #3a3646;  /* secondary body copy */
  --color-muted:         #4a4556;  /* muted paragraph text */
  --color-muted-2:       #55505f;  /* lead paragraph grey */
  --color-meta:          #8a8594;  /* mono labels, captions, de-emphasis */

  /* Surfaces / backgrounds */
  --color-bg-cream:      #F4F2EE;  /* default page background (warm off-white) */
  --color-bg-white:      #FFFFFF;  /* white sections */
  --color-bg-lilac:      #ECE7FF;  /* pale violet section / accent cards */
  --color-bg-lilac-soft: #F7F5FB;  /* very pale violet cards */
  --color-bg-lilac-tint: #F2EEFE;  /* mock UI fills */

  /* Dark surface (footer, solution block, dark card) */
  --color-dark:          #15131C;
  --color-dark-text:     #F4F2EE;  /* text on dark */
  --color-dark-meta:     #9b94ad;  /* mono label on dark */
  --color-dark-meta-2:   #a39cb5;  /* sign-off line on dark */
  --color-dark-body:     #c8c2d6;  /* body on dark card */
  --color-accent-soft:   #A593F8;  /* accent used on dark surfaces */

  /* Chart / mock decorative violets */
  --violet-100: #E5DEFB;
  --violet-200: #D8CDFB;
  --violet-300: #C9BCF5;
  --violet-400: #B9A6F7;

  /* Hero gradient stops (warm → cool diagonal) */
  --hero-grad-1: #FBEEE7;
  --hero-grad-2: #F4E9F1;
  --hero-grad-3: #EBE6F7;
  --hero-grad-4: #E6EAF3;
  --hero-grad-5: #E9ECF2;

  /* Traffic-light dots for browser mock */
  --dot-red:    #FF5F57;
  --dot-yellow: #FEBC2E;
  --dot-green:  #28C840;
}
```

**The hero gradient** (used on Home hero, Work header, Project Page header) is:

```css
background:
  radial-gradient(ellipse 60% 80% at 12% 8%, rgba(255,224,205,0.55), transparent 52%),
  radial-gradient(ellipse 70% 90% at 92% 70%, rgba(214,224,242,0.6), transparent 58%),
  linear-gradient(108deg, #FBEEE7 0%, #F4E9F1 32%, #EBE6F7 56%, #E6EAF3 80%, #E9ECF2 100%);
```
Make it a single reusable class / variable (e.g. `--gradient-hero`).

### Typography

Load all three families with a single `<link>` in `BaseLayout.astro`'s `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
:root {
  --font-display: 'Space Grotesk', sans-serif;     /* headings, numerals, nav, names, buttons */
  --font-body:    'Hanken Grotesk', system-ui, sans-serif; /* body copy, default */
  --font-mono:    'JetBrains Mono', monospace;     /* eyebrows, labels, tags, captions, metrics units */
}
```

**Type roles (exact values used across the mockups):**

| Role | Family | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Hero H1 (Home) | display | 62px | 600 | -0.025em | 1.04 |
| Hero H1 (Work) | display | 72px | 600 | -0.03em | 1.02 |
| Hero H1 (My Story) | display | clamp(48px, 6.4vw, 82px) | 600 | -0.035em | 1.03 |
| Hero H1 (Project) | display | 62px | 600 | -0.03em | 1.04 |
| Section H2 | display | 34px | 600 | -0.02em / -0.025em | 1.05 |
| Footer H2 ("Building…") | display | 54px | 600 | -0.025em | — |
| Project title H3 | display | 38px | 600 | -0.02em | — |
| Timeline / sub H3 | display | 27px | 600 | -0.02em | — |
| Decision H3 | display | 23px | 600 | -0.015em | — |
| Card H4 | display | 20px | 600 | -0.01em | — |
| Big numeral (project no.) | display | 64px | 600 | -0.03em | 1 (opacity .85) |
| Metric numeral | display | 21–24px | 600 | — | — |
| Stat numeral (impact) | display | 64px | 600 | -0.03em | 1 |
| Lead paragraph | body | 19–21px | 400 | — | 1.6–1.65 |
| Body paragraph | body | 17–18px | 400 | — | 1.6–1.75 |
| Small card body | body | 15.5–16px | 400 | — | 1.6 |
| Eyebrow / label | mono | 11–12px | 400/500 | 0.06em–0.18em | — |
| Tag / chip | mono | 11px | 400 | — | — |
| Caption / unit | mono | 11–13px | 400 | 0.04em–0.05em | — |

Body text defaults to `--font-body`; **all headings, the nav wordmark, names, numerals, and buttons
use `--font-display`**; **all uppercase eyebrows, tags, metric units, breadcrumbs and captions use
`--font-mono`**.

### Spacing, radius, shadow

```css
:root {
  /* Layout widths */
  --max-content:  1180px;  /* main content max-width */
  --max-nav:      1080px;  /* nav pill + Work/Project body */
  --max-prose:    720px;   /* long-form reading column (Project Page) */
  --max-prose-lg: 860px;   /* Project Page header column */

  /* Section rhythm */
  --section-pad-y: 72px;   /* common vertical section padding */
  --gutter:        32px;   /* horizontal page gutter */

  /* Radius */
  --radius-pill:  999px;   /* nav, buttons, tags */
  --radius-card:  16px;    /* cards, mock frames */
  --radius-lg:    18px;    /* impact cards */
  --radius-xl:    22px;    /* dark solution block */
  --radius-img:   24px;    /* hero portrait */

  /* Shadows */
  --shadow-card:    0 36px 60px -28px rgba(50,30,110,0.4);
  --shadow-card-sm: 0 36px 60px -28px rgba(50,30,110,0.28);
  --shadow-portrait:0 22px 48px -20px rgba(40,25,90,0.34);
  --shadow-photo:   0 28px 54px -26px rgba(50,30,110,0.45);
  --shadow-laptop:  0 50px 90px -30px rgba(50,30,110,0.5);
  --shadow-nav:     0 10px 34px -12px rgba(40,25,90,0.26);

  /* Borders */
  --border-hairline: 1px solid rgba(0,0,0,0.1);
  --border-accent-12: 1px solid rgba(108,77,246,0.12);
  --border-accent-35: 1px solid rgba(108,77,246,0.35);
}
```

## Reusable components (build these `.astro` components in `src/components/`)

### `Nav.astro`
Sticky pill navigation, present on every page.
- **Structure:** `<header>` sticky `top:0; z-index:50; padding:18px 32px 0`. Inside, a centred pill
  `<div>` `max-width:1080px; border-radius:999px; padding:12px 16px 12px 26px;` flex space-between.
- **Left:** wordmark "Marion Débonnaire" — `--font-display`, 600, 18px, `-0.01em`, `--color-ink`.
  Links to Home.
- **Right:** nav links — `--font-display`, 500, 15px, gap 32px, colour `#3a3646`. Items:
  **Work**, **AI Expertise**, **Story**. Active link is `--color-accent`. Use `Astro.url.pathname`
  to set the active state (per CLAUDE.md).
- **Scroll behaviour (important interaction):** the pill is transparent at the top of the page, and
  becomes a **frosted-glass pill** once the user scrolls past the top. Toggle is driven by a
  sentinel element at the very top of the page + an IntersectionObserver / scroll listener.
  Glassy state styles:
  ```css
  background: rgba(255,255,255,0.66);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border-color: rgba(255,255,255,0.7);
  box-shadow: 0 10px 34px -12px rgba(40,25,90,0.26);
  ```
  Transparent state: `background:transparent; border-color:transparent; box-shadow:none`.
  Transition: `background 300ms ease, box-shadow 300ms ease, border-color 300ms ease`.
  In Astro, implement this as a tiny client-side script (`is:inline` or a small island) — see the
  `componentDidMount` logic in any reference file for the exact, robust implementation (it listens
  to scroll in capture phase **and** uses an IntersectionObserver on a `#nav-top-sentinel`).
- **Note:** because the hero sits under the nav, the page wrapper uses `margin-top:-78px;
  padding-top:78px` on the first section so the gradient bleeds up behind the transparent pill.

### `Footer.astro` — the "Let's talk" section (identical on Home, Work, My Story)
- Dark block: `background:#15131C; color:#F4F2EE`. Inner `max-width:1180px; padding:96px 32px;
  text-align:center`.
- Eyebrow: "LET'S TALK" — mono, 12px, `--color-dark-meta`, margin-bottom 24px.
- H2: "Building something AI-native?" — display, 600, 54px, `-0.025em`, white, margin-bottom 28px.
- **Primary button** "Get in touch →" — see `Button.astro`. Links to the owner's LinkedIn
  (currently `href="#"` — **leave a clearly-marked TODO**, the owner will fill the real URL).
- **Social row:** two 44×44px circular icon links (LinkedIn, GitHub), gap 16px, margin-top 40px.
  Border `1px solid rgba(244,242,238,0.2)`, colour `#F4F2EE`. Hover → fill `--color-accent`,
  border `--color-accent`, icon white (transition 200ms). SVGs are inline in the references — lift
  them. **Both hrefs are `#` placeholders → TODO for the owner.**
- Sign-off line: "Made with love, caffeine, and my buddy Claude" — mono, 13px, `--color-dark-meta-2`,
  `0.04em`, margin-top 36px.

### `Button.astro` (pill CTA)
- `--font-mono`, 14px, white text, `background:#6C4DF6`, `padding:15px 30px`,
  `border-radius:999px`, inline-flex, gap 10px. Used for "Get in touch →".

### `Tag.astro` (chip)
- `--font-mono`, 11px, `--color-accent`, `border:1px solid rgba(108,77,246,0.35)`,
  `padding:4px 10px`, `border-radius:999px`. Used for project tags (AI, Conversational UX, Mobile,
  Social Impact, B2B SaaS, Acquisition) and for the larger My-Story pills (12px, padding 7px 16px,
  border `rgba(108,77,246,0.32)`).

### `SectionHeader.astro`
- Row: a 30×3px accent bar (`background:#6C4DF6; border-radius:2px`) + H2 (display, 34px, 600).
- Sits on a bottom rule: `border-bottom:1px solid rgba(108,77,246,0.28); padding-bottom:20px`.
- Used for "Selected Work", "Kind Words from Teammates", "The Journey", "Product Philosophy".

### `ProjectCard.astro`
The horizontal project block used on Home and Work (2-column grid `1fr 1.1fr`, gap 56px, items
centred, section padding 72px 32px). Props: index ("01"…), tags[], title, blurb, metric (bold
numeral + soft suffix), href, and a `media` slot (the mock). On **Work**, the whole card is an
`<a>` with a hover background shift; on **Home** only the "View case study →" link is interactive.
- Big index numeral: display, 64px, 600, `--color-accent`, opacity .85.
- "View case study →": mono, 13px, `--color-ink`, `border-bottom:2px solid #6C4DF6`, padding-bottom 3px.

### `BrowserMock.astro` & `PhoneMock.astro` (decorative)
Pure-CSS product mockups (no real screenshots except the dashboard image). The browser mock has a
36px title bar with three traffic-light dots and a fake URL pill, then a body of placeholder
chart bars / cards in the violet scale. The phone mock is a 208px-wide dark device frame
(`border-radius:32px; padding:9px; background:#15131C`) with a violet header and list rows.
Lift the exact markup from `Home.dc.html` / `Work.dc.html`. These are decorative — keep them as
small presentational components.

### Global resets (in `global.css`)
```css
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--color-bg-cream); font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
::selection { background: var(--color-accent); color: #fff; }
a { text-decoration: none; color: inherit; }
* { box-sizing: border-box; }
```
(Note: Home & My Story default to cream `#F4F2EE`; Work & Project Page default to white `#FFFFFF` —
set the page background per-page.)

---

# PART 2 — THE PAGES

All pages share `Nav` (top) and, except the Project Page, `Footer` (bottom). Content max-width
1180px, gutter 32px, unless noted.

## `/` — Home  (`src/pages/index.astro`)  · default bg cream `#F4F2EE`

1. **Hero** (gradient bg, 2-col `1.35fr 1fr`, gap 56px, items centred, content padding
   `40px 32px 72px`).
   - Left: H1 "Senior Product Manager at **the edge of AI.**" (the phrase "the edge of AI." in
     `--color-accent`). Lead paragraph (19px, `--color-muted-2`, max-width 30ch): "At the
     intersection of product, AI and data. I turn complex analytics into conversational, human
     experiences." Then a 3-up stat row separated by a top hairline (`--font-mono` labels, display
     numerals 22px): **6+ years** / PRODUCT · **AI · Data** / FOCUS · **SaaS · Mobile** / B2B · B2C.
   - Right: portrait `portrait-Marion.jpg`, `border-radius:24px`, `--shadow-portrait`, with an
     offset accent outline behind it (`position:absolute; inset:18px -16px -16px 18px; border:1.5px
     solid #6C4DF6; border-radius:24px`).
2. **Selected Work** (white bg). `SectionHeader` "Selected Work", then three `ProjectCard`s:
   - **01 · Toucan AI** — tags AI, Conversational UX. Blurb: *"An AI-native, conversational
     analytics platform, rebuilt from scratch so end users can simply ask a question and instantly
     get the answer."* Metric: **15+ qualified opportunities** *in the first month of beta*. Media:
     `BrowserMock`.
   - **02 · Entourage App Redesign** (bg lilac `#ECE7FF`) — tags Mobile, Social Impact. Blurb:
     *"Repositioning a non-profit's app from donation-centric to a social connection platform built
     around events, communities and education."* Metric: **170,000 users** *on the app*. Media:
     `PhoneMock` (placed left).
   - **03 · Self-service Dashboard** (bg cream) — tags B2B SaaS, Acquisition. Blurb: *"A
     pick-and-choose dashboard editor that lets business users customize their embedded analytics,
     with no technical knowledge required."* Metric: **36% of SQL-to-QSO conversions** *in 2025*.
     Media: `BrowserMock` (dashboard variant).
3. **Kind Words from Teammates** (white bg). `SectionHeader`, then a 3-col grid (gap 40px) of quote
   cards, each with a top accent rule (`border-top:2px solid #6C4DF6; padding-top:22px`), the quote
   (17px, `--color-body`), and an author row (42px lilac avatar circle + name in display 15px +
   role in mono 11px `--color-meta`). The three testimonials (in French — keep as-is):
   - **Jérémy Pinhel** — Senior Software Engineer · Toucan.
   - **Sara Tissenier** — Senior Product Designer.
   - **Alexandre Mac** — Chief Product Officer · Entourage.
   (Full quote text is in `design-references/Home.dc.html`.)
4. **Footer** ("Let's talk").

## `/work` — Work  (`src/pages/work.astro`)  · default bg white `#FFFFFF`

1. **Header** (gradient bg, max-width 1080px, padding `72px 32px 64px`). H1 "Selected Work" (72px).
   Lead paragraph (20px, max-width 54ch): *"Three products at the intersection of AI, data and human
   experience, from conversational analytics to a social-impact mobile platform. Each one a
   different problem, the same way of working."* Then a top-hairline stat: **03** / CASE STUDIES.
2. **Three full-width project rows**, each an entire `<a>` with a hover background shift:
   - **01 · Toucan AI** (bg white, hover `#FAF9FE`) — same content as Home card 01. `href="#"`
     (case study not built yet → TODO).
   - **02 · Entourage** (bg lilac `#ECE7FF`, hover `#E4DBFF`) — phone mock on left. `href="#"` TODO.
   - **03 · Self-service Dashboard** (bg cream, hover `#EDEAE3`) — **links to the case-study page**
     (`/portfolio/self-service-dashboard` or equivalent route). Media here uses the **real
     screenshot** `uploads/Self-serv-Dashboard_Edition.png` inside a browser-chrome frame.
3. **Footer** ("Let's talk").

## Portfolio case study — Project Page  (`src/content/portfolio/…` → `src/pages/portfolio/[slug].astro`)
**bg white.** This is the deep case study for "Self-service Dashboard". Per CLAUDE.md, portfolio
case studies should be **Astro Content Collections** (`.mdx` in `src/content/portfolio/`). Model
this page as the rendering template for one case study; the long-form copy can live in the
collection entry. Reading column is `max-width:720px` (prose) / `860px` (header), centred.

1. **Header** (gradient bg, max-width 860px). Breadcrumb (mono): **Work / Self-service Dashboard**
   ("Work" is an accent link). H1 "Self-service Dashboard" (62px). Lead paragraph (19px): *"Toucan
   enables SaaS product teams to embed fully customizable, white-label analytics into their
   applications in days, not months…"* Then a 3-col meta row (top hairline): **ROLE** Senior Product
   Manager · **SCOPE** Discovery → Delivery · **IMPACT** 36% of SQL-to-QSO conversions (impact value
   in accent).
2. **Hero screenshot in a MacBook frame** — the dashboard image `uploads/Self-serv-Dashboard_Edition.png`
   inside a CSS-drawn laptop (dark screen bezel `#0C0B10`, radius 20/7px, `--shadow-laptop`, plus a
   two-tier metallic base). Pulled up over the header with `margin-top:-72px`. (You may simplify the
   laptop to a clean framed screenshot if the CSS bezel is fiddly — keep the elevation + shadow.)
3. **01 · My Role** (prose). Section header pattern here is different from the home one: a small
   accent numeral ("01") + H2, on a bottom hairline. Body 20px.
4. **02 · The Problem** (prose). Body 18px: *"The absence of a self-service offering represented a
   **significant amount of lost revenue every year**. For most of our prospects, self-service was a
   non-negotiable prerequisite…"*  ⚠️ **Note:** this deliberately does **not** quote a figure — do
   not reintroduce any euro amount.
5. **What we heard** — eyebrow + a violet left-border blockquote (display, 500, 24px): the prospect
   quote, cited "Toucan prospect, 2025". Follow-up paragraph.
6. **Who needed it** — "Three distinct user needs": a 3-col grid of cards, each a big "1/3" accent
   numeral (46px) + a sentence (browse & select / edit & create / edit underlying data).
7. **Pain points / Use cases** — 2-col grid of pale-violet cards (`#F7F5FB`, accent-tinted border,
   radius 16px): "AS AN END USER" and "AS AN ADMIN".
8. **03 · Approach & Key Decisions** (prose). Intro paragraph, then two decision blocks separated by
   accent top-rules: **DECISION 01 · TRADE-OFF** "Speed over completeness"; **DECISION 02 · UX
   DILEMMA** "Rebuild or adapt?".
9. **04 · The Solution** — a dark block (`#15131C`, radius 22px, padding 56px) with a single large
   statement (display, 500, 28px, white).
10. **05 · Business Impact** — 2-col stat cards: an accent card **36%** (white text) and a lilac card
    **~20** (accent numeral) "clients adopted self-service since launch".
11. **Next project** — a full-width link card (cream, hover lilac) "NEXT PROJECT → Toucan AI".
    (This page has **no** "Let's talk" footer in the reference; keep or add the shared footer at
    your discretion — recommend adding it for consistency.)

Full copy for every block is in `design-references/Project Page.dc.html`.

## `/my-story` — My Story  (`src/pages/my-story.astro`)  · default bg cream `#F4F2EE`

1. **Hero** (type-led, centred, max-width 880px, padding `160px 32px 92px`). A giant faint
   watermark word **"product"** sits behind the text (display, 600, `clamp(180px,30vw,360px)`,
   `--color-accent`, **opacity 0.05**, `pointer-events:none`, centred). Eyebrow "MY STORY" (mono,
   `0.18em`). H1 "Not a résumé.<br>A throughline." (clamp 48→82px). Lead paragraph (21px). Three
   pills: Product · AI · Data · Human-first.
2. **The Journey** (white bg, max-width 1080px). `SectionHeader` "The Journey" + a mono subline
   "FOUR CHAPTERS · ONE DIRECTION OF TRAVEL". Then a **vertical timeline**: a gradient rail
   (`linear-gradient(#6C4DF6 0%, #D8CDFB 100%)`, 2px wide) down the left, with four chapters. Each
   chapter = a `40px 1fr` grid: a 20px accent node dot (`box-shadow:0 0 0 5px #fff, 0 0 0 6px
   rgba(108,77,246,0.25)`) + content (mono chapter label, H3 27px, body 18px, optional inline
   metric). Chapters:
   - **CH. 01 · THE SPARK** — "Falling for the problem".
   - **CH. 02 · MISSION-DRIVEN** — "Entourage — product with a purpose" (metric **170,000** people).
   - **CH. 03 · INTO THE DATA** — "Toucan — making analytics human" (metric **36%** SQL-to-QSO).
   - **CH. 04 · AI-NATIVE · TODAY** — "Betting on the conversation" (node dot is dark `#15131C`).
3. **Product Philosophy** (bg lilac `#ECE7FF`, max-width 1180px). `SectionHeader`, then a 2-col grid
   (`1fr 1fr`, gap 64px):
   - Left: a lead statement (display, 500, 27px) + the **team photo**
     `uploads/Photo-groupe-maison.jpeg` (`aspect-ratio:4/3; object-fit:cover; border-radius:20px;
     --shadow-photo`) + a mono caption "↑ THE TEAM BEHIND THE WORK".
   - Right: four principle cards (white, radius 16px, accent-tint border) numbered 01–04; **card 04
     is dark** (`#15131C`, white title, body `#c8c2d6`, mono number `#A593F8`). Titles: "Start with
     the job, not the feature" / "Ship to learn" / "Make the technology disappear" / "The team is
     the product".
4. **Footer** ("Let's talk").

Full copy in `design-references/My Story.dc.html`. (The CLAUDE.md also calls for a "Kind Words from
Teammates" block; in the current design those three testimonials live on the **Home** page — keep
them there, or mirror them here, your call. Don't duplicate the data source.)

---

## Interactions & behaviour (summary)

- **Sticky nav glass-on-scroll** — described under `Nav.astro`. Present on every page. This is the
  only non-trivial JS; implement it as a small inline script or a tiny island. Reference
  implementation (robust, handles any scroll container) is the `componentDidMount` block at the
  bottom of every `design-references/*.dc.html`.
- **Card hover** — Work project rows shift background colour (200ms ease). Footer social icons fill
  with accent on hover (200ms). "View case study →" links carry a persistent 2px accent underline.
- **Smooth scroll** — `html { scroll-behavior: smooth; }` (in-page anchor jumps).
- **`::selection`** — accent violet background, white text, site-wide.

## Responsive (you decide the breakpoints — designs are desktop-first)

- Collapse all 2-col grids (`1.35fr 1fr`, `1fr 1.1fr`, `1fr 1fr`, `repeat(3,1fr)`) to a single
  column below ~860px. Stack hero text above portrait; testimonials and impact cards stack.
- Nav: per CLAUDE.md, add a **burger menu** on mobile. The pill can shrink to fit.
- Reduce hero H1 sizes on small screens (the My Story hero already uses `clamp()`; apply the same
  idea to Home/Work/Project H1s).
- Keep the 32px gutter; reduce large vertical paddings (72–96px) to ~48px on mobile.

## Accessibility

- All images need real `alt` (portrait, team photo, dashboard screenshot — alts are in the refs).
- Use landmarks: `<nav>`, `<main>`, `<footer>`. The nav already uses `<header>/<nav>`.
- Maintain contrast: body text `--color-body` on light, `--color-dark-text` on dark — both pass.
  The faint "product" watermark (opacity .05) is decorative — mark `aria-hidden`.

## Assets (in `design-references/` — move into `src/assets/` for `astro:assets`)

| File | Used on | Notes |
|---|---|---|
| `portrait-Marion.jpg` | Home hero | Portrait photo. |
| `uploads/Photo-groupe-maison.jpeg` | My Story · Product Philosophy | Team group photo, 4:3 crop. |
| `uploads/Self-serv-Dashboard_Edition.png` | Work card 03 + Project Page hero | Real product screenshot. |

The pure-CSS browser/phone mocks use **no image files** — they're drawn with divs.
Social icons (LinkedIn, GitHub) are **inline SVGs** — lift them from the footer markup.

## TODOs the owner must fill (currently `href="#"`)

- LinkedIn URL — footer "Get in touch" button + footer LinkedIn icon, on Home, Work, My Story.
- GitHub URL — footer GitHub icon (or remove the icon if unused).
- "AI Expertise" nav link — page not built yet (CLAUDE.md lists `/ai-expertise` as a planned page).
- Case-study links for **Toucan AI** and **Entourage** ("View case study →" → `#`). Only the
  Self-service Dashboard case study exists.

## Reference files

```
design-references/
├── Home.dc.html          → /          (src/pages/index.astro)
├── Work.dc.html          → /work      (src/pages/work.astro)
├── My Story.dc.html      → /my-story  (src/pages/my-story.astro)
├── Project Page.dc.html  → portfolio case study (Content Collection entry + template)
├── portrait-Marion.jpg
├── support.js            ← prototyping runtime, IGNORE (not part of the design)
└── uploads/
    ├── Photo-groupe-maison.jpeg
    └── Self-serv-Dashboard_Edition.png
```

Open each `.dc.html` in a browser to see the target. Read values straight out of the inline styles —
they are the source of truth.

# Yusuf Aman — Portfolio (React)

A pixel-for-pixel React port of the original static portfolio
(`index.html` + `style.css` + `main.js` + `three-scene.js`). No visual,
layout, spacing, typography, color, animation, hover, transition, or
responsive behavior was redesigned — only the implementation moved to
React components and hooks.

## Stack

- **React 19** + **Vite** (JavaScript, not TypeScript)
- **Global CSS** (the original `style.css`, copied verbatim into
  `src/styles/global.css`) — CSS Modules were intentionally **not**
  used because the original stylesheet leans on shared global utility
  classes (`.btn`, `.glass`, `.section`, etc.) across every section;
  scoping them per-component would have required renaming classes and
  risked subtle drift from the original cascade.
- **three.js** — hero WebGL "neural network" scene (ported from the
  original vanilla `three-scene.js`)
- **GSAP** + **ScrollTrigger** — section-head scroll reveals
- **Lenis** — smooth-scroll, wired the same way as the original
- **AOS** — initialized exactly as the original did. Note: the original
  site loads the AOS *script* from a CDN but never includes AOS's
  stylesheet, so `data-aos` elements do not actually receive the
  library's fade/translate transition on the original site either —
  this port intentionally preserves that exact (quirky) behavior rather
  than "fixing" it.
- **Font Awesome 6** — loaded via the same CDN `<link>` as the original,
  in `index.html`
- **React Icons** — installed and available, but not required since all
  original icons come from Font Awesome classes already wired up

## Folder structure

```
src/
├── assets/                  (empty — original had no images beyond a resume PDF placeholder)
├── components/
│   ├── Navbar/Navbar.jsx
│   ├── Hero/Hero.jsx
│   ├── About/About.jsx, StatCard.jsx, SkillBar.jsx
│   ├── Projects/Projects.jsx, ProjectCard.jsx
│   ├── Contact/Contact.jsx, ContactForm.jsx
│   ├── Footer/Footer.jsx
│   └── Common/GrainOverlay.jsx, CursorGlow.jsx, ProgressBar.jsx, BackToTop.jsx
├── data/                     (content extracted into plain data — projects.js, about.js, site.js)
├── hooks/                    (every piece of main.js / three-scene.js behavior, one hook per concern)
├── styles/global.css         (the original stylesheet, unmodified)
├── App.jsx
└── main.jsx
public/
└── assets/README-resume.txt  (place Yusuf_Aman_Resume.pdf here — same as the original)
```

### Hooks (1:1 with the original `main.js` / `three-scene.js` behaviors)

| Hook | Replaces |
|---|---|
| `useSmoothScroll` | Lenis init + GSAP ticker sync + in-page anchor interception |
| `useAOSInit` | `AOS.init(...)` |
| `useMagneticAndTilt` | `.magnetic` button and `.tilt` card pointer effects |
| `useScrollPast` | nav `.scrolled` state / back-to-top visibility |
| `useScrollProgress` | top progress bar width |
| `useCursorGlow` | desktop cursor glow follow |
| `useHeroReveal` | staggered `[data-reveal]` intro animation |
| `useTypedRole` | hero subtitle typewriter loop |
| `useSectionHeadReveal` | GSAP ScrollTrigger fade-in for `.section-head` |
| `useCountUp` | animated stat counters (IntersectionObserver) |
| `useSkillBarFill` | animated skill bar width fill (IntersectionObserver) |
| `useHeroScene` | the entire `three-scene.js` WebGL scene, with full cleanup on unmount |

## Installation & running

```bash
npm install
npm run dev       # local dev server (Vite)
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Notes / parity details

- The contact form still posts directly to **Web3Forms**
  (`https://api.web3forms.com/submit`) with the same access key, field
  validation rules, loading-spinner state, and success/error copy as
  the original `main.js`.
- The Express backend (`server.js`, `routes/`, `controllers/`,
  `middleware/`) from the uploaded project served the static files and
  exposed an unused `/api/contact` endpoint — the live site's actual
  form submission never called it (it posts straight to Web3Forms), so
  it was out of scope for a frontend React conversion and isn't part of
  this project. If you need that Express layer, it's easy to keep
  running standalone and simply serve this project's `dist/` build via
  its existing static middleware.
- No images ship with the original project besides a resume PDF
  placeholder (`public/assets/README-resume.txt` explains where to drop
  `Yusuf_Aman_Resume.pdf`); the hero "Download Resume" button expects it
  at that exact path.

// Everything the site renders that is not an article. Authored here as plain
// constants: the YAML content directory and its consumer tagging are gone, so a
// value appears on a page because a page reads it, not because a tag routed it.
//
// Contact details are deliberately absent. The phone number and postal area
// belong to the résumé document only and must never reach a public page.
//
// Mirrors profile/ at SiegeSailor/SiegeSailor@16ccc07 (2026-11-01).

export type TMedia = { key: string; label: string; href: string };
export type TIdentity = { legal: string; display: string };
export type TSite = {
  domain: string;
  title: string;
  description: string;
  image: string;
  license: { label: string; href: string };
};
export type TRouteTitle = { path: string; title: string };
export type TProfile = {
  picture: string;
  headlines: string[];
  status: { location: string; position: string };
  tagline: string;
  intro: string;
};
export type TCompany = { company: string; website?: string };
export type TProject = {
  title: string;
  description: string;
  href: string;
  stage: "Planning" | "Development" | "Production";
};

const IDENTITY: TIdentity = {
  legal: "Jin Yu Zhang",
  display: "Jin Yu Zhang",
};

const SITE: TSite = {
  domain: "jinyu-zhang.com",
  title: "Jin Yu Zhang's Website",
  description:
    "Jin Yu Zhang's personal website, showcasing my profile, projects, blog, and notes.",
  image: "/images/Jin-Yu-Zhang-Profile.jpg",
  license: {
    label: "CC BY 4.0",
    href: "https://creativecommons.org/licenses/by/4.0/",
  },
};

// Each `key` picks an icon in settings/icons.ts; a new entry needs one there
// before the site will render it.
const MEDIA: TMedia[] = [
  { key: "github", label: "GitHub", href: "https://github.com/SiegeSailor" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jin-yu-zhang-812181155/",
  },
];

// "/blog" is a route prefix for article pages, not a page of its own; it carries
// a title so the article header can name the section.
const ROUTE_TITLES: TRouteTitle[] = [
  { path: "/", title: "Home" },
  { path: "/blog", title: "Blog" },
  { path: "/about", title: "About" },
];

const PROFILE: TProfile = {
  picture: "/images/Jin-Yu-Zhang.jpg",
  headlines: ["Distributed Systems", "Cloud & DevOps", "Observability"],
  status: {
    location: "NYC Metropolitan Area",
    position: "Senior Software Engineer",
  },
  tagline:
    "Distributed systems, observability, and CI/CD, from 10,000+ RPS consumer scale to FDA-regulated devices.",
  intro:
    "I build systems that have to keep running: real-time services at 10,000+ peak RPS, medical devices at clinical sites with no internet, and the pipelines, load tests, and observability behind them. I write up what I learn along the way.",
};

// The home page hero links the current employer.
const COMPANY: TCompany = {
  company: "CooperSurgical",
  website: "https://www.coopersurgical.com/",
};

const SUMMARY =
  "Senior software engineer building distributed systems from consumer scale to regulated medical devices. At Shopee, built real-time multiplayer game services sustaining 10,000+ peak RPS and 200,000+ daily players, with scheduled Locust load testing, and let 5 international teams redeploy on GCP without hard-coded configurations. At CooperSurgical, cut RFID data-transition time by 90% with caching and gRPC streaming, designed device observability from Envoy traffic logs and spans to error traces, and led a team of 5.";

// Planning projects stay hidden until they advance; /about filters on `stage`.
const PROJECTS: TProject[] = [
  {
    title: "Jin Yu Zhang's Website",
    stage: "Production",
    href: "https://github.com/SiegeSailor/website",
    description:
      "This site — a statically exported *Next.js* application served from *AWS S3* behind *CloudFront*, with markdown-driven posts, in-site search, and a single-source résumé build system. Built with *TailwindCSS*, *HeroUI*, the *UnifiedJS* ecosystem, *Mermaid*, and *Zustand*.",
  },
  {
    title: "Terminal Sigma",
    stage: "Production",
    href: "https://github.com/SiegeSailor/terminal-sigma",
    description:
      "Available on `npm` and as a desktop app, a *TypeScript* terminal dashboard that gives game-style feedback on self-development: a pixel-art character levels up alongside a Pomodoro timer, diet and workout trackers, and everyday quotes, in English and Traditional Chinese. Built with *React*, *Ink*, *Zod*, *Electron*, and *xterm.js*.",
  },
  {
    title: "Smarty Notebook Collection",
    stage: "Production",
    href: "https://github.com/SiegeSailor/notebook-smarty",
    description:
      "A collection of self-contained *Jupyter* notebooks that run batch requests against the **Smarty** Cloud API, such as fetching U.S. ZIP+4 codes by address. Built with *Python*, *pandas*, *Requests*, and *Poetry*.",
  },
  {
    title: "Bulls and Cows Bot",
    stage: "Production",
    href: "https://github.com/SiegeSailor/game-bulls-and-cows",
    description:
      "A chat bot that plays Bulls and Cows, the number-guessing game, with `set`, `guess`, `status`, `clear`, and `help` commands and replies in Traditional Chinese, built for *Azure App Service* and **Skype**. Built with *Node.js* and the **Microsoft Bot Framework** SDK.",
  },
  {
    title: "Cryptography CLI",
    stage: "Development",
    href: "https://github.com/SiegeSailor/library-cryptography",
    description:
      "Available on `npm`, a *TypeScript* package with *WebAssembly* enabled that provides a collection of cryptography functions and a command-line tool with interactive prompts to demonstrate key encryption flows and algorithms.",
  },
];

const HEADINGS = {
  summary: "Summary",
  projects: "Projects",
  media: "Links",
} as const;

// Total professional experience is computed against today, never stated, so it
// cannot go stale. Excluded intervals are subtracted.
const TIMELINE = {
  start: "2016-06-01",
  excluded: [
    { label: "Military Service", start: "2017-01-01", end: "2017-06-30" },
    { label: "Career Gap", start: "2022-06-01", end: "2024-01-31" },
  ],
};

const MILLISECOND_ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

function getExperienceYears(): string {
  const total = Date.now() - new Date(TIMELINE.start).getTime();
  const skipped = TIMELINE.excluded.reduce(
    (sum, period) =>
      sum + (new Date(period.end).getTime() - new Date(period.start).getTime()),
    0,
  );
  const [year, month] = ((total - skipped) / MILLISECOND_ONE_YEAR)
    .toFixed(1)
    .split(".");
  const monthFloor = Math.floor((Number(month) / 10) * 12);
  return `${year} Years ${month === "0" ? "" : `${monthFloor} Months`}`.trim();
}

// Site-wide chrome and metadata: the header, footer, and every route's <head>.
export async function getSite() {
  return {
    identity: IDENTITY,
    site: SITE,
    media: MEDIA,
    routes: ROUTE_TITLES,
    titleOf: (path: string) =>
      ROUTE_TITLES.find((route) => route.path === path)?.title ?? "",
  };
}

export async function getHome() {
  return { profile: PROFILE, company: COMPANY };
}

export async function getAbout() {
  return {
    profile: PROFILE,
    summary: SUMMARY,
    projects: PROJECTS,
    media: MEDIA,
    experienceYears: getExperienceYears(),
    headings: HEADINGS,
  };
}

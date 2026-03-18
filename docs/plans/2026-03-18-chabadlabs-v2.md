# ChabadLabs.ai v2 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform ChabadLabs.ai from a resource directory into a three-pillar platform (Get / Learn / Fund) with Tools, Live Projects showcase, Fund page, and an AI chat assistant.

**Architecture:** Extend the existing React SPA. Add new pages/routes using the same Wouter router, shadcn/ui components, and GSAP animation patterns. Data stays in static JSON for now. No backend changes in this phase — all new features are frontend-only with placeholder data where needed. Auth is fully deferred (no Sign In button in MVP).

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, GSAP 3.14, Framer Motion, Wouter, Lucide icons. All existing — no new dependencies.

**Data source:** Tools data comes from `C:\Users\Mendy Shishler\Downloads\ai_for_shlichus_tagged.xlsx` — a curated spreadsheet with 4 sheets: "Start Here" (13 beginner tools), "Clean Master List" (62 tools with Name/Type/Tags/Description/Best for/User level/Link), "Jargon & Models" (52 AI terms), "Link Archive" (278 raw links). Categories from spreadsheet: AI Assistants, Audio & Transcription, Coding & Apps, Design & Media, General, Jewish & Shlichus, Productivity, Research & Search, Video & Media.

**Design rules:**
- PRESERVE the entire existing design language: dark futuristic aesthetic, GSAP animations, scanline effects, glassmorphic panels, gradient glows, gold (#C49A2A) accents, Plus Jakarta Sans / Manrope / JetBrains Mono fonts
- Do NOT redesign anything — only extend with new pages using the same patterns
- Do NOT add emojis to the UI

---

## Phase 1: Navigation & Global Changes (Tasks 1–3)

### Task 1: Update Navigation Structure

**Files:**
- Modify: `artifacts/chabadlabs/src/components/navbar.tsx`

**Context:** Current nav has: Resources | Webinars | Get Started | [Support]. We need: Tools | Learn (dropdown) | Live Projects | Get Started | [Support]. "Learn" is a dropdown with sub-items. No "Sign In" button in MVP.

**Step 1: Update nav links array**

Replace the current navigation items with:

```typescript
const navItems = [
  { label: "Tools", href: "/tools" },
  {
    label: "Learn",
    children: [
      { label: "Webinars", href: "/webinars" },
      { label: "Getting Started", href: "/get-started" },
    ]
  },
  { label: "Live Projects", href: "/showcase" },
  { label: "Fund", href: "/fund" },
];
```

**Step 2: Add dropdown behavior for "Learn"**

Desktop: On hover, show a small dropdown panel with sub-links. Use the same dark glassmorphic styling (`glass-panel` class, `bg-card/80 backdrop-blur-md border border-border`) as other UI elements. Position absolutely below the "Learn" text. Close on mouse leave.

Mobile: In the hamburger menu overlay, "Learn" renders as a section header with its children indented below it (no separate dropdown — just inline expansion). Tapping "Learn" toggles show/hide of the sub-items.

**Step 3: Verify navigation works**

Run: `cd artifacts/chabadlabs && npx vite --host`
Expected: Nav shows Tools | Learn (dropdown) | Live Projects | Fund | Get Started | Support
Test: Hover over "Learn" on desktop — dropdown appears with Webinars and Getting Started links.
Test: Open hamburger menu on mobile (< 768px) — "Learn" shows with indented sub-items.

**Step 4: Commit**

```bash
git add artifacts/chabadlabs/src/components/navbar.tsx
git commit -m "feat: update nav to Tools | Learn | Live Projects | Fund | Get Started"
```

---

### Task 2: Update Routes in App.tsx

**Files:**
- Modify: `artifacts/chabadlabs/src/App.tsx`

**Context:** Add new routes and redirect old `/resources` to `/tools`. IMPORTANT: Wouter does NOT have a `<Redirect>` component like React Router. Use a small redirect component with `useLocation`.

**Step 1: Create redirect helper and update router**

```typescript
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import Tools from "./pages/tools";
import Showcase from "./pages/showcase";
import Fund from "./pages/fund";
import GrantApply from "./pages/grant-apply";
import SkillsComingSoon from "./pages/skills-coming-soon";

// Redirect component for Wouter (no built-in Redirect)
function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(to, { replace: true }); }, []);
  return null;
}

// In the Switch:
<Route path="/" component={Home} />
<Route path="/tools" component={Tools} />
<Route path="/resources"><RedirectTo to="/tools" /></Route>
<Route path="/webinars" component={Webinars} />
<Route path="/get-started" component={GetStarted} />
<Route path="/showcase" component={Showcase} />
<Route path="/showcase/apply" component={GrantApply} />
<Route path="/fund" component={Fund} />
<Route path="/skills" component={SkillsComingSoon} />
<Route component={NotFound} />
```

**Step 2: Create placeholder page files**

Create empty placeholder components for `/tools`, `/showcase`, `/fund`, `/showcase/apply`, and `/skills` that just render the page title so routes don't break. These will be filled in later tasks.

**Step 3: Verify routes work**

Run dev server, navigate to each route.
Expected: All routes render without errors. `/resources` redirects to `/tools`.

**Step 4: Commit**

```bash
git add artifacts/chabadlabs/src/App.tsx artifacts/chabadlabs/src/pages/tools.tsx artifacts/chabadlabs/src/pages/showcase.tsx artifacts/chabadlabs/src/pages/fund.tsx artifacts/chabadlabs/src/pages/grant-apply.tsx artifacts/chabadlabs/src/pages/skills-coming-soon.tsx
git commit -m "feat: add new routes for tools, showcase, fund, grant, and skills pages"
```

---

### Task 3: Remove Gold Floating Line & Update Home Page

**Files:**
- Modify: `artifacts/chabadlabs/src/pages/home.tsx`
- Modify: `artifacts/chabadlabs/src/index.css` (if the gold line is defined there)

**Context:** User wants the decorative gold line that floats down the page removed. Also update the bento grid cards and stats to reflect the new structure.

**Step 1: Find and remove the gold floating line**

Search for the animated vertical gold line element in `home.tsx` and/or `index.css`. It's likely a `<div>` with gold/primary background color and GSAP scroll animation. Remove the element and its associated GSAP animation code entirely.

**Step 2: Update bento grid cards**

Replace current bento cards with:

| Card | Label | Description | Links to |
|------|-------|-------------|----------|
| Large | Tools & Resources | "Curated AI tools for your shlichus" | `/tools` |
| Medium | Webinars | "Watch, learn, build with the community" | `/webinars` |
| Medium | AI Assistant | "Ask anything about AI for Chabad" | Opens chat widget |
| Wide | Live Projects | "See what shluchim are building" | `/showcase` |

Keep exact same card styling, GSAP scroll animations, and glassmorphic design.

**Step 3: Update stats bar**

Change to 3 stats (remove the fourth). The webinar count should be dynamic, pulled from the webinars data length:

```
265+ Curated Tools  |  700+ Community Members  |  {webinars.length} Webinars & Counting
```

Import the webinars data and use `webinars.length` for the count so it auto-updates when webinars are added.

**Step 4: Update CTA section**

"Join the Community" button should link to WhatsApp group URL (placeholder `#` for now — ask user for URL before deploy).

**Step 5: Verify visually**

Run dev server, confirm gold line is gone, cards point to correct routes, stats show 3 items with dynamic webinar count.

**Step 6: Commit**

```bash
git add artifacts/chabadlabs/src/pages/home.tsx artifacts/chabadlabs/src/index.css
git commit -m "feat: update home page - remove gold line, new bento cards, 3 dynamic stats"
```

---

## Phase 2: Tools Page (Tasks 4–6)

### Task 4: Rename Resources Page to Tools

**Files:**
- Rename: `artifacts/chabadlabs/src/pages/resources.tsx` → `artifacts/chabadlabs/src/pages/tools.tsx`
- Modify: `artifacts/chabadlabs/src/pages/tools.tsx`

**Context:** The Resources page becomes the Tools page. Same functionality, updated labels.

**Step 1: Rename file and update component name**

Rename `resources.tsx` to `tools.tsx`. Update the component export name from `Resources` to `Tools`.

**Step 2: Update page labels**

- Section label: `"001 — TOOLS"`
- Title: `"Tools"`
- Subtitle: "Curated AI tools and resources for shluchim"

**Step 3: Add "Agents" category tab**

Add "Agents" to the category filter buttons. For now, no resources have this category — it shows an empty state: "Agentic tools coming soon. Know one? Let us know."

**Step 4: Verify**

Run dev server, navigate to `/tools`. Filters, search, pagination all still work.

**Step 5: Commit**

```bash
git add artifacts/chabadlabs/src/pages/tools.tsx
git commit -m "feat: rename resources page to tools, add agents category"
```

---

### Task 5: Add Nanoclaw Featured Section to Tools

**Files:**
- Modify: `artifacts/chabadlabs/src/pages/tools.tsx`

**Context:** Add a featured/hero section at the top of the Tools page highlighting Nanoclaw.

**Step 1: Create featured section**

Above the search/filter area, add a wide card with glassmorphic styling:

```
┌──────────────────────────────────────────────────────┐
│  FEATURED                                            │
│                                                      │
│  Nanoclaw — Secure AI Agent Framework                │
│  Deploy your own AI agents with enterprise-grade     │
│  security. Preconfigured packages for shluchim.      │
│                                                      │
│  [Learn More]             [Set Up Your Own]          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- "Learn More" links to `https://nanoclaw.dev/`
- "Set Up Your Own" links to `/get-started`
- Use the same `card-futuristic` and `glass-panel` classes
- Animate in with GSAP on scroll

**Step 2: Verify**

Confirm the featured section renders above the filter bar.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/pages/tools.tsx
git commit -m "feat: add nanoclaw featured section to tools page"
```

---

### Task 6: Replace Tools Data with Curated Spreadsheet

**Files:**
- Modify: `artifacts/chabadlabs/src/data/resources.json`

**Context:** Replace the existing 265-item auto-extracted resources.json with clean data from the user's curated spreadsheet at `C:\Users\Mendy Shishler\Downloads\ai_for_shlichus_tagged.xlsx`. Use the "Clean Master List" sheet (62 tools) as the primary source, supplemented by "Start Here" (13 beginner picks with extra guidance fields).

**Step 1: Convert spreadsheet to JSON**

Write a Python script to read the xlsx and output JSON. Map spreadsheet columns to the existing JSON schema:

```
Spreadsheet column  →  JSON field
Name                →  title
Type                →  type
Tags                →  category (use first tag as primary category)
What it is          →  description
Best for            →  bestFor (new field)
User level          →  userLevel (new field)
Link                →  url
```

Keep `id` as auto-incremented. Set `mentionCount` and `timesShared` to 0 for new entries.

For items from "Start Here" sheet, add a `starterPick: true` field and include the `plainEnglishAdvice` field.

**Step 2: Update category filter to match spreadsheet categories**

The spreadsheet uses these categories (update filter buttons to match):
- `AI Assistants`
- `Audio & Transcription`
- `Coding & Apps`
- `Design & Media`
- `General`
- `Jewish & Shlichus`
- `Productivity`
- `Research & Search`
- `Video & Media`
- `Agents` (empty for now)

Note: Some tools have multiple comma-separated tags. Use the first tag as the primary category for filtering, but store all tags.

**Step 3: Verify**

Run dev server, navigate to `/tools`. Confirm all tools render, categories filter correctly, search works.

**Step 4: Commit**

```bash
git add artifacts/chabadlabs/src/data/resources.json
git commit -m "feat: replace auto-extracted tools with curated spreadsheet data (62 tools)"
```

---

## Phase 3: Live Projects / Showcase Page (Tasks 7–9)

### Task 7: Create Showcase Page — Layout & Data

**Files:**
- Create: `artifacts/chabadlabs/src/pages/showcase.tsx`
- Create: `artifacts/chabadlabs/src/data/projects.json`

**Context:** New page showing shluchim projects with upvoting. Uses same design language as other pages. Uses REAL projects, not fake placeholder data.

**Step 1: Create project data file**

```json
[
  {
    "id": 1,
    "title": "Megillah.app",
    "builder": "Mendy Elishevitz",
    "description": "A digital Megillah reading experience — follow along, learn, and engage with the Megillah like never before.",
    "imageUrl": "/projects/megillah.svg",
    "projectUrl": "https://megillah.app",
    "upvotes": 0,
    "featured": true,
    "tags": ["jewish", "education", "web-app"],
    "createdAt": "2026-01-15"
  },
  {
    "id": 2,
    "title": "Mikdash.live",
    "builder": "Mendy Elishevitz",
    "description": "An interactive experience bringing the Beis HaMikdash to life with modern technology.",
    "imageUrl": "/projects/mikdash.svg",
    "projectUrl": "https://mikdash.live",
    "upvotes": 0,
    "featured": true,
    "tags": ["jewish", "education", "immersive"],
    "createdAt": "2026-02-01"
  },
  {
    "id": 3,
    "title": "Moshiach.com",
    "builder": "Mendy Elishevitz",
    "description": "The central hub for everything about Moshiach — teachings, resources, and inspiration.",
    "imageUrl": "/projects/moshiach.svg",
    "projectUrl": "https://moshiach.com",
    "upvotes": 0,
    "featured": true,
    "tags": ["jewish", "education", "content"],
    "createdAt": "2026-02-20"
  }
]
```

NOTE: Upvotes start at 0 (real counts). More projects will be added as the community submits them.

**Step 2: Commit**

```bash
git add artifacts/chabadlabs/src/data/projects.json
git commit -m "feat: add real project data for showcase (Megillah, Mikdash, Moshiach)"
```

---

### Task 8: Build Showcase Page — Leaderboard & Gallery

**Files:**
- Modify: `artifacts/chabadlabs/src/pages/showcase.tsx`

**Context:** Build the full showcase page with leaderboard at top and card gallery below.

**Step 1: Page structure**

```
Section Label: "001 — LIVE PROJECTS"
Title: "Live Projects"
Subtitle: "See what shluchim are building with AI"

┌─────────────────────────────────────────────────────┐
│  LEADERBOARD                                         │
│                                                      │
│  #1  Megillah.app — Mendy Elishevitz        ▲ 0     │
│  #2  Mikdash.live — Mendy Elishevitz        ▲ 0     │
│  #3  Moshiach.com — Mendy Elishevitz        ▲ 0     │
└─────────────────────────────────────────────────────┘

Sort: [Most Voted] [Newest]

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Megillah │  │ Mikdash  │  │ Moshiach │
│ .app     │  │ .live    │  │ .com     │
│          │  │          │  │          │
│ ▲ 0      │  │ ▲ 0      │  │ ▲ 0      │
└──────────┘  └──────────┘  └──────────┘

[Submit Your Project]    [Apply for a Grant]
```

**Step 2: Leaderboard component**

- Top 3 projects sorted by upvotes (ties broken by createdAt newest first)
- Glassmorphic panel with gold accent border on #1
- Each row: rank number, project name, builder name, upvote count
- GSAP fade-in animation

**Step 3: Project cards**

- Same card style as tools page (glassmorphic, hover glow)
- Shows: project title, builder name, description (truncated), tags as badges, upvote count
- Upvote button (▲) — clicking increments count locally, stored in localStorage to prevent repeat votes per device. Known limitation: counts are per-device and gameable. Real voting deferred to backend phase.
- "View Project" link opens external URL in new tab
- Sort toggle: "Most Voted" (default) | "Newest" (fallback by createdAt)

**Step 4: CTA buttons at bottom**

- "Submit Your Project" — placeholder, shows toast: "Project submissions opening soon! Join the WhatsApp community to stay updated."
- "Apply for a Grant" — links to `/showcase/apply`

**Step 5: Verify**

Run dev server, navigate to `/showcase`. Confirm leaderboard shows top 3, gallery shows all, sorting works, upvote increments and persists in localStorage.

**Step 6: Commit**

```bash
git add artifacts/chabadlabs/src/pages/showcase.tsx
git commit -m "feat: build showcase page with leaderboard and project gallery"
```

---

### Task 9: Grant Application Page

**Files:**
- Create: `artifacts/chabadlabs/src/pages/grant-apply.tsx`
- Modify: `artifacts/chabadlabs/src/App.tsx` (add route if not already added in Task 2)

**Context:** Simple form page for grant applications. Uses shadcn/ui form components. Placeholder — no backend processing yet.

**Step 1: Create the page**

```
Section Label: "001 — GRANT PROGRAM"
Title: "Apply for a Grant"
Subtitle: "ChabadLabs supports builders. Tell us about your project."

┌─────────────────────────────────────────┐
│  Your Name                              │
│  [________________________]             │
│                                         │
│  Your Chabad House / City               │
│  [________________________]             │
│                                         │
│  Project Name                           │
│  [________________________]             │
│                                         │
│  What have you built so far?            │
│  [________________________]             │
│  [________________________]             │
│                                         │
│  What would funding help you do?        │
│  [________________________]             │
│  [________________________]             │
│                                         │
│  Contact Email                          │
│  [________________________]             │
│                                         │
│  [Submit Application]                   │
└─────────────────────────────────────────┘
```

- Use shadcn `Form`, `Input`, `Textarea`, `Button`
- On submit: show a toast: "Thanks for your interest! Grant applications will open soon. We'll reach out when ready." This is honest — it doesn't pretend to have received anything.
- Style matches site: glassmorphic form panel, gold submit button

**Step 2: Verify**

Navigate to `/showcase/apply`, fill form, submit. Toast appears.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/pages/grant-apply.tsx
git commit -m "feat: add grant application page (placeholder)"
```

---

## Phase 4: Fund Page & Skills Placeholder (Tasks 10–11)

### Task 10: Create Fund Page

**Files:**
- Create: `artifacts/chabadlabs/src/pages/fund.tsx`

**Context:** The "Fund" pillar needs its own page. This brings together: tip jar (link to external donation page), grant program overview, and partner/donor information. No real payment processing — links to external pages.

**Step 1: Page structure**

```
Section Label: "001 — FUND THE FUTURE"
Title: "Fund"
Subtitle: "Support AI innovation in Chabad"

┌─────────────────────────────────────────────────────┐
│  SUPPORT THE TEAM                                    │
│                                                      │
│  ChabadLabs is built by volunteers. Your tips keep   │
│  the servers running and the tools free.              │
│                                                      │
│  [Tip the Team →]  (links to external donation page) │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  GRANTS FOR BUILDERS                                 │
│                                                      │
│  We fund shluchim who build. If you have a working   │
│  project or a solid idea, apply for a grant.          │
│                                                      │
│  [Apply for a Grant →]  (links to /showcase/apply)   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  BECOME A PARTNER                                    │
│                                                      │
│  Donors and organizations who want to accelerate     │
│  AI adoption across Chabad — let's talk.             │
│                                                      │
│  [Get in Touch →]  (mailto: placeholder)             │
└─────────────────────────────────────────────────────┘
```

- Three glassmorphic cards, vertically stacked
- GSAP scroll-triggered stagger animation
- "Tip the Team" links to external donation URL (placeholder `#` — ask user for URL before deploy)
- Same design language as rest of site

**Step 2: Verify**

Navigate to `/fund`. All three sections render with correct links.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/pages/fund.tsx
git commit -m "feat: add fund page with tip jar, grants, and partner sections"
```

---

### Task 11: Create Skills Marketplace "Coming Soon" Page

**Files:**
- Create: `artifacts/chabadlabs/src/pages/skills-coming-soon.tsx`

**Context:** Skills Marketplace is deferred but should not 404. Create a minimal "coming soon" page so any references to /skills land gracefully.

**Step 1: Create the page**

```
Section Label: "001 — SKILLS MARKETPLACE"
Title: "Skills Marketplace"
Subtitle: "Browse, install, and share community-built AI skills"

┌─────────────────────────────────────────────────────┐
│                                                      │
│  Coming Soon                                         │
│                                                      │
│  We're building a marketplace where shluchim can     │
│  share and install AI skills — Claude Code skills,   │
│  agent configurations, and automation recipes.        │
│                                                      │
│  [Join the Community →]  (WhatsApp link)             │
│  to be the first to know.                            │
│                                                      │
└─────────────────────────────────────────────────────┘
```

- Single glassmorphic card, centered
- Minimal design, same styling
- "Coming Soon" badge in gold

**Step 2: Verify**

Navigate to `/skills`. Page renders without error.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/pages/skills-coming-soon.tsx
git commit -m "feat: add skills marketplace coming soon placeholder"
```

---

## Phase 5: AI Chat Widget Upgrade (Tasks 12–13)

### Task 12: Redesign Chat Widget UI

**Files:**
- Modify: `artifacts/chabadlabs/src/components/chat-widget.tsx`

**Context:** The chat widget currently has hardcoded responses. Upgrade the UI to feel like a real AI assistant. Keep it as a mock for now — real API integration comes later when Nanoclaw is connected.

**Step 1: Improve the chat panel**

- Larger panel (400px wide, 500px tall on desktop)
- Better message styling: user messages right-aligned (gold-tinted), AI messages left-aligned (glass panel)
- Typing indicator animation (three bouncing dots)
- "Powered by ChabadLabs AI" footer text
- Input area: text input + send button with gold accent

**Step 2: Improve mock responses**

Replace hardcoded responses with a keyword-matching system using `.includes()` (NOT exact key matching):

```typescript
const mockResponses = [
  { keywords: ["nanoclaw"], response: "Nanoclaw is a secure AI agent framework built for shluchim. Check out nanoclaw.dev or our Get Started page to deploy your own." },
  { keywords: ["tool", "resource"], response: "We have 60+ curated AI tools on our Tools page — from ChatGPT to design tools to Jewish-specific resources." },
  { keywords: ["webinar", "watch", "learn"], response: "Check out our Webinar Archive for recorded sessions on AI basics, tools deep dives, and Nanoclaw deployment." },
  { keywords: ["grant", "fund", "money", "support"], response: "Visit our Fund page to learn about grants for builders, or tip the team to keep ChabadLabs free." },
  { keywords: ["start", "begin", "new", "how"], response: "Head to our Get Started page for a step-by-step guide — from choosing your first AI tool to deploying your own agent." },
  { keywords: ["project", "built", "showcase"], response: "Check out Live Projects to see what shluchim are building — and submit your own project!" },
  { keywords: ["skill", "marketplace"], response: "The Skills Marketplace is coming soon! You'll be able to browse, install, and share community-built AI skills." },
];

// Match: loop through mockResponses, check if input.toLowerCase().includes(keyword) for any keyword
// Fallback: "Great question! I'm still learning. For now, check our Tools page or join the WhatsApp community for help from fellow shluchim."
```

**Step 3: Add welcome message**

On open, show: "Hey! I'm the ChabadLabs assistant. Ask me about AI tools, Nanoclaw, or how to get started. I'm still in beta — for complex questions, our WhatsApp community is the best resource."

**Step 4: Verify**

Open chat widget, test these inputs:
- "how do I use nanoclaw" → should match "nanoclaw" keyword
- "what tools do you have" → should match "tool" keyword
- "random gibberish" → should show fallback
Confirm UI looks polished with typing indicator.

**Step 5: Commit**

```bash
git add artifacts/chabadlabs/src/components/chat-widget.tsx
git commit -m "feat: redesign chat widget with improved UI and keyword-based mock responses"
```

---

### Task 13: Chat Widget — Conversation Memory & UX Polish

**Files:**
- Modify: `artifacts/chabadlabs/src/components/chat-widget.tsx`

**Context:** Add session persistence and UX improvements.

**Step 1: Persist chat in sessionStorage**

Save/restore message history so refreshing the page doesn't lose the conversation.

**Step 2: Add suggested prompts**

When chat is empty (just the welcome message), show 3-4 clickable prompt chips:
- "What is Nanoclaw?"
- "Show me AI tools"
- "How do I get started?"
- "What grants are available?"

Clicking a chip sends it as a message.

**Step 3: Add "Clear chat" button**

Small button in the chat header to reset conversation.

**Step 4: Verify**

Test persistence across page navigations, prompt chips, clear functionality.

**Step 5: Commit**

```bash
git add artifacts/chabadlabs/src/components/chat-widget.tsx
git commit -m "feat: add chat persistence, suggested prompts, and clear button"
```

---

## Phase 6: Footer, SEO & Polish (Tasks 14–18)

### Task 14: Update Footer

**Files:**
- Modify: `artifacts/chabadlabs/src/components/footer.tsx`

**Context:** Update footer links to match new navigation structure.

**Step 1: Update link columns**

```
ChabadLabs                    Navigate                    Community
AI for Shluchim              > Tools                     > WhatsApp Group
[SECURE] [SANDBOXED]         > Webinars                  > Submit a Project
                             > Live Projects              > Apply for a Grant
                             > Get Started                > Fund
```

**Step 2: Update "Join the Community" CTA**

Link to WhatsApp group instead of GitHub.

**Step 3: Verify**

Check all footer links point to correct routes.

**Step 4: Commit**

```bash
git add artifacts/chabadlabs/src/components/footer.tsx
git commit -m "feat: update footer with new nav structure and community links"
```

---

### Task 15: Update Support Button

**Files:**
- Modify: `artifacts/chabadlabs/src/components/navbar.tsx`

**Context:** The Support button currently links to Ko-fi. Update to link to the user's external donation/tip page (URL TBD — use placeholder for now). No Sign In button.

**Step 1: Update Support link**

Change the Ko-fi URL to the external donation page URL (placeholder `#` for now). Keep the gold outlined button style with heart icon.

**Step 2: Verify**

Nav shows: Tools | Learn | Live Projects | Fund | Get Started | [Support]

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/components/navbar.tsx
git commit -m "feat: update support button link"
```

---

### Task 16: Add SEO & Meta Tags

**Files:**
- Modify: `artifacts/chabadlabs/index.html`
- Modify: `artifacts/chabadlabs/public/` (add OG image if needed)

**Context:** For a site shown to donors, proper meta tags matter. Add title, description, OpenGraph tags, and verify favicon exists.

**Step 1: Update index.html head**

```html
<title>ChabadLabs.ai — AI Tools for Shluchim</title>
<meta name="description" content="The platform where shluchim get AI tools, learn how to use them, and fund each other's projects." />

<!-- OpenGraph -->
<meta property="og:title" content="ChabadLabs.ai — AI Tools for Shluchim" />
<meta property="og:description" content="Get AI tools. Learn to use them. Fund builders." />
<meta property="og:image" content="/opengraph.jpg" />
<meta property="og:url" content="https://chabadlabs.ai" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="ChabadLabs.ai — AI Tools for Shluchim" />
<meta name="twitter:description" content="Get AI tools. Learn to use them. Fund builders." />
<meta name="twitter:image" content="/opengraph.jpg" />
```

**Step 2: Verify existing assets**

Confirm `favicon.svg` and `opengraph.jpg` exist in `public/`. If `opengraph.jpg` doesn't exist or is generic, note it as a TODO for the user.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/index.html
git commit -m "feat: add SEO meta tags and OpenGraph for social sharing"
```

---

### Task 17: Update 404 Page

**Files:**
- Modify: `artifacts/chabadlabs/src/pages/not-found.tsx`

**Context:** The 404 page should match the new nav structure and help visitors find what they're looking for.

**Step 1: Update NotFound component**

- Keep same dark design
- Add helpful links: "Try these instead:" with links to Tools, Live Projects, Get Started
- Keep the SectionLabel component style consistent

**Step 2: Verify**

Navigate to `/nonexistent-page`. 404 page renders with correct links.

**Step 3: Commit**

```bash
git add artifacts/chabadlabs/src/pages/not-found.tsx
git commit -m "feat: update 404 page with helpful navigation links"
```

---

### Task 18: Responsive & Animation Polish + Final Review

**Files:**
- Modify: Multiple page and component files

**Context:** Ensure all new pages look great on mobile and have consistent GSAP animations. Final pass before deploy.

**Step 1: Mobile test all new pages**

- Showcase page: cards stack single-column, leaderboard full-width
- Grant form: full-width inputs
- Fund page: cards stack vertically (already vertical, but check spacing)
- Skills coming soon: centered card adjusts width
- Chat widget: full-screen on mobile
- Nav dropdown: works correctly in hamburger menu (Learn sub-items indented)

**Step 2: Add GSAP scroll animations to new pages**

Apply the same scroll-triggered reveal pattern used on Home and Get Started:
- Showcase: leaderboard fades in, then cards stagger in
- Fund: three cards stagger in from bottom
- Grant form: form panel slides up
- Skills: card fades in

**Step 3: Link audit**

Verify every internal link works:
- `/tools`, `/webinars`, `/showcase`, `/showcase/apply`, `/get-started`, `/fund`, `/skills`
- Footer links, nav links, bento card links, CTA buttons

Verify external links work:
- Nanoclaw (https://nanoclaw.dev/)
- Project URLs (https://megillah.app, https://mikdash.live, https://moshiach.com)

**Step 4: Remove dead code**

- Delete old `resources.tsx` if not already removed
- Remove any unused imports
- Clean up any leftover references to old routes

**Step 5: Build for production**

Run: `cd artifacts/chabadlabs && npx vite build`
Expected: Build succeeds with no errors.

**Step 6: Verify on mobile**

Use browser dev tools to test 375px (iPhone), 768px (tablet), 1280px (desktop).

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: responsive polish, animations, link audit, and production build"
```

**Step 8: Deploy to Replit**

Upload the updated files to Replit (drag & drop or git push if connected by then).

---

## Summary

| Phase | Tasks | What it delivers |
|-------|-------|-----------------|
| 1. Nav & Global | 1–3 | New navigation with Learn dropdown, updated home page, gold line removed, 3 dynamic stats |
| 2. Tools | 4–6 | Renamed page, Nanoclaw featured section, curated spreadsheet data (62 tools), Agents category |
| 3. Showcase | 7–9 | Live Projects with real data (Megillah/Mikdash/Moshiach), leaderboard, upvoting, grant form |
| 4. Fund & Skills | 10–11 | Dedicated Fund page (tip/grants/partners), Skills Marketplace coming soon placeholder |
| 5. Chat | 12–13 | Upgraded chat widget, `.includes()` keyword matching, prompt chips, session persistence |
| 6. Polish & SEO | 14–18 | Updated footer, support link, SEO meta tags, 404 page, responsive polish, production build |

**Total:** 18 tasks across 6 phases.

**URLs needed from user before deploy:**
- WhatsApp community group link
- External donation/tip page URL
- Contact email for "Become a Partner" on Fund page

---

## Deferred (Not in this plan)

- ChabadOne authentication integration
- Real AI chat (Nanoclaw-powered assistant with WhatsApp knowledge base)
- Backend API for upvotes, project submissions, grant applications
- Admin panel for content management
- Skills Marketplace full build (browse, install, share skills)
- Real payment processing for donations/tips

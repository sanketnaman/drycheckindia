# DryCheck India (https://drycheck.in) 🇮🇳

> **"Aaj sookha hai ya nahi, ek nazar mein."**

A fast, mobile-first, and production-ready Next.js application that tells visitors instantly whether today (and tomorrow) is a dry day across Indian states and union territories, with real-time Indian Standard Time (Asia/Kolkata) calculations, authentic gazette-backed data, and a witty, culturally grounded tone.

---

## 🚀 Key Features

- **Strict Asia/Kolkata (IST) Timezone:** All "today" and "tomorrow" queries evaluate dynamically in `Asia/Kolkata (UTC+5:30)` with hourly ISR (`revalidate = 3600`) ensuring proper midnight rollover regardless of where the server is hosted.
- **Mobile-First UX (Above-the-Fold at 360x640):** The primary question (*"Is today a dry day?"*), big answer (*"Yes"*, *"No"*, or *"Maybe"* >= 96px), and secondary witty line (>= 20px) are engineered to be 100% visible on a 360x640 mobile screen without scrolling. Top date ("20 October, Tuesday") and menu buttons feature accessible min-44px tap targets.
- **Instant Searchable State Input:** Typing substrings on mobile (e.g., `"bih"` immediately yields Bihar) enables fast navigation without wading through long dropdowns.
- **Authentic Sourced Data (No Invented Facts):**
  - All 36 Indian states and union territories covered with individual slugs matching `/india/[state-slug]`.
  - Gazette-backed sources for confirmed entries; pending entries clearly display as **"Maybe"** with note *"Official confirmation awaited."*
  - Display of `"Last verified: [date]"` per state.
  - Internal links to 5 nearby/popular states on each state page.
  - Full awareness of statutory prohibition states (Bihar, Gujarat, Nagaland, Mizoram, Lakshadweep).
- **Deterministic Witty Copy:**
  - 8+ fresh variants under 6 words with light Hinglish flavor for `(And so is tomorrow)`, `(But tomorrow is)`, and `(Tomorrow's a maybe)`.
  - 6 fresh, punchy, original footer quips selected deterministically by date.
- **Date Routes (`/dry-days/[date]`):** Deep-linking for specific dates (e.g., `/dry-days/2-october-2026`) listing all states observing restrictions on that date.
- **Advanced SEO & Rich Snippets:**
  - Canonical URL `https://drycheck.in` on every page with unique titles, meta descriptions, OpenGraph, and Twitter Cards.
  - Schema.org structured data: `WebSite` on home, `FAQPage` on state pages, `BreadcrumbList` on state and date routes.
  - Dynamic `/sitemap.ts` and `/robots.ts`.
- **Compliant Ad Placeholders:** `<AdSlot id="..." />` component dormant by default and safely toggled via `NEXT_PUBLIC_ADS_ENABLED="true"`. Zero alcohol affiliate or promotional links.

---

## 📂 File Tree

```text
├── .env.example                          # Canonical environment variables
├── .eslintrc.json                        # ESLint rules
├── .gitignore
├── README.md                             # Documentation & setup guide
├── app/
│   ├── layout.tsx                        # Root layout, metadataBase (https://drycheck.in)
│   ├── globals.css                       # Global dark styling & custom scrollbars
│   ├── page.tsx                          # Homepage with big answer, today/tomorrow lists & directory
│   ├── sitemap.ts                        # Dynamic sitemap (states, dates, static pages)
│   ├── robots.ts                         # Robots.txt crawler directives
│   ├── about/
│   │   └── page.tsx                      # Excise regulations, constitutional context & FAQ
│   ├── contact/
│   │   └── page.tsx                      # Gazette tip/correction submission form
│   ├── privacy-policy/
│   │   └── page.tsx                      # Strict zero-tracking privacy policy
│   ├── terms/
│   │   └── page.tsx                      # Regulatory disclaimers and terms of service
│   ├── india/
│   │   └── [state-slug]/
│   │       └── page.tsx                  # State page with 30-day list, 12-month accordion & nearby links
│   └── dry-days/
│       └── [date]/
│           └── page.tsx                  # Date-specific page listing all affected states
├── components/
│   ├── Navbar.tsx                        # Header with DryCheck India branding & searchable state modal
│   ├── Footer.tsx                        # Daily deterministic verse, regulatory disclaimer & links
│   ├── HeroAnswer.tsx                    # Above-the-fold high-contrast status banner (>=96px text)
│   ├── DryStateList.tsx                  # "Dry today in" & "Dry tomorrow in" state cards
│   ├── UpcomingDryDays.tsx               # 4-week upcoming calendar grouped by date
│   ├── StateDirectory.tsx                # Searchable input and regional filter chips
│   ├── StateCalendar.tsx                 # 12-month collapsible month-by-month calendar
│   ├── AdSlot.tsx                        # Safe ad slot placeholder (env flag toggled)
│   └── JsonLd.tsx                        # Schema.org structured data renderer
├── data/
│   └── dry-days.json                     # Verified database of 36 states, nearby links & gazette records
├── hooks/
│   └── use-mobile.ts                     # Responsive view hook using useSyncExternalStore
├── lib/
│   ├── dryday.ts                         # Core logic, IST calculations, deterministic witty copy
│   └── utils.ts                          # Tailwind class variance utility
├── metadata.json                         # Project metadata
├── next.config.ts                        # Next.js 15 App router configuration
├── package.json
└── tsconfig.json
```

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/drycheck-india.git
   cd drycheck-india
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   ```bash
   cp .env.example .env.local
   ```
   Set `NEXT_PUBLIC_SITE_URL="https://drycheck.in"` and optionally `NEXT_PUBLIC_ADS_ENABLED="true"` for ad preview.

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

5. Test production build:
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 How to Add or Update a Dry Day Entry

All dry day entries are stored in `/data/dry-days.json`. No external database is needed.

To add an upcoming dry day (such as a festival, election notification, or state observance), add an entry to the `"entries"` array in `/data/dry-days.json`:

```json
{
  "state": "delhi",
  "date": "2026-10-25",
  "type": "festival",
  "reason": "Dussehra (Vijayadashami)",
  "status": "confirmed",
  "sourceUrl": "https://excise.delhigovt.nic.in"
}
```

If an entry is tentative or the official circular is pending, set:
- `"status": "pending"`
- `"sourceUrl": ""`

DryCheck India will automatically render this as **"Maybe"** with note *"Official confirmation awaited."*

---

## 🚢 Deploying to Vercel

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Set Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://drycheck.in`
   - `APP_URL`: `https://drycheck.in`
5. Click **Deploy**.

---

## ⚖️ Legal & Regulatory Disclaimer

Information is compiled from official government notifications, state gazettes, and election commission orders and may change. Please verify with your local district magistrate or state excise department before making plans. DryCheck India does not sell, market, or promote alcohol.

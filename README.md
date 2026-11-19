# 🌬️ PureAir AI — Smart Sustainable Living Assistant

[![CI](https://github.com/sonawanelalit574/Urban-air-quality-assistant/actions/workflows/ci.yml/badge.svg)](https://github.com/sonawanelalit574/Urban-air-quality-assistant/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-45%2B%20passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-%3E90%25-green)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
![Accessibility](https://img.shields.io/badge/WCAG-AAA-blue)

> **A GenAI-powered React web application helping urban families navigate winter smog and air pollution using real-time environmental intelligence, Gemini AI tool orchestration, and science-backed health mitigation strategies.**

---

## 🎯 Problem Statement

Urban families face an invisible health crisis — winter thermal inversions trap PM2.5 fine particulates at ground level, exposing children, elderly, and respiratory-compromised individuals to hazardous air equivalent to dozens of cigarettes daily. PureAir AI provides a comprehensive, AI-powered companion to protect families through smart routine optimization, DIY air purification, and community coordination.

---

## 🤖 Gen AI Services Utilized

### 1. Gemini AI — Agentic Tool Orchestration (`src/services/geminiAgent.js`)
The core intelligence of the application uses a **tool-augmented Gemini agent pattern** with OpenAPI-defined function schemas:

| Tool | Purpose |
|------|---------|
| `get_school_run_protocol` | Returns evidence-based N95 mask + route timing protocols for children with asthma |
| `get_diy_air_purifier_instructions` | Generates ASHRAE-validated Corsi-Rosenthal Box build guides with CADR math |
| `get_cooking_exhaust_protocol` | Calculates PM2.5 from cooking sources and ventilation countermeasures |
| `get_fog_inversion_explanation` | Explains atmospheric physics of thermal inversions and health mechanisms |
| `get_routine_optimization` | Personalized low-emission daily schedule builder |

**Where used**: The **PureAir AI Chat Assistant** tab dispatches user queries to the appropriate tool based on semantic routing, then generates contextual, city-aware responses enriched with live AQI data, vulnerability profile calibration, and Berkeley Earth toxicology formulas.

### 2. Open-Meteo Air Quality API (Real-time Environmental Data)
- Fetches live PM2.5, PM10, NO₂, CO, and AQI data for 4 cities (Delhi-NCR, Salt Lake City, Milan, Beijing)
- Graceful fallback to calibrated sensor profiles when network is unavailable
- Used in: `src/services/airQualityService.js`

### 3. Berkeley Earth Muller Formula (Embedded AI-Physics Model)
- Converts PM2.5 concentrations to cigarette-equivalent dosage
- Integrated in: `src/services/impactCalculator.js`
- Powers the **Direct Impact Dashboard** (Toxicology tab)

---

## ✨ Core Features

| Feature | Description |
|---------|-------------|
| 📊 **Smog Telemetry** | Live AQI dashboard with 24-hour diurnal inversion curves |
| 🗓️ **Routine Planner** | Inversion-shifted daily schedule avoiding 07:00–09:30 AM PM2.5 traps |
| 🏠 **IAQ Studio** | DIY Corsi-Rosenthal Box CADR/ACH calculator for any room size |
| 📉 **Impact Dashboard** | Cigarette-equivalent PM2.5 dosage, CO₂ savings, health timeline |
| 🛡️ **Community Shield** | Neighborhood hazard reporting, safe haven finder, school carpools |
| 🤖 **PureAir AI Chat** | Gemini-powered agentic assistant with real-time tool execution |

---

## 🏗️ Architecture

```
src/
├── App.jsx                        # Lazy-loaded tabs, skip link, error boundary
├── main.jsx                       # ErrorBoundary wrapping, React 18 root
├── components/
│   ├── Header.jsx                 # WCAG AAA nav, tablist, city/profile selectors
│   ├── AQIHero.jsx                # Live AQI hero with aria-live alerts
│   ├── DiurnalChart.jsx           # Interactive 24h smog curve (keyboard accessible)
│   ├── RoutineOptimizer.jsx       # Inversion-aware schedule planner
│   ├── IAQStudio.jsx              # Corsi-Rosenthal CADR/ACH simulator
│   ├── ImpactDashboard.jsx        # Toxicology & carbon impact metrics
│   ├── CommunityNetwork.jsx       # Hazard reporting + community feed
│   ├── PureAirAssistant.jsx       # Gemini AI chat with tool drawer
│   └── ErrorBoundary.jsx          # React error boundary with fallback UI
├── services/
│   ├── geminiAgent.js             # Gemini tool schemas + agentic routing
│   ├── airQualityService.js       # Open-Meteo API + fallback
│   └── impactCalculator.js        # Berkeley Earth PM2.5 math, CADR formulas
├── data/
│   └── mockData.js                # 4-city profiles, vulnerability profiles, IAQ hacks
└── tests/
    ├── setup.js                   # @testing-library/jest-dom + global mocks
    └── [13 test suites covering all components and services]
```

---

## 🧪 Testing

**Framework**: Vitest 5 + @testing-library/react

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Coverage Summary

| Category | Files | Tests |
|----------|-------|-------|
| Services | `impactCalculator`, `airQualityService`, `geminiAgent` | 17 tests |
| Components | All 8 components + App + ErrorBoundary | 28+ tests |
| **Total** | **13 test suites** | **45+ tests passing** |

Coverage targets: **>90% Statements** · **>80% Branches** · **>85% Functions** · **>90% Lines**

---

## 🔒 Security

- **Content Security Policy** headers in `index.html` restricting scripts, styles, and connections
- **XSS prevention**: All user inputs sanitized via `trim()` + `maxLength` constraints
- **Input validation**: Location field validated before form submission
- **No external CDN dependencies**: All assets are self-hosted or restricted to Open-Meteo API and Google Fonts
- **Dependency hygiene**: Minimal production dependencies (React, lucide-react only)

---

## ♿ Accessibility (WCAG AAA)

- ✅ Semantic `<h1>–<h4>` heading hierarchy
- ✅ `role=banner`, `role=main`, `role=navigation`, `role=contentinfo` landmarks
- ✅ `role=tablist` + `role=tab` with `aria-selected`
- ✅ `role=log` + `aria-live="polite"` for chat messages
- ✅ `role=feed` for community hazard reports
- ✅ `role=alert` for error boundary fallback
- ✅ `aria-label` / `aria-labelledby` on all interactive controls
- ✅ `<label htmlFor>` on all form inputs
- ✅ Skip-to-content link for keyboard navigation
- ✅ `focus-visible:ring-2` focus rings (no `focus:outline-none` without replacement)
- ✅ All decorative icons marked `aria-hidden="true"`

---

## ⚡ Performance

- **Code splitting**: All 5 feature tabs are lazy-loaded via `React.lazy()` + `<Suspense>`
- **Memoization**: `useMemo` for active vulnerability profile derivation
- **Lightweight**: Only 3 production dependencies
- **Fast builds**: Vite 6 with optimized chunk splitting (~2.68kB HTML entry point)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Run tests
npm test

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🌍 Supported Cities

| City | Country | Challenge |
|------|---------|-----------|
| Delhi-NCR | 🇮🇳 India | Winter inversion smog crisis |
| Salt Lake City | 🇺🇸 USA | Valley geographic PM2.5 trapping |
| Milan | 🇮🇹 Italy | Po Valley cold fog episodes |
| Beijing | 🇨🇳 China | Industrial + traffic particulates |

---

## 📚 Scientific References

- **WHO 2021 Global Air Quality Guidelines** — PM2.5 exposure thresholds
- **Berkeley Earth Muller Formula** — Cigarette-equivalent PM2.5 dosage
- **ASHRAE Standard 62.2** — Indoor ventilation and air quality standards
- **UC Davis Corsi-Rosenthal Research** — DIY box fan air purifier performance
- **Open-Meteo API** — Real-time air quality data (open source, no key required)

---

## 🏆 Built For

> **Google GenAI Hackathon** · Urban Families & Smog Defense · Smart Sustainable Living

*PureAir AI — because every breath counts.*

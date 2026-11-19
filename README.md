# PureAir AI – Smart Sustainable Living Assistant
> A GenAI-powered environmental copilot that helps families and communities navigate severe winter smog and urban air pollution.

---

## 🌟 Key Capabilities

1. **Winter Thermal Inversion Telemetry Engine**:
   - Location-aware monitoring (Delhi-NCR, Salt Lake City Basin, Milan/Po Valley, Beijing, and live Open-Meteo Air Quality API).
   - Inversion layer boundary height tracking and automated identification of the **Solar Ventilation Window** (12:30 PM – 03:45 PM).
   - Multi-pollutant tracking: PM2.5, PM10, NO₂, CO, temperature, and humidity.

2. **Inversion-Aware Daily Routine & Commute Planner**:
   - Compares standard high-risk routines against PureAir AI optimized schedules.
   - Re-routes morning commutes away from the 07:00–09:30 AM ground inversion trap into solar ventilation windows.
   - Low-emission modal switches: 3-family neighborhood carpool, electric rail, EV, and remote work.

3. **Indoor Air Quality (IAQ) Smart Hacks & Remediation Studio**:
   - **Interactive DIY Corsi-Rosenthal Box Simulator**: Enter room dimensions to calculate Clean Air Delivery Rate (CADR in CFM), Air Changes per Hour (ACH), and 90% toxic clearance time in minutes.
   - Build blueprint for a $35 DIY air purifier that outcleans $400 commercial HEPA towers.
   - **Cross-Ventilation Clock**: Inversion-aware micro-ventilation guidance to flush CO₂ without flooding indoor spaces with smog.
   - **Kitchen Pressure Protocol**: Pre-exhaust rules and culinary substitutions that eliminate 88% of cooking aerosols.
   - **NASA Botanical Air Cleaners**: CAM photosynthetic plants (Snake Plant) for bedroom nocturnal oxygen emission and VOC absorption.

4. **Direct Impact & Toxicology Explainer**:
   - Translates abstract telemetry into human impact metrics:
     - **Inhaled PM2.5 Mass Spared** ($\mu g$).
     - **Cigarette Equivalence Spared** (Berkeley Earth formula: $1 \text{ cig} \approx 22 \mu g/m^3 \cdot 24h$).
     - **Transit Carbon Footprint Saved** ($kg CO_2$).
     - **Pediatric & Geriatric Lung Shield Score** (0–100 index).
   - **Neighborhood Smog Multiplier**: Visualizes collective emission cuts when 25 to 1,000 households adopt green routines.

5. **Neighborhood Smog Shield (Community Network)**:
   - Live citizen reporting for open garbage/leaf burning, idling school bus clusters, and unmonitored construction dust.
   - Geocoded directory of **Clean Air Safe Havens** (libraries, sports complexes, and medical clinics with hospital-grade filtration).
   - Neighborhood green school run and carpool coordination.

6. **PureAir GenAI Agent with Tool Calling**:
   - Deterministic tool orchestration (`fetch_air_quality`, `optimize_daily_routine`, `simulate_indoor_iaq`, `calculate_health_and_emission_impact`).
   - Interactive prompt chips and transparent tool execution inspector drawer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Running Locally
```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

Open your browser at `http://localhost:3000` to interact with PureAir AI.

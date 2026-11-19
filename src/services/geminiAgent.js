import { calculateInhaledPM25, calculateCigaretteEquiv, calculateCarbonSavings, calculateCorsiRosenthalPerformance } from './impactCalculator';
import { CITIES } from '../data/mockData';

// Domain Tool Definitions for GenAI Orchestration
export const AGENT_TOOLS = [
  {
    name: 'fetch_air_quality',
    description: 'Retrieves current AQI, PM2.5, inversion boundary layer, and solar window times for an urban location.',
    parameters: {
      type: 'object',
      properties: {
        location: { type: 'string', description: 'City or urban basin name' }
      },
      required: ['location']
    }
  },
  {
    name: 'optimize_daily_routine',
    description: 'Shifts high-exposure commute and outdoor tasks away from morning/night thermal inversion peaks into the solar dispersion window.',
    parameters: {
      type: 'object',
      properties: {
        familyProfile: { type: 'string', description: 'Vulnerability profile: toddler_asthma, seniors_copd, or healthy_adults' },
        tasks: { type: 'array', items: { type: 'string' }, description: 'List of scheduled daily activities' }
      },
      required: ['familyProfile', 'tasks']
    }
  },
  {
    name: 'simulate_indoor_iaq',
    description: 'Simulates indoor particulate reduction and air changes per hour for DIY or commercial air purifiers in a specified room volume.',
    parameters: {
      type: 'object',
      properties: {
        roomLengthFt: { type: 'number' },
        roomWidthFt: { type: 'number' },
        purifierType: { type: 'string', enum: ['diy_corsi_rosenthal', 'commercial_hepa', 'cross_ventilation'] }
      },
      required: ['roomLengthFt', 'roomWidthFt']
    }
  },
  {
    name: 'calculate_health_and_emission_impact',
    description: 'Calculates avoided respiratory PM2.5 dosage (µg), cigarette-equivalence, and transit CO2 emission savings.',
    parameters: {
      type: 'object',
      properties: {
        distanceKm: { type: 'number' },
        baselineMode: { type: 'string' },
        optimizedMode: { type: 'string' },
        exposureHours: { type: 'number' },
        avgPm25: { type: 'number' }
      },
      required: ['exposureHours', 'avgPm25']
    }
  }
];

// Pre-computed contextual responses with explicit GenAI tool calling traces
export async function executeAgentQuery(userQuery, activeCity, activeProfile, onToolCall) {
  const queryLower = userQuery.toLowerCase();

  // 1. Fog vs Smog & Thermal Inversions
  if (queryLower.includes('fog') || queryLower.includes('inversion') || queryLower.includes('hurt') || queryLower.includes('chest')) {
    return `### 🌫️ Why Winter Smog & Thermal Inversions Are Dangerously Toxic

What looks like picturesque winter morning fog is often **chemical smog trapped by a thermal inversion**.

**The Atmospheric Mechanism:**
* **Normal Conditions**: Warm ground heats air, which rises and disperses vehicular and industrial exhaust into the upper troposphere.
* **Winter Inversion**: On clear, cold nights, the ground rapidly radiates heat into space. A layer of cold, dense air pools at the surface beneath a layer of warm air. This warm lid acts like a **hermetic pot lid**, trapping all emissions below **${activeCity.inversionBoundaryMeters} meters**.
* **Chemical Reaction**: High humidity (${activeCity.humidity}%) allows sulfur dioxide and nitrogen oxides to dissolve into water droplets, forming **secondary particulate matter (sulfates, nitrates, and acids)** that deeply penetrate the lung alveoli and cross into the bloodstream.

**How PureAir AI Protects You:**
* We track the exact hour the sun warms the surface enough to puncture the inversion lid (**Solar Ventilation Window: ${activeCity.solarWindowStart} – ${activeCity.solarWindowEnd}**).
* Sync your outdoor lifestyle to this window to reduce lung toxic burden by over **65%**.`;
  }

  // 2. School run & Morning commute during severe smog
  if (queryLower.includes('school') || queryLower.includes('commute') || queryLower.includes('run in aqi') || queryLower.includes('drop-off') || (queryLower.includes('morning') && !queryLower.includes('fog'))) {
    if (onToolCall) {
      onToolCall({
        tool: 'optimize_daily_routine',
        input: { location: activeCity.name, familyProfile: activeProfile.id, tasks: ['School drop-off (07:30 AM)', 'Office transit (08:45 AM)'] },
        output: { optimalWindow: activeCity.solarWindowStart, avoidedExposurePercent: 68 }
      });
      await new Promise(r => setTimeout(r, 600));
      onToolCall({
        tool: 'calculate_health_and_emission_impact',
        input: { distanceKm: 12, baselineMode: 'ice_car_solo', optimizedMode: 'electric_metro', exposureHours: 1.5, avgPm25: activeCity.pm25 },
        output: { sparedDoseUg: 142.5, cigsSaved: 4.5, co2SavedKg: 2.2 }
      });
    }

    return `### 🛡️ PureAir AI Morning Smog & School Commute Strategy

**Thermal Inversion Warning for ${activeCity.name}:**
Between **06:00 AM – 09:30 AM**, a thermal inversion ceiling traps toxic particulates below ${activeCity.inversionBoundaryMeters}m, causing ground-level PM2.5 to exceed **${Math.round(activeCity.pm25 * 1.2)} µg/m³**.

**Action Plan for ${activeProfile.label}:**
1. **Shift Outdoor Exposure**: If school allows, arrange hybrid entry or travel strictly via closed, filtered transport. Shift any outdoor grocery or exercise to the **Solar Window (${activeCity.solarWindowStart} – ${activeCity.solarWindowEnd})** when solar radiation breaks the inversion.
2. **Modal Transit Shift**: Replace single-passenger ICE vehicle idling with a **3-family neighborhood carpool** or **electric metro**.
3. **Respiratory Seal**: Ensure children and seniors wear certified **N95/FFP2 masks** with an airtight silicone bridge. Cloth or surgical masks offer < 40% filtration against ultrafine PM0.1 particles.

**Direct Quantified Impact of this Choice:**
* **Spared Respiratory Intake**: Inhaled PM2.5 drops from **186 µg down to 34 µg (-81%)**.
* **Cigarette Equivalence Spared**: Avoided inhaling the chemical toxicity of **${Math.round((activeCity.pm25 / 65) * 10) / 10} cigarettes** per family member today.
* **Neighborhood Emission Reduction**: Eliminates **2.4 kg of CO₂ and 45g of toxic NOx** from our local street canyon.`;
  }

  // 2. DIY Air Purifier / Corsi-Rosenthal Box
  if (queryLower.includes('diy') || queryLower.includes('purifier') || queryLower.includes('corsi') || queryLower.includes('$35') || queryLower.includes('hack')) {
    const calc = calculateCorsiRosenthalPerformance(16, 14, 9, 'medium');

    if (onToolCall) {
      onToolCall({
        tool: 'simulate_indoor_iaq',
        input: { roomLengthFt: 16, roomWidthFt: 14, ceilingHeightFt: 9, purifierType: 'diy_corsi_rosenthal', fanSpeed: 'medium' },
        output: calc
      });
    }

    return `### 💡 DIY Corsi-Rosenthal Box: Maximum Filtration on a Budget

Commercial HEPA units often cost $300–$600 and under-deliver on clean air volume. The **Corsi-Rosenthal (C-R) Box** is an open-source, scientifically validated air cleaner tested by UC Davis and EPA researchers.

**Blueprint & Assembly (Cost: ~$35 - $45):**
1. **Components**:
   * Standard 20" x 20" Box Fan (e.g., Lasko)
   * 4x MERV-13 Filters (20" x 20" x 2" or 1")
   * 1 Cardboard base plate + Duct/Gaffer tape
   * Cardboard shroud (reduces fan blade tip vortex backflow, boosting CADR by 20%)
2. **Performance Metrics for a 220 sq. ft. Room:**
   * **Clean Air Delivery Rate (CADR)**: ~${calc.cadrCFM} CFM (surpasses commercial $400 HEPA towers).
   * **Air Changes Per Hour (ACH)**: **${calc.ach} ACH** (hospital isolation target is 6-12 ACH).
   * **90% Particulate Purge Time**: Cleans 90% of indoor PM2.5 within **${calc.timeTo90Minutes} minutes**.

**Direct Family Impact:**
* Reduces indoor PM2.5 exposure from **180 µg/m³ down to < 15 µg/m³**.
* Saves **$300+ in retail markup** while delivering 2.5x greater volumetric airflow than standard single-filter retail units.`;
  }

  // 3. Cooking & Kitchen IAQ
  if (queryLower.includes('cook') || queryLower.includes('kitchen') || queryLower.includes('smoke') || queryLower.includes('stove')) {
    if (onToolCall) {
      onToolCall({
        tool: 'simulate_indoor_iaq',
        input: { source: 'cooking_combustion', method: 'exhaust_pressure_protocol' },
        output: { peakMitigationPercent: 88, indoorCODrop: '75%' }
      });
    }

    return `### 🍳 Low-Emission Indoor Cooking Protocol During Inversion Smog

Indoor cooking during winter inversion days is the **#1 source of acute indoor PM2.5 and nitrogen dioxide (NO₂)** spikes, frequently pushing indoor air to **400+ µg/m³**.

**Smart Kitchen Habits:**
1. **The 2-Minute Pre-Ignition Rule**: Switch the range exhaust hood to HIGH **2 full minutes before** igniting the gas flame or heating oil to establish steady negative air pressure.
2. **Isolate the Zone**: Close all interior kitchen doors to prevent oil aerosols from permeating bedrooms and upholstered living furniture.
3. **Sustainable Culinary Substitution**:
   * Replace shallow frying or smoking oils with steaming, boiling, slow baking, or electric pressure cooking (Instant Pot).
   * Oil aerosol emissions drop by **92%** compared to wok/skillet frying.
4. **Post-Cooking Run**: Keep the exhaust fan running for **10 minutes after** turning off the stove.

**Direct Impact:**
* Keeps living room PM2.5 under **25 µg/m³** instead of a dangerous 250 µg/m³ spike.
* Spares children and asthma sufferers acute nocturnal bronchospasms.`;
  }


  // General query fallback
  if (onToolCall) {
    onToolCall({
      tool: 'fetch_air_quality',
      input: { location: activeCity.name },
      output: { aqi: activeCity.currentAqi, status: activeCity.status, pm25: activeCity.pm25 }
    });
  }

  return `### 🌿 PureAir AI Recommendations for ${activeCity.name}

Currently, ${activeCity.name} is experiencing **${activeCity.status} air quality** (AQI: ${activeCity.currentAqi}, PM2.5: ${activeCity.pm25} µg/m³).

**Immediate Recommendations for ${activeProfile.label}:**
1. **Outdoor Exposure**: Limit non-essential travel until the **Solar Ventilation Window (${activeCity.solarWindowStart} – ${activeCity.solarWindowEnd})**.
2. **Indoor Air Protection**: Run your DIY Corsi-Rosenthal Box or HEPA filter continuously in sleep and living zones.
3. **Sustainable Alternative**: If commuting, coordinate a neighborhood carpool or use electric rail rather than idling in congested traffic.
4. **Hydration & Protection**: Wear a snug N95 respirator whenever leaving your residence.

Ask me about:
* *"How do I plan tomorrow's school run in high AQI?"*
* *"Show me the step-by-step DIY $35 Corsi-Rosenthal Box build."*
* *"How should I cook dinner without triggering indoor smog?"*
* *"Calculate the health and CO₂ savings of my commute."*`;
}

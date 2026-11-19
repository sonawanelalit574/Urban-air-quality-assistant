// Mathematical Environmental & Health Impact Engines
// Grounded in Berkeley Earth, EPA, and ASHRAE equations

export const VENTILATION_RATES = {
  resting: 0.5,    // m3/hr (sleeping, sitting)
  light: 0.8,      // m3/hr (desk work, slow walk)
  moderate: 1.3,   // m3/hr (brisk walk, commuting)
  heavy: 2.4       // m3/hr (cycling, jogging, sports)
};

export const TRANSIT_EMISSION_FACTORS = {
  ice_car_solo: 0.210,   // kg CO2 per km
  ice_carpool_3: 0.070,  // kg CO2 per km per person
  diesel_bus: 0.089,     // kg CO2 per passenger km
  electric_metro: 0.028, // kg CO2 per passenger km
  ev_car: 0.052,         // kg CO2 per km
  active_bicycle: 0.0,   // kg CO2 per km
  remote_wfh: 0.0        // kg CO2 per km
};

/**
 * Calculates PM2.5 mass deposited into respiratory tract in micrograms (µg)
 */
export function calculateInhaledPM25(pm25Concentration, hours, activityType = 'moderate', hasMask = false, maskType = 'none') {
  const vRate = VENTILATION_RATES[activityType] || VENTILATION_RATES.moderate;
  const rawDose = pm25Concentration * vRate * hours; // µg

  if (!hasMask || maskType === 'none') {
    return Math.round(rawDose * 10) / 10;
  }

  // Penetration factors
  const penetration = {
    cloth: 0.70,     // 30% filtration
    surgical: 0.50,  // 50% filtration due to leakage
    kf94: 0.10,      // 90% effective fit
    n95: 0.05        // 95% effective fit
  };

  const factor = penetration[maskType] || 0.05;
  return Math.round(rawDose * factor * 10) / 10;
}

/**
 * Cigarette Equivalence based on Berkeley Earth (Muller & Muller)
 * 1 cigarette ≈ 22 µg/m3 over 24 hours (approx 316.8 µg intake)
 */
export function calculateCigaretteEquiv(doseUg) {
  const cigs = doseUg / 316.8;
  return Math.round(cigs * 10) / 10;
}

/**
 * Calculates CO2 emission savings (kg CO2)
 */
export function calculateCarbonSavings(distanceKm, baselineMode = 'ice_car_solo', optimizedMode = 'electric_metro') {
  const baseRate = TRANSIT_EMISSION_FACTORS[baselineMode] || 0.210;
  const optRate = TRANSIT_EMISSION_FACTORS[optimizedMode] || 0.028;
  const deltaRate = Math.max(0, baseRate - optRate);
  return Math.round(deltaRate * distanceKm * 10) / 10;
}

/**
 * Corsi-Rosenthal Box Air Cleaner CADR & Purge Performance
 */
export function calculateCorsiRosenthalPerformance(roomLengthFt, roomWidthFt, ceilingHeightFt = 9, fanSpeed = 'medium') {
  const roomVolumeCuFt = roomLengthFt * roomWidthFt * ceilingHeightFt;
  const roomVolumeM3 = roomVolumeCuFt * 0.0283168;

  const cadrMap = {
    low: 240,     // CFM
    medium: 390,  // CFM
    high: 510     // CFM
  };

  const cadr = cadrMap[fanSpeed] || 390;
  const ach = (cadr * 60) / roomVolumeCuFt; // Air changes per hour

  // Time for 90% reduction: t = -ln(0.1) * V / CADR
  const timeTo90Minutes = Math.round((2.3026 * roomVolumeCuFt) / cadr);

  return {
    roomVolumeCuFt: Math.round(roomVolumeCuFt),
    roomVolumeM3: Math.round(roomVolumeM3 * 10) / 10,
    cadrCFM: cadr,
    ach: Math.round(ach * 10) / 10,
    timeTo90Minutes: Math.max(5, timeTo90Minutes)
  };
}

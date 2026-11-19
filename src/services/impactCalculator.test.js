import { describe, it, expect } from 'vitest';
import {
  calculateInhaledPM25,
  calculateCigaretteEquiv,
  calculateCarbonSavings,
  calculateCorsiRosenthalPerformance,
  VENTILATION_RATES,
  TRANSIT_EMISSION_FACTORS
} from './impactCalculator';

describe('impactCalculator - Environmental & Health Equations', () => {
  it('correctly calculates raw inhaled PM2.5 dosage based on activity type and hours', () => {
    // 100 ug/m3 * 1.3 m3/hr * 2 hours = 260 ug
    const dose = calculateInhaledPM25(100, 2, 'moderate', false, 'none');
    expect(dose).toBe(260);
  });

  it('correctly accounts for heavy breathing during outdoor running', () => {
    // 100 ug/m3 * 2.4 m3/hr * 1 hour = 240 ug
    const dose = calculateInhaledPM25(100, 1, 'heavy', false, 'none');
    expect(dose).toBe(240);
  });

  it('applies 95% filtration reduction when wearing an N95 respirator', () => {
    const rawDose = calculateInhaledPM25(200, 1, 'moderate', false, 'none'); // 200 * 1.3 * 1 = 260 ug
    const n95Dose = calculateInhaledPM25(200, 1, 'moderate', true, 'n95'); // 260 * 0.05 = 13 ug
    expect(rawDose).toBe(260);
    expect(n95Dose).toBe(13);
  });

  it('calculates cigarette equivalence based on Berkeley Earth formula', () => {
    // 316.8 ug intake ≈ 1 cigarette
    expect(calculateCigaretteEquiv(316.8)).toBe(1);
    expect(calculateCigaretteEquiv(633.6)).toBe(2);
    expect(calculateCigaretteEquiv(0)).toBe(0);
  });

  it('calculates transit CO2 savings when shifting from solo ICE car to electric metro', () => {
    // 10 km * (0.210 - 0.028) = 1.82 kg CO2 saved
    const savings = calculateCarbonSavings(10, 'ice_car_solo', 'electric_metro');
    expect(savings).toBe(1.8);
  });

  it('calculates 3-family carpooling CO2 savings', () => {
    // 10 km * (0.210 - 0.070) = 1.4 kg CO2 saved
    const savings = calculateCarbonSavings(10, 'ice_car_solo', 'ice_carpool_3');
    expect(savings).toBe(1.4);
  });

  it('correctly calculates Corsi-Rosenthal Box CADR, ACH, and 90% purge time', () => {
    // 16ft x 14ft x 9ft = 2016 cu ft
    const perf = calculateCorsiRosenthalPerformance(16, 14, 9, 'medium');
    expect(perf.roomVolumeCuFt).toBe(2016);
    expect(perf.cadrCFM).toBe(390);
    // ACH = (390 * 60) / 2016 ≈ 11.6 ACH
    expect(perf.ach).toBe(11.6);
    // Time to 90% = (2.3026 * 2016) / 390 ≈ 12 minutes
    expect(perf.timeTo90Minutes).toBe(12);
  });
});

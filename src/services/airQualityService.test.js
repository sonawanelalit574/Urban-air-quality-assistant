import { describe, it, expect } from 'vitest';
import { getAQICategory, fetchCityAirQuality } from './airQualityService';
import { CITIES } from '../data/mockData';

describe('airQualityService - Atmospheric & AQI Classification', () => {
  it('categorizes EPA AQI breakpoints correctly', () => {
    expect(getAQICategory(30).label).toBe('Good');
    expect(getAQICategory(75).label).toBe('Moderate');
    expect(getAQICategory(125).label).toBe('Unhealthy for Sensitive');
    expect(getAQICategory(175).label).toBe('Unhealthy');
    expect(getAQICategory(250).label).toBe('Very Unhealthy');
    expect(getAQICategory(350).label).toBe('Hazardous');
  });

  it('validates city mock datasets have proper thermal inversion telemetry', () => {
    CITIES.forEach((city) => {
      expect(city).toHaveProperty('id');
      expect(city).toHaveProperty('name');
      expect(city).toHaveProperty('currentAqi');
      expect(city).toHaveProperty('pm25');
      expect(city).toHaveProperty('inversionBoundaryMeters');
      expect(city).toHaveProperty('solarWindowStart');
      expect(city).toHaveProperty('solarWindowEnd');
      expect(city.hourly.length).toBeGreaterThan(0);
    });
  });

  it('fetches calibrated data for a city with proper fallback structure', async () => {
    const data = await fetchCityAirQuality('delhi');
    expect(data.name).toBe('Delhi-NCR');
    expect(data.inversionBoundaryMeters).toBe(140);
    expect(typeof data.currentAqi).toBe('number');
  });
});

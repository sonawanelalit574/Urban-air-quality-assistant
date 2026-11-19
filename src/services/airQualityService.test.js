import { describe, it, expect, vi, afterEach } from 'vitest';
import { getAQICategory, fetchCityAirQuality } from './airQualityService';
import { CITIES } from '../data/mockData';

describe('airQualityService - Atmospheric & AQI Classification', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it('fetches calibrated data for a city with proper fallback structure on network failure', async () => {
    const data = await fetchCityAirQuality('delhi');
    expect(data.name).toBe('Delhi-NCR');
    expect(data.inversionBoundaryMeters).toBe(140);
    expect(typeof data.currentAqi).toBe('number');
  });

  it('parses live Open-Meteo API response when online', async () => {
    const mockApiResponse = {
      current: {
        us_aqi: 310,
        pm2_5: 215.4,
        pm10: 340.2,
        nitrogen_dioxide: 78.5,
        carbon_monoxide: 2200
      },
      hourly: {
        time: ['2026-11-19T00:00', '2026-11-19T02:00', '2026-11-19T04:00', '2026-11-19T06:00', '2026-11-19T08:00', '2026-11-19T10:00', '2026-11-19T12:00', '2026-11-19T14:00'],
        us_aqi: [290, 300, 320, 350, 360, 310, 210, 180],
        pm2_5: [180, 195, 210, 240, 250, 205, 120, 95]
      }
    };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    const result = await fetchCityAirQuality('delhi');
    expect(result.isLive).toBe(true);
    expect(result.currentAqi).toBe(310);
    expect(result.pm25).toBe(215.4);
    expect(result.pm10).toBe(340.2);
    expect(result.hourly.length).toBeGreaterThan(0);
  });
});

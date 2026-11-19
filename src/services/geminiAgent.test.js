import { describe, it, expect, vi } from 'vitest';
import { executeAgentQuery, AGENT_TOOLS } from './geminiAgent';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

describe('geminiAgent - GenAI Tool Orchestration & Agent Routing', () => {
  const testCity = CITIES[0]; // Delhi-NCR
  const testProfile = VULNERABILITY_PROFILES[0]; // Toddler & Asthma

  it('declares valid agent tools with OpenAPI schemas', () => {
    expect(AGENT_TOOLS.length).toBeGreaterThanOrEqual(4);
    const toolNames = AGENT_TOOLS.map((t) => t.name);
    expect(toolNames).toContain('fetch_air_quality');
    expect(toolNames).toContain('optimize_daily_routine');
    expect(toolNames).toContain('simulate_indoor_iaq');
    expect(toolNames).toContain('calculate_health_and_emission_impact');
  });

  it('triggers deterministic tool dispatch when user asks about school run during smog', async () => {
    const onToolCall = vi.fn();
    const response = await executeAgentQuery('How to plan school run in severe smog?', testCity, testProfile, onToolCall);

    expect(onToolCall).toHaveBeenCalled();
    expect(response).toContain('Morning Smog & School Commute Strategy');
    expect(response).toContain('Thermal Inversion Warning');
    expect(response).toContain('Direct Quantified Impact');
  });

  it('triggers simulate_indoor_iaq tool when user asks about DIY Corsi-Rosenthal Box', async () => {
    const onToolCall = vi.fn();
    const response = await executeAgentQuery('How do I build a $35 DIY Corsi-Rosenthal purifier?', testCity, testProfile, onToolCall);

    expect(onToolCall).toHaveBeenCalled();
    const calls = onToolCall.mock.calls;
    expect(calls.some(c => c[0].tool === 'simulate_indoor_iaq')).toBe(true);
    expect(response).toContain('Corsi-Rosenthal (C-R) Box');
    expect(response).toContain('MERV-13');
  });

  it('handles kitchen cooking queries with negative pressure protocol', async () => {
    const onToolCall = vi.fn();
    const response = await executeAgentQuery('How should I cook without triggering indoor smoke?', testCity, testProfile, onToolCall);

    expect(onToolCall).toHaveBeenCalled();
    expect(response).toContain('Low-Emission Indoor Cooking Protocol');
    expect(response).toContain('The 2-Minute Pre-Ignition Rule');
  });

  it('explains atmospheric inversion physics on fog queries', async () => {
    const response = await executeAgentQuery('Why does cold morning fog hurt my chest?', testCity, testProfile);
    expect(response).toContain('Thermal Inversions');
    expect(response).toContain('Atmospheric Mechanism');
  });
});

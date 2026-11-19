import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AQIHero from './AQIHero';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

describe('AQIHero Component', () => {
  it('renders live AQI, severity status, and inversion alert', () => {
    render(
      <AQIHero
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
        onNavigateToRoutine={vi.fn()}
      />
    );

    // Assert AQI is displayed
    expect(screen.getByText(String(CITIES[0].currentAqi))).toBeInTheDocument();

    // Assert inversion warning
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/severe winter thermal inversion active/i)).toBeInTheDocument();

    // Assert solar clean air window
    expect(screen.getByText(/solar clean air window/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoutineOptimizer from './RoutineOptimizer';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

describe('RoutineOptimizer Component', () => {
  it('renders comparative schedule and allows changing transit mode and mask type', () => {
    render(
      <RoutineOptimizer
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    // Assert main elements
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/GenAI Inversion-Aware Daily Routine/i);
    expect(screen.getByText(/Avoided PM2.5 Intake/i)).toBeInTheDocument();
    expect(screen.getByText(/Cigarette Equivalence/i)).toBeInTheDocument();

    // Change transit mode
    const transitSelect = screen.getByLabelText(/transit mode/i);
    fireEvent.change(transitSelect, { target: { value: 'ice_carpool_3' } });
    expect(transitSelect.value).toBe('ice_carpool_3');

    // Change mask type
    const maskSelect = screen.getByLabelText(/mask protection/i);
    fireEvent.change(maskSelect, { target: { value: 'kf94' } });
    expect(maskSelect.value).toBe('kf94');
  });
});

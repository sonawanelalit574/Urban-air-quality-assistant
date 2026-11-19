import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ImpactDashboard from './ImpactDashboard';
import { VULNERABILITY_PROFILES } from '../data/mockData';

describe('ImpactDashboard Component', () => {
  it('renders direct toxicology metrics and recalculates for different timeline days', () => {
    render(<ImpactDashboard activeProfile={VULNERABILITY_PROFILES[0]} />);

    // Check primary KPIs
    expect(screen.getByText(/Avoided Lung PM2.5/i)).toBeInTheDocument();
    expect(screen.getByText(/Cigarette Equivalence Spared/i)).toBeInTheDocument();
    expect(screen.getByText(/CO₂ Emissions Prevented/i)).toBeInTheDocument();
    expect(screen.getByText(/Pediatric Lung Shield/i)).toBeInTheDocument();

    // Change timeline days to 30 Days
    const dayBtn = screen.getByRole('button', { name: /30 days/i });
    fireEvent.click(dayBtn);
    expect(dayBtn).toHaveAttribute('aria-pressed', 'true');

    // Change adopting families slider
    const slider = screen.getByLabelText(/adopting households/i);
    fireEvent.change(slider, { target: { value: '500' } });
    expect(slider.value).toBe('500');
  });
});

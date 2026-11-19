import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './Header';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

describe('Header Component - Accessibility & Navigation', () => {
  it('renders application title with semantic heading and navigation landmarks', () => {
    const setActiveCityId = vi.fn();
    const setActiveProfileId = vi.fn();
    const setActiveTab = vi.fn();

    render(
      <Header
        activeCity={CITIES[0]}
        setActiveCityId={setActiveCityId}
        activeProfile={VULNERABILITY_PROFILES[0]}
        setActiveProfileId={setActiveProfileId}
        activeTab="overview"
        setActiveTab={setActiveTab}
      />
    );

    // Check accessible heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/PureAir AI/i);

    // Check accessible navigation
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();

    // Check select controls have accessible labels
    expect(screen.getByLabelText(/select city/i)).toBeInTheDocument();
  });

  it('triggers tab switching on click', () => {
    const setActiveTab = vi.fn();

    render(
      <Header
        activeCity={CITIES[0]}
        setActiveCityId={vi.fn()}
        activeProfile={VULNERABILITY_PROFILES[0]}
        setActiveProfileId={vi.fn()}
        activeTab="overview"
        setActiveTab={setActiveTab}
      />
    );

    const routineTab = screen.getByRole('tab', { name: /routine planner/i });
    fireEvent.click(routineTab);
    expect(setActiveTab).toHaveBeenCalledWith('routine');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component - End-to-End Integration', () => {
  it('renders application with accessible skip link, banner, main region, and footer', () => {
    render(<App />);

    // Accessible skip link
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();

    // Banner & Main landmarks
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('navigates seamlessly between tabs', () => {
    render(<App />);

    // Click on Routine Planner tab
    const routineTab = screen.getByRole('tab', { name: /routine planner/i });
    fireEvent.click(routineTab);

    // Verify Routine Planner region rendered
    expect(screen.getByRole('region', { name: /inversion-aware daily routine/i })).toBeInTheDocument();

    // Click on IAQ tab
    const iaqTab = screen.getByRole('tab', { name: /indoor hacks & diy/i });
    fireEvent.click(iaqTab);
    expect(screen.getByRole('region', { name: /indoor air quality/i })).toBeInTheDocument();
  });
});

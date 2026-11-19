import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DiurnalChart from './DiurnalChart';
import { CITIES } from '../data/mockData';

describe('DiurnalChart Component', () => {
  it('renders 24-hour diurnal curve and selects hours via mouse or keyboard', () => {
    render(<DiurnalChart activeCity={CITIES[0]} />);

    // Assert section heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/24-Hour Thermal Inversion & Smog Curve/i);

    // Assert buttons for hourly data points
    const hourBars = screen.getAllByRole('button');
    expect(hourBars.length).toBeGreaterThan(0);

    // Simulate keydown on first bar
    fireEvent.keyDown(hourBars[0], { key: 'Enter' });
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Simulate space key
    fireEvent.keyDown(hourBars[1], { key: ' ' });

    // Simulate mouseEnter and click
    fireEvent.mouseEnter(hourBars[2]);
    fireEvent.click(hourBars[3]);
  });
});

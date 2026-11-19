import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component - End-to-End Integration', () => {
  it('renders application with accessible skip link, banner, main region, and footer', () => {
    render(<App />);

    // Accessible skip link
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();

    // Landmark regions
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('shows the PureAir AI h1 heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /PureAir AI/i })).toBeInTheDocument();
  });

  it('renders navigation tablist', () => {
    render(<App />);
    expect(screen.getByRole('tablist', { name: /PureAir AI Feature Tabs/i })).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(6);
  });

  it('shows overview callout cards on the default landing tab', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /open inversion-shifted routine planner/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open diy corsi-rosenthal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open pureair genai/i })).toBeInTheDocument();
  });

  it('navigates to Routine Planner tab with lazy-loading', async () => {
    render(<App />);

    const routineTab = screen.getByRole('tab', { name: /routine planner/i });
    fireEvent.click(routineTab);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /inversion-aware daily routine/i })).toBeInTheDocument();
    });
  });

  it('navigates to IAQ Studio tab', async () => {
    render(<App />);

    const iaqTab = screen.getByRole('tab', { name: /indoor hacks/i });
    fireEvent.click(iaqTab);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /indoor air quality/i })).toBeInTheDocument();
    });
  });

  it('navigates to Impact Dashboard tab', async () => {
    render(<App />);

    const impactTab = screen.getByRole('tab', { name: /direct impact/i });
    fireEvent.click(impactTab);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /direct impact engine/i })).toBeInTheDocument();
    });
  });

  it('navigates to Community Network tab', async () => {
    render(<App />);

    const communityTab = screen.getByRole('tab', { name: /community shield/i });
    fireEvent.click(communityTab);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /neighborhood smog shield/i })).toBeInTheDocument();
    });
  });

  it('navigates to PureAir AI Assistant tab', async () => {
    render(<App />);

    const assistantTab = screen.getByRole('tab', { name: /genai assistant/i });
    fireEvent.click(assistantTab);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /pureair genai/i })).toBeInTheDocument();
    });
  });

  it('overview callout button navigates to routine tab on click', async () => {
    render(<App />);

    const callout = screen.getByRole('button', { name: /open inversion-shifted routine planner/i });
    fireEvent.click(callout);

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /inversion-aware daily routine/i })).toBeInTheDocument();
    });
  });
});

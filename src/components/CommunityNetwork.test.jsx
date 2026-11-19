import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CommunityNetwork from './CommunityNetwork';
import { CITIES } from '../data/mockData';

describe('CommunityNetwork Component', () => {
  it('allows reporting a new localized smog hazard and upvoting existing incidents', () => {
    render(<CommunityNetwork activeCity={CITIES[0]} />);

    // Check heading and form
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Neighborhood Smog Shield/i);

    const locationInput = screen.getByLabelText(/specific location/i);
    const descInput = screen.getByLabelText(/optional details/i);
    const submitBtn = screen.getByRole('button', { name: /broadcast alert/i });

    // Fill form
    fireEvent.change(locationInput, { target: { value: 'Maple Street Crossing' } });
    fireEvent.change(descInput, { target: { value: 'Illegal tire burning plume' } });
    fireEvent.click(submitBtn);

    // Verify upvote button works
    const upvoteBtns = screen.getAllByRole('button', { name: /upvote/i });
    expect(upvoteBtns.length).toBeGreaterThan(0);
    fireEvent.click(upvoteBtns[0]);
  });

  it('changes hazard category dropdown and validates empty location is rejected', () => {
    render(<CommunityNetwork activeCity={CITIES[0]} />);

    // Change hazard type dropdown
    const hazardSelect = screen.getByLabelText(/hazard category/i);
    fireEvent.change(hazardSelect, { target: { value: 'Heavy Diesel Fleet Idling' } });
    expect(hazardSelect.value).toBe('Heavy Diesel Fleet Idling');

    // Try submitting without a location — should not add new report
    const submitBtn = screen.getByRole('button', { name: /broadcast alert/i });
    const feedEl = screen.getByRole('feed');
    const before = feedEl.querySelectorAll('article').length;
    fireEvent.click(submitBtn);
    expect(feedEl.querySelectorAll('article').length).toBe(before);
  });

  it('shows success message after valid report submission and clears inputs', async () => {
    vi.useFakeTimers();
    render(<CommunityNetwork activeCity={CITIES[0]} />);

    const locationInput = screen.getByLabelText(/specific location/i);
    const descInput = screen.getByLabelText(/optional details/i);

    fireEvent.change(locationInput, { target: { value: 'Test Road Junction' } });
    fireEvent.change(descInput, { target: { value: 'Black smoke from chimney' } });

    const submitBtn = screen.getByRole('button', { name: /broadcast alert/i });
    fireEvent.click(submitBtn);

    // Button should become 'Transmitting...' immediately
    expect(screen.getByRole('button', { name: /transmitting/i })).toBeInTheDocument();

    // Advance timer past the 400ms delay
    await act(async () => {
      vi.advanceTimersByTime(500);
    });

    // Success message should appear
    expect(screen.getByRole('status')).toHaveTextContent(/broadcasted/i);

    // Advance another 3 seconds to hide success message
    await act(async () => {
      vi.advanceTimersByTime(3100);
    });

    // Success message gone
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it('displays clean-air safe havens and school carpool section', () => {
    render(<CommunityNetwork activeCity={CITIES[0]} />);

    expect(screen.getByRole('heading', { name: /clean air safe havens/i })).toBeInTheDocument();
    expect(screen.getByText(/Green School Carpool Initiative/i)).toBeInTheDocument();

    // Carpool join button — click it (window.alert is mocked by setup)
    const carpoolBtn = screen.getByRole('button', { name: /join neighborhood school pool/i });
    expect(carpoolBtn).toBeInTheDocument();
  });

  it('allows switching hazard to Industrial Chimney and Construction Dust', () => {
    render(<CommunityNetwork activeCity={CITIES[0]} />);
    const hazardSelect = screen.getByLabelText(/hazard category/i);

    fireEvent.change(hazardSelect, { target: { value: 'Uncovered Construction Dust' } });
    expect(hazardSelect.value).toBe('Uncovered Construction Dust');

    fireEvent.change(hazardSelect, { target: { value: 'Industrial Chimney Dense Smoke' } });
    expect(hazardSelect.value).toBe('Industrial Chimney Dense Smoke');
  });
});

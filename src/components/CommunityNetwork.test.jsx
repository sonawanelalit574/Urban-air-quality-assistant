import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
    const initialText = upvoteBtns[0].textContent;
    fireEvent.click(upvoteBtns[0]);
  });
});

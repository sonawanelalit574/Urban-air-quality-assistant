import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PureAirAssistant from './PureAirAssistant';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

describe('PureAirAssistant Component', () => {
  it('renders initial welcome message and allows asking questions via input and quick prompt chips', async () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    // Initial greeting check
    expect(screen.getByText(/Hello! I am/i)).toBeInTheDocument();

    // Click a suggested scenario chip
    const chip = screen.getByRole('button', { name: /how do i build a \$35 corsi-rosenthal/i });
    fireEvent.click(chip);

    // Verify response is rendered
    await waitFor(() => {
      expect(screen.getByText(/Corsi-Rosenthal \(C-R\) Box/i)).toBeInTheDocument();
    });
  });
});

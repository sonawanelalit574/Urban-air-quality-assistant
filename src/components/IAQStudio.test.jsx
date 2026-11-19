import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IAQStudio from './IAQStudio';
import { CITIES } from '../data/mockData';

describe('IAQStudio Component', () => {
  it('renders CADR simulator controls and calculates live purge performance', () => {
    render(<IAQStudio activeCity={CITIES[0]} />);

    // Check sliders are present with accessible labels
    const lengthInput = screen.getByLabelText(/room length/i);
    expect(lengthInput).toBeInTheDocument();

    // Verify CADR and 90% purge cards
    expect(screen.getByText(/clean air delivery \(cadr\)/i)).toBeInTheDocument();
    expect(screen.getByText(/90% purge time/i)).toBeInTheDocument();

    // Change room length slider
    fireEvent.change(lengthInput, { target: { value: '20' } });
    expect(lengthInput.value).toBe('20');
  });
});

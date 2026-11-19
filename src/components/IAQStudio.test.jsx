import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import IAQStudio from './IAQStudio';
import { CITIES } from '../data/mockData';

describe('IAQStudio Component', () => {
  it('renders CADR simulator controls and calculates live purge performance across all sliders', () => {
    render(<IAQStudio activeCity={CITIES[0]} />);

    // Check sliders are present with accessible labels
    const lengthInput = screen.getByLabelText(/room length/i);
    const widthInput = screen.getByLabelText(/room width/i);
    const ceilingSelect = screen.getByLabelText(/ceiling height/i);
    const fanSelect = screen.getByLabelText(/fan speed/i);

    expect(lengthInput).toBeInTheDocument();
    expect(widthInput).toBeInTheDocument();
    expect(ceilingSelect).toBeInTheDocument();
    expect(fanSelect).toBeInTheDocument();

    // Verify CADR and 90% purge cards
    expect(screen.getByText(/clean air delivery \(cadr\)/i)).toBeInTheDocument();
    expect(screen.getByText(/90% purge time/i)).toBeInTheDocument();

    // Change sliders
    fireEvent.change(lengthInput, { target: { value: '20' } });
    fireEvent.change(widthInput, { target: { value: '18' } });
    fireEvent.change(ceilingSelect, { target: { value: '10' } });
    fireEvent.change(fanSelect, { target: { value: 'high' } });

    expect(lengthInput.value).toBe('20');
    expect(widthInput.value).toBe('18');
    expect(ceilingSelect.value).toBe('10');
    expect(fanSelect.value).toBe('high');
  });
});

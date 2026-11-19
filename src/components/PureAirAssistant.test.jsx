import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PureAirAssistant from './PureAirAssistant';
import { CITIES, VULNERABILITY_PROFILES } from '../data/mockData';

// vi.mock must be at top level (gets hoisted by Vitest)
vi.mock('../services/geminiAgent', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    executeAgentQuery: vi.fn().mockImplementation(original.executeAgentQuery),
  };
});

describe('PureAirAssistant Component', () => {
  it('renders initial welcome message and allows asking questions via quick prompt chips', async () => {
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

  it('allows typing a custom query and submitting via input form', async () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    const input = screen.getByLabelText(/ask pureair ai/i);
    fireEvent.change(input, { target: { value: 'What masks are best for smog?' } });
    expect(input.value).toBe('What masks are best for smog?');

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendBtn);

    // Wait for user message to appear in log
    await waitFor(() => {
      expect(screen.getByText(/What masks are best for smog\?/i)).toBeInTheDocument();
    });
  });

  it('shows the GenAI agent heading and tool-orchestrated badge', () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    expect(screen.getByRole('heading', { level: 2, name: /pureair genai agent/i })).toBeInTheDocument();
    expect(screen.getByText(/Tool-Orchestrated/i)).toBeInTheDocument();
  });

  it('renders all 4 quick-scenario suggestion chips', () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    const group = screen.getByRole('group', { name: /suggested prompt/i });
    const chips = Array.from(group.querySelectorAll('button'));
    expect(chips.length).toBe(4);
  });

  it('shows chat message log region with correct ARIA attributes', () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    const log = screen.getByRole('log');
    expect(log).toHaveAttribute('aria-live', 'polite');
    expect(log).toHaveAttribute('aria-label', 'Conversation with PureAir AI');
  });

  it('renders labeled input and send button', () => {
    render(
      <PureAirAssistant
        activeCity={CITIES[0]}
        activeProfile={VULNERABILITY_PROFILES[0]}
      />
    );

    expect(screen.getByLabelText(/ask pureair ai/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});

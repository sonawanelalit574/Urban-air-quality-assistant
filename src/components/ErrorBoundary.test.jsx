import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild() {
  throw new Error('Test Failure Explosion');
}

describe('ErrorBoundary Component', () => {
  it('catches runtime errors and renders accessible fallback UI', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    // componentDidCatch should have been called → console.error invoked
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  it('renders children normally when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div data-testid="healthy-child">Working fine</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('healthy-child')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders reload button in error state', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const reloadBtn = screen.getByRole('button', { name: /reload assistant/i });
    expect(reloadBtn).toBeInTheDocument();

    spy.mockRestore();
  });
});

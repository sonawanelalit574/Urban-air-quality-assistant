import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock fetch globally if not present
if (!global.fetch) {
  global.fetch = vi.fn();
}

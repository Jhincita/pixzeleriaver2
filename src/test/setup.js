import '@testing-library/jest-dom';
import { vi } from 'vitest';

global.confirm = vi.fn(() => true);
global.alert = vi.fn();
import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import Toasts from '../Toasts.svelte';
import { flushSync } from 'svelte';

describe('Test Toasts', () => {
    afterAll(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it('Test publish', async () => {
        vi.mock('../../lib/Store.js', () => ({
            subscribe: vi.fn((event, callback) => {
                if (event === 'toasts') {
                    // Simulate calling the callback function with mock data
                    callback({ type: 'info', content: 'Test toast message' });
                }

                // Return an unsubscribe function
                return vi.fn();
            }),
        }));

        await render(Toasts);

        flushSync();

        const toast = screen.getByTestId('toast-box');

        expect(toast).toBeInTheDocument();
        expect(toast).toHaveClass('bg-secondary');
        expect(toast).toHaveStyle('color: rgb(255, 255, 255)');

        const icon = screen.getByTestId('toast-icon');

        expect(icon).toHaveClass('fa-circle-info');
    });

    it('Test publish and wait for it to go away', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });

        vi.mock('../../lib/Store.js', () => ({
            subscribe: vi.fn((event, callback) => {
                if (event === 'toasts') {
                    // Simulate calling the callback function with mock data
                    callback({ type: 'info', content: 'Test toast message' });
                }

                // Return an unsubscribe function
                return vi.fn();
            }),
        }));

        await render(Toasts);

        vi.advanceTimersByTime(60000);

        const toast = screen.queryByText('Test toast message');

        expect(toast).not.toBeInTheDocument();
    });
});

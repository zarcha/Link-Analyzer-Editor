import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import Toasts from '../Toasts.svelte';

describe('Test Toasts', () => {
    afterAll(() => {
        vi.clearAllMocks();
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

        const toast = screen.getByText('Test toast message');

        expect(toast).toBeInTheDocument();
    });

    // it('Test toast goes away after 5s', async () => {
    //     vi.mock('../../lib/Store.js', () => ({
    //         subscribe: vi.fn((event, callback) => {
    //             if (event === 'toasts') {
    //                 // Simulate calling the callback function with mock data
    //                 callback({ type: 'info', content: 'Test toast message' });
    //             }
    //
    //             // Return an unsubscribe function
    //             return vi.fn();
    //         })
    //     }));
    //
    //     await render(Toasts);
    //     vi.useFakeTimers();
    //
    //     await vi.advanceTimersByTime(60000);
    //
    //     flushSync();
    //     const toast = screen.queryByText("Test toast message");
    //
    //     expect(toast).not.toBeInTheDocument();
    // });
});

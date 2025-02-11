import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import Search from '../Search.svelte';
import LinkAnalyzer from '../../../lib/LinkAnalyzer';

describe('Verify search works', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    it('Does pressing search call filter', async () => {
        const filter = vi.fn();

        await render(Search, {
            props: {
                filter,
            },
        });

        const searchButton = screen.getByText('Search');

        await searchButton.click();

        expect(filter).toHaveBeenCalled();
    });

    it('Input is populated with id from chip', async () => {
        vi.mock('../../../lib/LinkAnalyzer');
        LinkAnalyzer.writeSync = vi.fn().mockResolvedValue('011100000100');
        const filter = vi.fn();

        await render(Search, {
            props: {
                port: {
                    connected: true,
                },
                filter,
            },
        });

        const readButton = screen.getByText('Read');

        await readButton.click();

        expect(filter).toHaveBeenCalledWith('131');
    });
});

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import smallChipList from './resources/smallChipList.json';
import { flushSync } from 'svelte';
import ChipLibrary from '../ChipLibrary.svelte';
import { publish } from '../../lib/Store.js';
import axios from 'axios';

describe('Test chip library', async () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Will publish when axios errors', async () => {
        vi.mock('../../lib/Store.js');
        publish.default = vi.fn().mockReturnThis({});

        vi.mock('../../component/library/Chip.svelte');
        vi.mock('../../component/library/Search.svelte');

        vi.mock('axios');
        axios.get.mockResolvedValue({});

        await render(ChipLibrary);

        flushSync();

        expect(publish).toHaveBeenCalled();
    });

    it('Will load 10 chips', async () => {
        vi.mock('../../lib/Store.js', () => ({
            publish: vi.fn().mockReturnValue({}),
        }));

        vi.mock('../../component/library/Chip.svelte');
        vi.mock('../../component/library/Search.svelte');

        vi.mock('axios');
        axios.get.mockResolvedValue({
            data: smallChipList,
            headers: {
                'content-type': 'application/json',
            },
        });

        await render(ChipLibrary);

        flushSync();

        const chips = screen.getAllByTestId('mocked-chip');

        expect(chips.length).toBe(10);
    });
});

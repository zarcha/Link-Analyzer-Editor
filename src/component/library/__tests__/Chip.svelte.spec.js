import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import Chip from '../Chip.svelte';
import axios from 'axios';
import { flushSync } from 'svelte';
import chipImg from './resources/chipImg.js';

const chipInfo = {
    name: 'Cannon',
    class: 'Standard',
    id: 1,
    pet: {
        type: '',
        damage: 30,
        affect: '',
    },
    bcs: {
        type: '',
        damage: 60,
        affect: '',
    },
    gba: {
        type: '',
        damage: 0,
        affect: '',
    },
};

describe('Test Chip', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    it('Chip shows existing info', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({
            data: chipImg,
            headers: {
                'content-type': 'image/png',
            },
        });

        await render(Chip, {
            props: {
                chipInfo,
            },
        });

        let tmp = screen.getByText(chipInfo.name.toUpperCase());
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(chipInfo.class);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(chipInfo.id);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(chipInfo.pet.damage);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(chipInfo.bcs.damage);
        expect(tmp).toBeInTheDocument();
    });

    it('Chip shows no data for GBA', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({
            data: chipImg,
            headers: {
                'content-type': 'image/png',
            },
        });

        await render(Chip, {
            props: {
                chipInfo,
            },
        });

        const noData = screen.getByText('No Data');

        expect(noData).toBeInTheDocument();
    });

    it('Shows no data when image fails', async () => {
        vi.mock('axios');
        axios.get = vi.fn().mockRejectedValue('Failed to get image');

        await render(Chip, {
            props: {
                chipInfo,
            },
        });

        flushSync();

        const images = screen.getAllByRole('img');
        expect(images[0].src).toBe('http://localhost:3000/images/no-data.png');
    });

    it('Shows no data when image content-type is wrong', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({
            headers: {
                'content-type': 'bad',
            },
        });

        await render(Chip, {
            props: {
                chipInfo,
            },
        });

        flushSync();

        const images = screen.getAllByRole('img');
        expect(images[0].src).toBe('http://localhost:3000/images/no-data.png');
    });
});

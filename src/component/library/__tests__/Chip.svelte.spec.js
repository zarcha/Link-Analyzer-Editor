import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import Chip from '../Chip.svelte';
import axios from 'axios';
import { flushSync } from 'svelte';
import chipImg from './resources/chipImg.js';

const populatedChipInfo = {
    name: 'Cannon',
    class: 'Standard',
    id: 1,
    pet: {
        type: 'pet type',
        damage: 30,
        affect: 'pet affect',
    },
    bcs: {
        type: 'bcs type',
        damage: 60,
        affect: 'bcs affect',
    },
    gba: {
        type: 'gba type',
        damage: 90,
        affect: 'gba affect',
    },
};

const emptyChipInfo = {
    name: 'Cannon',
    class: 'Standard',
    id: 1,
    pet: {
        type: '',
        damage: 0,
        affect: '',
    },
    bcs: {
        type: '',
        damage: 0,
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
                chipInfo: populatedChipInfo,
            },
        });

        let tmp = screen.getByText(populatedChipInfo.name.toUpperCase());
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(populatedChipInfo.class);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(populatedChipInfo.id);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(populatedChipInfo.pet.damage);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(populatedChipInfo.bcs.damage);
        expect(tmp).toBeInTheDocument();

        tmp = screen.getByText(populatedChipInfo.gba.damage);
        expect(tmp).toBeInTheDocument();
    });

    it('Chip shows no data for fields', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({
            data: chipImg,
            headers: {
                'content-type': 'image/png',
            },
        });

        await render(Chip, {
            props: {
                chipInfo: emptyChipInfo,
            },
        });

        let tmp = screen.queryByText(populatedChipInfo.pet.damage);
        expect(tmp).not.toBeInTheDocument();

        tmp = screen.queryByText(populatedChipInfo.pet.type);
        expect(tmp).not.toBeInTheDocument();

        tmp = screen.queryByText(populatedChipInfo.bcs.damage);
        expect(tmp).not.toBeInTheDocument();

        tmp = screen.queryByText(populatedChipInfo.bcs.type);
        expect(tmp).not.toBeInTheDocument();

        tmp = screen.queryByText(populatedChipInfo.gba.damage);
        expect(tmp).not.toBeInTheDocument();

        tmp = screen.queryByText(populatedChipInfo.gba.type);
        expect(tmp).not.toBeInTheDocument();
    });

    it('Shows no data when image fails', async () => {
        vi.mock('axios');
        axios.get = vi.fn().mockRejectedValue('Failed to get image');

        await render(Chip, {
            props: {
                chipInfo: populatedChipInfo,
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
                chipInfo: populatedChipInfo,
            },
        });

        flushSync();

        const images = screen.getAllByRole('img');
        expect(images[0].src).toBe('http://localhost:3000/images/no-data.png');
    });
});

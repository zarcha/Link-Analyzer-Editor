import { describe, it, vi, expect } from 'vitest';
import { screen, render } from '@testing-library/svelte';
import ImageField from '../ImageField.svelte';
import imgUtil from '../../../lib/imgUtil.js';
import FileUtil from '../../../lib/fileUtil.js';
import { publish } from '../../../lib/store.js';

const imageHex =
    '0000C014000000330078001D00900029007E0F3580337D3900EE9A35C051F5398028E01BE0C53F0F10FCDF0748F8BF2F3CF01F0F20705E2F108C7E1F089D8E2F84EABE3F1ED4C71F08E857140494FF14028AC7330701331F88808E0F3C00FD272080CA171040A1131000B00BC801AD2BB8CC0329C82B0125';

describe('Test image field', () => {
    it('Image field shows', async () => {
        vi.mock('../../../lib/imgUtil.js');
        imgUtil.createImageFromHex = vi.fn().mockResolvedValue({});

        await render(ImageField, {
            props: {
                name: 'Cross Sprite',
                value: imageHex,
            },
        });

        const name = screen.getByText('Cross Sprite');

        expect(name).toBeInTheDocument();
    });

    it('Uploads an image', async () => {
        vi.mock('../../../lib/store.js');
        publish.default = vi.fn().mockReturnValue({});

        vi.mock('../../../lib/imgUtil.js');
        imgUtil.createImageFromHex = vi.fn().mockResolvedValue({
            displayImage: ' ',
            rawImage: ' ',
        });

        vi.mock('../../../lib/fileUtil.js');
        FileUtil.openImage = vi.fn().mockResolvedValue(imageHex);

        await render(ImageField, {
            props: {
                name: 'Cross Sprite',
                value: imageHex,
            },
        });

        const uploadBtn = screen.getByText('Upload');
        await uploadBtn.click();

        expect(publish).toHaveBeenCalledWith('toasts', {
            content: 'New [Cross Sprite] sprite uploaded.',
            type: 'success',
        });
    });

    it('Saves an image', async () => {
        vi.mock('../../../lib/store.js');
        publish.default = vi.fn().mockReturnValue({});

        vi.mock('../../../lib/imgUtil.js');
        imgUtil.createImageFromHex = vi.fn().mockResolvedValue({
            displayImage: ' ',
            rawImage: {
                clone: vi.fn().mockResolvedValue({}),
            },
        });

        vi.mock('../../../lib/fileUtil.js');
        FileUtil.saveImage = vi.fn().mockResolvedValue('Cross-Sprite.bmp');

        await render(ImageField, {
            props: {
                name: 'Cross Sprite',
                value: imageHex,
            },
        });

        const saveBtn = screen.getByText('Save BMP');
        await saveBtn.click();

        expect(publish).toHaveBeenCalledWith('toasts', {
            content: '[Cross Sprite] sprite downloaded as Cross-Sprite.bmp',
            type: 'success',
        });
    });

    it('Saves an image with error causes error publish', async () => {
        vi.mock('../../../lib/store.js');
        publish.default = vi.fn().mockReturnValue({});

        vi.mock('../../../lib/imgUtil.js');
        imgUtil.createImageFromHex = vi.fn().mockResolvedValue({
            displayImage: ' ',
            rawImage: {
                clone: vi.fn().mockResolvedValue({}),
            },
        });

        vi.mock('../../../lib/fileUtil.js');
        FileUtil.saveImage = vi.fn().mockRejectedValue('Failed to save image');

        await render(ImageField, {
            props: {
                name: 'Cross Sprite',
                value: imageHex,
            },
        });

        const saveBtn = screen.getByText('Save BMP');
        await saveBtn.click();

        expect(publish).toHaveBeenCalledWith('toasts', { content: 'Failed to save image', type: 'error' });
    });

    it('Opens an image with error causes error publish', async () => {
        vi.mock('../../../lib/store.js');
        publish.default = vi.fn().mockReturnValue({});

        vi.mock('../../../lib/imgUtil.js');
        imgUtil.createImageFromHex = vi.fn().mockResolvedValue({
            displayImage: ' ',
            rawImage: ' ',
        });

        vi.mock('../../../lib/fileUtil.js');
        FileUtil.openImage = vi.fn().mockRejectedValue('Failed to open image');

        await render(ImageField, {
            props: {
                name: 'Cross Sprite',
                value: imageHex,
            },
        });

        const uploadBtn = screen.getByText('Upload');
        await uploadBtn.click();

        expect(publish).toHaveBeenCalledWith('toasts', { content: 'Failed to open image', type: 'error' });
    });
});

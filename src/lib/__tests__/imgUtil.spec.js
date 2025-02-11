import { expect, it, describe } from 'vitest';
import imgUtil from '../imgUtil';
import spriteImg from './resources/spriteImg.js';

const hexImage =
    '0000C014000000330078001D00900029007E0F3580337D3900EE9A35C051F5398028E01BE0C53F0F10FCDF0748F8BF2F3CF01F0F20705E2F108C7E1F089D8E2F84EABE3F1ED4C71F08E857140494FF14028AC7330701331F88808E0F3C00FD272080CA171040A1131000B00BC801AD2BB8CC0329C82B0125';

describe('Test imgUtil', () => {
    it('Convert image to hex', async () => {
        const hex = await imgUtil.createHexFromImage(spriteImg.buffer);
        expect(hex).toBe(hexImage);
    });

    it('Convert hex to image', async () => {
        const image = await imgUtil.createImageFromHex(hexImage);

        expect(image.dispalyImg).not.toBeNull();
        expect(image.rawImage).not.toBeNull();
    });
});

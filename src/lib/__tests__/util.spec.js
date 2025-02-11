import { expect, it, describe } from 'vitest';
import { hex2int, int2hex, hex2bin, bin2hex, flipEndainess, delay } from '../util.js';

describe('Test Util File', () => {
    it('Convert hex to int big endainess', () => {
        expect(hex2int('FF00')).toBe(65280);
    });

    it('Convert hex to int little endainess', () => {
        expect(hex2int('FF00', true)).toBe(255);
    });

    it('Convert non-hex to int', () => {
        try {
            hex2int(25);
        } catch (error) {
            expect(error.message).toBe('Input must be a valid hexadecimal string.');
        }
    });

    it('Convert 1 char hex to int', () => {
        try {
            hex2int('F');
        } catch (error) {
            expect(error.message).toBe('Hexadecimal string length must be even.');
        }
    });

    it('Convert int to hex big endainess', () => {
        expect(int2hex(255)).toBe('FF');
    });

    it('Convert int to hex little endainess', () => {
        expect(int2hex(255, true)).toBe('FF');
    });

    it('Convert int to hex small number', () => {
        expect(int2hex(1)).toBe('01');
    });

    it('Convert non-int to hex', () => {
        try {
            int2hex('F');
        } catch (error) {
            expect(error.message).toBe('Input must be an integer.');
        }
    });

    it('Convert negative int to hex', () => {
        try {
            int2hex(-1);
        } catch (error) {
            expect(error.message).toBe('This function does not support negative numbers for endianness conversion.');
        }
    });

    it('Convert hex to bin', () => {
        expect(hex2bin('FF')).toBe('11111111');
    });

    it('Convert bin to hex', () => {
        expect(bin2hex('11111111')).toBe('FF');
    });

    it('Flip endainess of bin', () => {
        expect(flipEndainess('11110000')).toBe('00001111');
    });

    it('Check delay for 1s', async () => {
        const start = Date.now();
        await delay(1000);
        expect(Date.now() - start).toBeGreaterThan(900);
    });
});

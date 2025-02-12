import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest';
import LinkAnalyzer from '../linkAnalyzer.js';
import { TextEncoder, TextDecoder } from 'node:util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe('Test Link Analyzer', () => {
    let serialPort;

    beforeEach(() => {
        serialPort = {
            open: vi.fn().mockResolvedValue({}),
            connected: true,
            writable: {
                getWriter: vi.fn().mockReturnValue({
                    write: vi.fn().mockReturnValue({}),
                    releaseLock: vi.fn(),
                }),
            },
            readable: {
                getReader: vi.fn().mockReturnValue({
                    read: vi.fn(async () => {
                        await new Promise((resolve) => setTimeout(resolve, 100));
                        return { value: new Uint8Array([118, 50, 46, 48, 46, 50, 13, 10]) };
                    }),
                    releaseLock: vi.fn(),
                }),
            },
        };

        Object.defineProperty(window.navigator, 'serial', {
            value: {
                getPorts: vi.fn().mockResolvedValue([]),
                requestPort: vi.fn().mockResolvedValue(serialPort),
            },
            configurable: true, // Allows redefining in different tests
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Connect to Link Analyzer', async () => {
        const port = await LinkAnalyzer.connect();
        expect(port.connected).toBe(true);
    });

    it('Does a write', async () => {
        const value = await LinkAnalyzer.write(serialPort, 'test');
        expect(value).toBe(true);
    });

    it('Does a read no timeout', async () => {
        const value = await LinkAnalyzer.read(serialPort);
        expect(value).toBe('v2.0.2');
    });

    it('Does a read with short timeout', async () => {
        try {
            await LinkAnalyzer.read(serialPort, 1);
        } catch (error) {
            expect(error.message).toBe('Timed out reading for 0.001s');
        }
    });

    it('Does a read/write sync', async () => {
        const value = await LinkAnalyzer.writeSync(serialPort, 'v2.0.2');
        expect(value).toBe('v2.0.2');
    });
});

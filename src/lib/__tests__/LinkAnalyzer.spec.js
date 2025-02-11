import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest';
import LinkAnalyzer from '../LinkAnalyzer.js';
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
                    read: vi.fn().mockReturnValue({ value: new Uint8Array([118, 50, 46, 48, 46, 50, 13, 10]) }),
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

    it('Does write', async () => {
        const value = await LinkAnalyzer.write(serialPort, 'test');
        expect(value).toBe(true);
    });

    it('Does read no timeout', async () => {
        const value = await LinkAnalyzer.read(serialPort);
        expect(value).toBe('v2.0.2');
    });

    // it('Does read with timeout', async () => {
    //     try {
    //         await LinkAnalyzer.read(serialPort);
    //     }catch(error){
    //         expect(error).toBe("");
    //     }
    // });

    it('Does read/write sync', async () => {
        const value = await LinkAnalyzer.writeSync(serialPort, 'v2.0.2');
        expect(value).toBe('v2.0.2');
    });
});

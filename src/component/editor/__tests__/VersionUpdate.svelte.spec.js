import { render, screen } from '@testing-library/svelte';
import axios from 'axios';
import { expect, it, describe, vi, afterEach } from 'vitest';
import VersionUpdate from '../VersionUpdate.svelte';
import LinkAnalyzer from '../../../lib/LinkAnalyzer';
import { flushSync } from 'svelte';

describe('Test version update warning', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Verify warning does show if versions dont match', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({ data: [{ name: 'v2.0.2' }] });
        vi.mock('../../../lib/LinkAnalyzer');
        LinkAnalyzer.writeSync = vi.fn().mockResolvedValue('v2.0.1');
        await render(VersionUpdate, {
            props: {
                port: {
                    connected: true,
                },
            },
        });

        flushSync();

        const message = screen.getByText('Your Link Analyzer is not up to date!');

        expect(message).toBeInTheDocument();
    });

    it('Verify warning does show if versions dont match', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({ data: [{ name: 'v2.0.2' }] });
        vi.mock('../../../lib/LinkAnalyzer');
        LinkAnalyzer.writeSync = vi.fn().mockResolvedValue('v2.0.2');

        await render(VersionUpdate, {
            props: {
                port: {
                    connected: true,
                },
            },
        });

        flushSync();

        const message = screen.queryByText('Your Link Analyzer is not up to date!');

        expect(message).toBeNull();
    });

    it('Makes sure open firmware works', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({ data: [{ name: 'v2.0.2' }] });

        vi.mock('../../../lib/LinkAnalyzer');
        LinkAnalyzer.writeSync = vi.fn().mockResolvedValue('v2.0.1');

        vi.mock('window');
        window.open = vi.fn().mockReturnThis({
            focus: vi.fn(),
        });

        await render(VersionUpdate, {
            props: {
                port: {
                    connected: true,
                },
            },
        });

        flushSync();

        const downloadFirmwareBtn = screen.getByText('Download Firmware');
        await downloadFirmwareBtn.click();

        expect(window.open).toHaveBeenCalled();
    });

    it('Makes sure open firmware works', async () => {
        vi.mock('axios');
        axios.get.mockResolvedValue({ data: [{ name: 'v2.0.2' }] });

        vi.mock('../../../lib/LinkAnalyzer');
        LinkAnalyzer.writeSync = vi.fn().mockResolvedValue('v2.0.1');

        vi.mock('window');
        window.open = vi.fn().mockReturnThis({
            focus: vi.fn(),
        });

        await render(VersionUpdate, {
            props: {
                port: {
                    connected: true,
                },
            },
        });

        flushSync();

        const updateGuideBtn = screen.getByText('Update Guide');
        await updateGuideBtn.click();

        expect(window.open).toHaveBeenCalled();
    });
});

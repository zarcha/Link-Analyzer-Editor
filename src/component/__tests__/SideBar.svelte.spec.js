import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe, afterAll } from 'vitest';
import SideBar from '../SideBar.svelte';
import { flushSync } from 'svelte';
import LinkAnalyzer from '../../lib/LinkAnalyzer';
import { delay } from '../../lib/util.js';
import { publish } from '../../lib/Store.js';

describe('Test SideBar', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    it('Test serial doesnt exist', async () => {
        vi.mock('../../lib/Store.js');
        publish.default = vi.fn().mockRejectedValue('An error happened');

        await render(SideBar);

        const connect = screen.getByText('Connect');
        await connect.click();
        flushSync();

        expect(publish).toHaveBeenCalled();
    });

    it('Test connect button', async () => {
        Object.defineProperty(window.navigator, 'serial', {
            value: {},
            configurable: true, // Allows redefining in different tests
        });

        vi.mock('../../lib/LinkAnalyzer');
        LinkAnalyzer.connect = vi.fn().mockResolvedValue({
            close: vi.fn(),
            addEventListener: vi.fn(),
        });

        vi.mock('../../lib/util');
        delay.default = vi.fn().mockResolvedValue({});

        vi.mock('../../lib/Store.js');
        publish.default = vi.fn().mockReturnThis({});

        await render(SideBar, {
            props: {
                port: null,
                page: '',
            },
        });

        flushSync();

        const connect = screen.getByText('Connect');
        await connect.click();

        //Needs to wait because things dont render quick enough
        await new Promise((resolve) => setTimeout(resolve, 100));
        flushSync();

        const disconnect = screen.getByText('Disconnect');
        expect(disconnect).toBeInTheDocument();
    });

    it('Test connect button failure', async () => {
        Object.defineProperty(window.navigator, 'serial', {
            value: {},
            configurable: true, // Allows redefining in different tests
        });

        vi.mock('../../lib/LinkAnalyzer');
        LinkAnalyzer.connect = vi.fn().mockRejectedValue('Something went wrong');

        vi.mock('../../lib/Store.js');
        publish.default = vi.fn().mockReturnThis({});

        await render(SideBar, {
            props: {
                port: null,
                page: '',
            },
        });

        const connect = screen.getByText('Connect');
        await connect.click();
        flushSync();

        expect(publish).toHaveBeenCalled();
    });

    it('Test disconnect button', async () => {
        Object.defineProperty(window.navigator, 'serial', {
            value: {},
            configurable: true, // Allows redefining in different tests
        });

        vi.mock('../../lib/LinkAnalyzer');
        LinkAnalyzer.connect = vi.fn().mockResolvedValue({
            close: vi.fn(),
            addEventListener: vi.fn(),
        });

        // const connectSpy = vi.spyOn(LinkAnalyzer, "connect");

        vi.mock('../../lib/util');
        delay.default = vi.fn().mockResolvedValue({});

        vi.mock('../../lib/Store.js');
        publish.default = vi.fn().mockReturnThis({});

        await render(SideBar, {
            props: {
                port: {
                    close: vi.fn(),
                },
                page: '',
            },
        });

        const disconnect = screen.getByText('Disconnect');
        disconnect.click();
        flushSync();

        const connect = screen.getByText('Connect');
        expect(connect).toBeInTheDocument();
    });

    it('Clicking a new page should change page', async () => {
        const props = {
            port: {
                connected: true,
            },
            page: '',
        };

        await render(SideBar, {
            props,
        });

        const naviEditor = screen.getByText('Navi Editor');
        expect(naviEditor).toHaveClass('bg-warning');

        const library = screen.getByText('Chip Catalog');
        library.click();
        flushSync();

        expect(library).toHaveClass('bg-warning');
    });
});

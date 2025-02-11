import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe } from 'vitest';
import NaviEditorTopBar from '../NaviEditorTopBar.svelte';

describe('Tests Navi Editor Top Bar', () => {
    it('Verify buttons call functions', async () => {
        const props = {
            port: {
                connected: true,
            },
            hasNavi: true,
            loading: false,
            loadNavi: vi.fn(),
            writeNavi: vi.fn(),
            openNavi: vi.fn(),
            saveNavi: vi.fn(),
        };

        await render(NaviEditorTopBar, {
            props,
        });

        let tmp = screen.getByTestId('load-navi');
        await tmp.click();

        expect(props.loadNavi).toHaveBeenCalled();

        tmp = screen.getByTestId('write-navi');
        await tmp.click();

        expect(props.writeNavi).toHaveBeenCalled();

        tmp = screen.getByTestId('open-navi');
        await tmp.click();

        expect(props.openNavi).toHaveBeenCalled();

        tmp = screen.getByTestId('save-navi');
        await tmp.click();

        expect(props.saveNavi).toHaveBeenCalled();
    });

    it('Verify loading shows when needed', async () => {
        await render(NaviEditorTopBar, {
            props: {
                loading: false,
            },
        });

        let loading = screen.queryByTestId('loading-icon');

        expect(loading).not.toBeInTheDocument();

        await render(NaviEditorTopBar, {
            props: {
                loading: true,
            },
        });

        loading = screen.queryByTestId('loading-icon');

        expect(loading).toBeInTheDocument();
    });
});

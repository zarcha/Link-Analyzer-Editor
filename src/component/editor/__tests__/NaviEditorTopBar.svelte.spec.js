import { render, screen } from '@testing-library/svelte';
import { vi, expect, it, describe } from 'vitest';
import NaviEditorTopBar from '../NaviEditorTopBar.svelte';
import { flushSync } from 'svelte';

describe('Tests Navi Editor Top Bar', () => {
    it('Verify buttons call functions', async () => {
        const props = {
            port: {
                connected: true,
            },
            hasNavi: true,
            loading: false,
            unsaved: true,
            loadNavi: vi.fn(),
            writeNavi: vi.fn(),
            openNavi: vi.fn(),
            saveNavi: vi.fn(),
            undoChanges: vi.fn(),
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

        tmp = screen.getByTestId('undo-navi');
        await tmp.click();

        expect(props.undoChanges).toHaveBeenCalled();
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

    it('has buttons disabled when no port or navi exists', async () => {
        await render(NaviEditorTopBar);

        const loadNaviBtn = screen.getByTestId('load-navi');
        const writeNaviBtn = screen.getByTestId('write-navi');
        const saveNaviBtn = screen.getByTestId('save-navi');

        expect(loadNaviBtn).toHaveClass('disabled');
        expect(writeNaviBtn).toHaveClass('disabled');
        expect(saveNaviBtn).toHaveClass('disabled');
    });

    it('Undo button is disabled when no changes are staged', async () => {
        await render(NaviEditorTopBar, {
            props: {
                unsaved: false
            }
        });

        const undoChangesBtn = screen.getByTestId('undo-navi');
        expect(undoChangesBtn).toHaveClass('disabled');
    });

    it('Undo button is enabled when changes are staged', async () => {
        await render(NaviEditorTopBar, {
            props: {
                unsaved: true
            }
        });

        const undoChangesBtn = screen.getByTestId('undo-navi');
        expect(undoChangesBtn).not.toHaveClass('disabled');
    });
});

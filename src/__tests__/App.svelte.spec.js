import { describe, it, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/svelte';
import App from '../App.svelte';
import { flushSync } from 'svelte';

describe('Test App', () => {
    it('Tests that default components show', async () => {
        vi.mock('../component/SideBar.svelte');
        vi.mock('../component/Toasts.svelte');
        vi.mock('../pages/NaviEditor.svelte');
        await render(App);

        flushSync();

        const sidebar = screen.getByTestId('mocked-sidebar');
        const navieditor = screen.getByTestId('mocked-navieditor');
        const toasts = screen.getByTestId('mocked-toasts');

        expect(sidebar).toBeInTheDocument();
        expect(navieditor).toBeInTheDocument();
        expect(toasts).toBeInTheDocument();
    });
});

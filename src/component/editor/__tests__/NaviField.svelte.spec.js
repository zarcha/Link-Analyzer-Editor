import { render, screen } from '@testing-library/svelte';
import { expect, it, describe } from 'vitest';
import NaviField from '../NaviField.svelte';

describe('Test Navi Field', () => {
    it('Verify changing navi works', async () => {
        render(NaviField, {
            state: {
                value: 1,
            },
        });

        const option = screen.getByText('MegaMan');
        await option.click();

        const selected = screen.queryByRole('button');
        expect(selected).toHaveTextContent('MegaMan');
    });
});

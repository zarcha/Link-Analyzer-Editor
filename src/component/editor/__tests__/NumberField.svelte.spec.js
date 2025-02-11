import { fireEvent, render, screen } from '@testing-library/svelte';
import { expect, it, describe } from 'vitest';
import NumberField from '../NumberField.svelte';
import { flushSync } from 'svelte';

describe('Test NumberField', () => {
    it('Verify name shows in field-name', () => {
        render(NumberField, {
            props: {
                name: 'Navi HP',
                value: 100,
                maxValue: 255,
            },
        });

        const label = screen.getByTestId('field-name');
        expect(label).toHaveTextContent('Navi HP');
    });

    it('verify value shows up in input', () => {
        render(NumberField, {
            props: {
                name: 'Navi HP',
                value: 100,
                maxValue: 255,
            },
        });

        const input = screen.getByTestId('field-value');
        expect(input).toHaveValue(100);
    });

    it('makes sure invalid data is fagged', async () => {
        await render(NumberField, {
            props: {
                name: 'Navi HP',
                value: 256,
                maxValue: 255,
            },
        });

        flushSync();

        const input = screen.getByTestId('field-value');
        expect(input).toHaveClass('is-invalid');
    });

    it('changes input to be invalid', async () => {
        await render(NumberField, {
            props: {
                name: 'Navi HP',
                value: 254,
                maxValue: 255,
            },
        });

        flushSync();

        const input = screen.getByTestId('field-value');
        expect(input).not.toHaveClass('is-invalid');
        await fireEvent.input(input, { target: { value: 256 } });
        expect(input).toHaveClass('is-invalid');
        expect(input).toHaveValue(256);
    });
});

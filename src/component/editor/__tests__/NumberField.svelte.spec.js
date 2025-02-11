import { render, screen } from '@testing-library/svelte';
import { expect, it, describe } from 'vitest';
import NumberField from '../NumberField.svelte';

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
});

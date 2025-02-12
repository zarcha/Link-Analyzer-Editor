import { expect, it, describe } from 'vitest';
import { publish, subscribe } from '../store.js';

describe('Test event store', () => {
    it('Publish event and subscribe', () => {
        subscribe('test', (data) => {
            expect(data).toBe('test');
        });

        publish('test', 'test');
    });
});

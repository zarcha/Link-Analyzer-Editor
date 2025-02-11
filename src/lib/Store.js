import { writable } from 'svelte/store';

const eventBus = writable({});

export function publish(event, data) {
    eventBus.update((state) => {
        return { ...state, [event]: data };
    });
}

export function subscribe(event, callback) {
    const unsubscribe = eventBus.subscribe((state) => {
        if (state[event] !== undefined) {
            callback(state[event]);
        }
    });
    return unsubscribe;
}

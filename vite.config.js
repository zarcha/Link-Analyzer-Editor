import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['scripts/setupTests.js'],
        coverage: {
            reporter: ['lcov'],
            include: ['src/**'],
            exclude: ['**/__mocks__/**', '**/resources/**'],
        },
    },
    resolve: process.env.VITEST
        ? {
              conditions: ['browser'],
          }
        : undefined,
});

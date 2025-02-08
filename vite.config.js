import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
    base: process.env.BUILD_ENV ? '/' : '/Link-Analyzer-Editor/',
    plugins: [svelte()],
});

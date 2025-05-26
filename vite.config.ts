import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        assetsDir: './',
        outDir: 'root',
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
            },
        },
    },
});

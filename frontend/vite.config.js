import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Include if you're using React
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(), // Include if you're using React
    nodePolyfills({
      // Whether to polyfill specific globals
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
});
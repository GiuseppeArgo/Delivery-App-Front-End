import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins:
    [vue(),
    inject({
      $: 'jquery',
      jQuery: 'jquery',
      include: '**/*.scss',
    }),
    ],
  resolve: {
    alias: {
      '@fortawesome/fontawesome-free': '/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    },
  },
})
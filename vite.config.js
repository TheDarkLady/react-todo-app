import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   base: '/react-todo-app',
//   plugins: [react()],
//   build: {
//     outDir: 'build'
//   }
// })

import { VitePWA } from 'vite-plugin-pwa'
const manifestForPlugin = {
  registerType: 'prompt',
  includeAssests: ['logo-180x180.jpg', 'logo-192x192.jpg', 'logo-512x512.jpg'],
  manifest: {
    name: "Remindify",
    short_name: "Remindify",
    description: "Remindify is designed to help you manage your tasks, allowing you to stay focused on productivity without the hassle of tracking these tasks.",
    icons: [{
      src: '/logo-192x192.jpg',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'favicon'
    },
    {src: '/logo-512x512.jpg',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'favicon'
    },
    {
      src: '/logo-180x180.jpg',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'apple touch icon',
    },
    {
      src: '/logo-512x512.jpg',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    }
    ],
    theme_color: '#181818',
    background_color: '#181818',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});

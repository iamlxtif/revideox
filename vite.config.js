import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    write: {
      // Generate and emit the coi-serviceworker.js file during the build process
      // with the modified service worker code
      assets: (file) => {
        if (file.name === 'index.html') {
          const script = `
            (function() {
              const e = {
                shouldRegister: () => true,
                shouldDeregister: () => false,
                coepCredentialless: () => false,
                doReload: () => window.location.reload(),
                quiet: false,
              };
              const t = navigator;
              if (t.serviceWorker && t.serviceWorker.controller) {
                t.serviceWorker.controller.postMessage({
                  type: 'coepCredentialless',
                  value: e.coepCredentialless(),
                });
                if (e.shouldDeregister()) {
                  t.serviceWorker.controller.postMessage({
                    type: 'deregister',
                  });
                }
              }
              if (!(window.crossOriginIsolated !== false || !e.shouldRegister())) {
                if (!window.isSecureContext) {
                  !e.quiet && console.log('COOP/COEP Service Worker not registered, a secure context is required.');
                  return;
                }
                t.serviceWorker && t.serviceWorker.register(window.document.currentScript.src)
                  .then(n => {
                    !e.quiet && console.log('COOP/COEP Service Worker registered', n.scope);
                    n.addEventListener('updatefound', () => {
                      !e.quiet && console.log('Reloading page to make use of updated COOP/COEP Service Worker.');
                      e.doReload();
                    });
                    if (n.active && !t.serviceWorker.controller) {
                      !e.quiet && console.log('Reloading page to make use of COOP/COEP Service Worker.');
                      e.doReload();
                    }
                  })
                  .catch(n => {
                    !e.quiet && console.error('COOP/COEP Service Worker failed to register:', n);
                  });
              }
            })();
          `;
          const updatedHtml = file.contents
            .toString()
            .replace('<script src="coi-serviceworker.js"></script>', `<script>${script}</script>`);
          return {
            name: 'index.html',
            source: updatedHtml,
          };
        }
      },
    },
  },
})

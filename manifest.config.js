import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Better Filmweb',
  version: '1.0.0',
  description: 'Chrome web browser extension that extends Filmweb website functionalities.',
  action: { default_popup: 'index.html' },
  permissions: ['storage', 'tabs', 'activeTab'],
  host_permissions: ['https://www.filmweb.pl/*'],
  background: { service_worker: 'src/background/background.js', type: 'module' },
  content_scripts: [{
    matches: ['https://www.filmweb.pl/*'],
    js: ['src/content/content.js'],
    run_at: 'document_idle',
  }],
})

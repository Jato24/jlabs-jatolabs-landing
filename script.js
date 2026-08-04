// @ts-check
import { siteConfig } from './site-config.js';
import { bootstrap } from './scripts/app.js';

bootstrap({ root: document, view: window, config: siteConfig });

import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightDocSearchMeilisearch from 'starlight-docsearch-meilisearch';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Starlight DocSearch Meilisearch',
      defaultLocale: 'root', // optional
      locales: {
        root: {
          label: 'English',
          lang: 'en', // lang is required for root locales
        },
        vi: {
          label: 'Tiếng Việt',
          lang: 'vi',
        },
      },
      editLink: {
        baseUrl:
          'https://github.com/typesense/starlight-docsearch-typesense/edit/master/docs/',
      },
      plugins: [
        starlightDocSearchMeilisearch({
          clientOptionsModule: './src/config/docsearch.ts',
        }),
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: ['getting-started', 'configuration'],
        },
        {
          label: 'Guides',
          items: ['guides/typesense-docsearch-scraper'],
        },
      ],
      social: [
        {
          href: 'https://github.com/typesense/starlight-docsearch-typesense',
          icon: 'github',
          label: 'GitHub',
        },
      ],
    }),
  ],
});

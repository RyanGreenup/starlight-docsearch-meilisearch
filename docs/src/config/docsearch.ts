import type { DocSearchClientOptions } from 'starlight-docsearch-meilisearch';

export default {
  host: import.meta.env.PUBLIC_MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: import.meta.env.PUBLIC_MEILISEARCH_API_KEY || 'masterKey',
  indexUid: 'docs',
} satisfies DocSearchClientOptions;

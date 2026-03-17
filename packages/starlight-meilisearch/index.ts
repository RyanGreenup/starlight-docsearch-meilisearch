import type { StarlightPlugin } from '@astrojs/starlight/types';
import type { AstroUserConfig, ViteUserConfig } from 'astro';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'astro/zod';
import type { DocSearchOptions } from 'meilisearch-docsearch';

export type DocSearchClientOptions = Omit<
  DocSearchOptions,
  'container'
>;

export default function starlightDocSearchMeilisearch(
  userConfig: DocSearchUserConfig
): StarlightPlugin {
  const opts = DocSearchConfigSchema.parse(userConfig);
  return {
    name: 'starlight-docsearch-meilisearch',
    hooks: {
      'config:setup'({ addIntegration, config, logger, updateConfig }) {
        // If the user has already has a custom override for the Search component, don't override it.
        if (config.components?.Search) {
          logger.warn(
            'It looks like you already have a `Search` component override in your Starlight configuration.'
          );
          logger.warn(
            'To render `starlight-docsearch-meilisearch`, remove the override for the `Search` component.\n'
          );
        } else {
          // Otherwise, add the Search component override to the user's configuration.
          updateConfig({
            pagefind: false,
            components: {
              ...config.components,
              Search: 'starlight-docsearch-meilisearch/Search.astro',
            },
          });
        }

        // Add an Astro integration that injects a Vite plugin to expose
        // the DocSearch config via a virtual module.
        addIntegration({
          name: 'starlight-docsearch',
          hooks: {
            'astro:config:setup': ({ config, updateConfig }) => {
              updateConfig({
                vite: {
                  plugins: [vitePluginDocSearch(config.root, opts)],
                },
              } satisfies AstroUserConfig);
            },
          },
        });
      },
    },
  };
}

/** DocSearch configuration options. */
const DocSearchConfigSchema = z
  .object({
    /** The Meilisearch host URL, e.g. "http://localhost:7700" or "https://search.example.com". */
    host: z.string(),
    /** The Meilisearch API key (use a search-only key in production). */
    apiKey: z.string(),
    /** The Meilisearch index UID to search. */
    indexUid: z.string(),
    /**
     * Disable saving recent searches and favorites to the local storage.
     * @default false
     */
    disableUserPersonalization: z.boolean().optional(),
    /** An optional initial query to populate the search box with on first render. */
    initialQuery: z.string().optional(),
  })
  .strict()
  .or(
    z
      .object({
        /**
         * The path to a JavaScript or TypeScript file containing a default export of options to
         * pass to the DocSearch client.
         *
         * The value can be a path to a local JS/TS file relative to the root of your project,
         * e.g. `'/src/docsearch.js'`, or an npm module specifier for a package you installed,
         * e.g. `'@company/docsearch-config'`.
         *
         * Use `clientOptionsModule` when you need to configure options that are not serializable,
         * such as custom `searchParams` or other advanced options.
         *
         * When `clientOptionsModule` is set, all options must be set via the module file. Other
         * inline options passed to the plugin in `astro.config.mjs` will be ignored.
         *
         * @example
         * // astro.config.mjs
         * // ...
         * starlightDocSearchMeilisearch({ clientOptionsModule: './src/config/docsearch.ts' }),
         * // ...
         *
         * // src/config/docsearch.ts
         * import type { DocSearchClientOptions } from 'starlight-docsearch-meilisearch';
         *
         * export default {
         *   host: 'http://localhost:7700',
         *   apiKey: 'your-search-api-key',
         *   indexUid: 'docs',
         * } satisfies DocSearchClientOptions;
         */
        clientOptionsModule: z.string(),
      })
      .strict()
  );

type DocSearchUserConfig = z.infer<typeof DocSearchConfigSchema>;

/** Vite plugin that exposes the DocSearch config via virtual modules. */
function vitePluginDocSearch(
  root: URL,
  config: DocSearchUserConfig
): VitePlugin {
  const moduleId = 'virtual:starlight/docsearch-config';
  const resolvedModuleId = `\0${moduleId}`;

  const resolveId = (id: string, base = root) =>
    JSON.stringify(id.startsWith('.') ? resolve(fileURLToPath(base), id) : id);

  const moduleContent = `
	${
    'clientOptionsModule' in config
      ? `export { default } from ${resolveId(config.clientOptionsModule)};`
      : `export default ${JSON.stringify(config)};`
  }
	`;

  return {
    name: 'vite-plugin-starlight-docsearch-config',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined;
    },
  };
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number];

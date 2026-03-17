import { z } from 'astro/zod';

/**
 * Schema for the DocSearch modal's strings.
 *
 * Add this to your `src/content.config.ts`:
 *
 * ```js
 * import { defineCollection } from 'astro:content';
 * import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
 * import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
 * import { docSearchI18nSchema } from 'starlight-docsearch-meilisearch/schema';
 *
 * export const collections = {
 * 		docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
 * 		i18n: defineCollection({
 * 			loader: i18nLoader(),
 * 			schema: i18nSchema({ extend: docSearchI18nSchema() }),
 * 		}),
 * };
 * ```
 *
 * DocSearch uses a nested object structure.
 * This schema is a flattened version of DocSearch's `modal` translations.
 *
 * For example, customizing DocSearch labels looks like this
 * when using the component from JavaScript:
 *
 * ```js
 * {
 *    modal: {
 *      footer: {
 *        selectKeyAriaLabel: 'Return key',
 *      },
 *    },
 * },
 * ```
 *
 * In your Starlight translation files, set this using the object path inside `modal`
 * as the key for each string, prefixed with `docsearch`:
 *
 * ```json
 * {
 *   "docsearch.footer.selectKeyAriaLabel": "Return key"
 * }
 * ```
 */
export const docSearchI18nSchema = () =>
  z
    .object({
      // SEARCH BOX
      /** Default: `Search docs…` */
      'docsearch.searchBox.searchDocsPlaceHolder': z.string(),
      /** Default: `Clear the query` */
      'docsearch.searchBox.resetButtonTitle': z.string(),
      /** Default: `Clear the query` */
      'docsearch.searchBox.resetButtonAriaLabel': z.string(),
      /** Default: `Cancel` */
      'docsearch.searchBox.cancelButtonText': z.string(),
      /** Default: `Cancel` */
      'docsearch.searchBox.cancelButtonAriaLabel': z.string(),

      // FOOTER
      /** Default: `to select` */
      'docsearch.footer.selectText': z.string(),
      /** Default: `Enter key` */
      'docsearch.footer.selectKeyAriaLabel': z.string(),
      /** Default: `to navigate` */
      'docsearch.footer.navigateText': z.string(),
      /** Default: `Arrow up` */
      'docsearch.footer.navigateUpKeyAriaLabel': z.string(),
      /** Default: `Arrow down` */
      'docsearch.footer.navigateDownKeyAriaLabel': z.string(),
      /** Default: `to close` */
      'docsearch.footer.closeText': z.string(),
      /** Default: `Escape key` */
      'docsearch.footer.closeKeyAriaLabel': z.string(),
      /** Default: `Powered by` */
      'docsearch.footer.poweredByText': z.string(),
    })
    .partial();

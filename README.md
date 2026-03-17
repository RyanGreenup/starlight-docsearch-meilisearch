# Starlight DocSearch Meilisearch

> [!NOTE]
> This is a fork of [starlight-docsearch-typesense](https://github.com/typesense/starlight-docsearch-typesense) by Typesense, adapted to use [Meilisearch](https://www.meilisearch.com/) instead of Typesense as the search backend.

A Starlight plugin that integrates Meilisearch with the DocSearch interface to add lightning-fast, typo-tolerant search to your Starlight documentation site.

![Plugin demo](assets/screenshot.png 'Plugin demo')

## About Meilisearch & Starlight

[**Meilisearch**](https://www.meilisearch.com/) is an open-source, lightning-fast search engine that delivers instant, typo-tolerant results with minimal setup. It's an open source alternative to Algolia and an easier-to-use alternative to ElasticSearch.

[**Starlight**](https://starlight.astro.build/) is a documentation framework built on Astro, focused on performance, accessibility, and customization. It helps developers create elegant, content-rich documentation sites with ease.

Together, **Meilisearch**, **Starlight** and [**DocSearch**](https://github.com/nicepkg/docsearch) provide a seamless way to add powerful, blazingly-fast search to modern documentation websites.

## Indexing Your Documentation

To power the search experience, you'll need to index your site's content into Meilisearch.

The [`docs-scraper`](https://github.com/meilisearch/docs-scraper) is a crawler that scans your documentation pages, extracts structured content (like titles, headings, and paragraphs), and uploads it into your Meilisearch index.

You can run the scraper manually or automate it (e.g. via GitHub Actions) so that your search index stays up-to-date as your docs evolve.

## Getting Started

Check out the [Getting Started Guide](https://starlight-docsearch.typesense.org/) to add Meilisearch search to your Starlight site quickly.

## License

Licensed under the MIT License.

See [LICENSE](/LICENSE) for more information.

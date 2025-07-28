import {
  defineConfig
} from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://asadulloh.uz",
  integrations: [sitemap(), astroExpressiveCode({
    styleOverrides: {
      textMarkers: {
        markHue: '310',
        borderOpacity: '50%',
      },
    },
    themes: ['dark-plus', 'light-plus'],
  }), mdx(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
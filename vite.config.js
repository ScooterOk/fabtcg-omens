import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context(pagePath) {
        const context = pagePath.includes("/ja/") ? ja : en;
        return {
            ...context,
            isJa: pagePath.includes("/ja/"),
            isEn: !pagePath.includes("/ja/")
        };
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ja: resolve(__dirname, "ja/index.html"),
      },
    },
  },
});

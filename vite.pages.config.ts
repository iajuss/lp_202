import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const output = resolve(import.meta.dirname, "docs");

export default defineConfig({
  root: "pages",
  base: "/lp_202/",
  plugins: [
    react(),
    {
      name: "copy-aja-images",
      closeBundle() {
        mkdirSync(resolve(output, "images"), { recursive: true });
        cpSync(resolve(import.meta.dirname, "public", "images"), resolve(output, "images"), { recursive: true });
        writeFileSync(resolve(output, ".nojekyll"), "");
      },
    },
  ],
  build: {
    outDir: output,
    emptyOutDir: true,
  },
});

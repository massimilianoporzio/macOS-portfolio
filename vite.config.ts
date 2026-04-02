import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from "@tailwindcss/vite";
import {resolve,dirname} from 'path';
import {fileURLToPath} from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
  ],
  resolve: {
    alias: {
      '#components': resolve(dirname(fileURLToPath(import.meta.url)), 'components'),
      '#constants': resolve(dirname(fileURLToPath(import.meta.url)), 'constants'),
      '#store': resolve(dirname(fileURLToPath(import.meta.url)), 'store'),
      '#hoc': resolve(dirname(fileURLToPath(import.meta.url)), 'hoc'),
      '#windows': resolve(dirname(fileURLToPath(import.meta.url)), 'windows'),
    }
  }
})

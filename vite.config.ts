import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
let a=2;
a='aa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

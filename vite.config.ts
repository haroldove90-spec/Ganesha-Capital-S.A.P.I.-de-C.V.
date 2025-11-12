import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // FIX: Cast 'process' to 'any' to resolve a TypeScript error where 'cwd' is not found on the 'Process' type. This is likely due to missing Node.js type definitions in the project configuration.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    define: {
      // This makes the environment variables available on `process.env`
      // in the client-side code.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    plugins: [react()],
  }
})
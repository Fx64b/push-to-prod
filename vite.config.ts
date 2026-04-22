import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import jso from 'vite-plugin-javascript-obfuscator'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ...(mode === 'production'
      ? [
          jso({
            options: {
              // Encode all string literals into a rotating lookup array
              stringArray: true,
              stringArrayEncoding: ['rc4'],
              stringArrayRotate: true,
              stringArrayShuffle: true,
              stringArrayCallsTransform: true,
              stringArrayCallsTransformThreshold: 0.75,
              stringArrayThreshold: 0.75,

              // Rename every identifier to _0xABCD hex names
              identifierNamesGenerator: 'hexadecimal',

              // Break prettifier-based reversals
              selfDefending: true,

              // Disable source maps in output
              sourceMap: false,

              // Suppress the obfuscator's own console banner
              debugProtection: false,
            },
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))

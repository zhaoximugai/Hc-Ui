import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir:'dist/types'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build:{
    outDir:'dist/cjs',
    lib:{
      entry:resolve(__dirname,'src/index.ts'),
      name:'HcUi',
      fileName:'hc-ui',
      formats:['cjs']
    },
    rollupOptions:{
      external:['vue','@fortawesome/free-solid-svg-icons','@fortawesome/fontawesome-svg-core','axios','@popperjs/core'],
      output:{
        assetFileNames:(chunkInfo)=> {
            if (chunkInfo.name=='style.css') {
              return 'index.css'
            }
            return chunkInfo.name as string
        },
      }
    }
  }
})

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
    outDir:'dist/lib',
    minify:false,
    lib:{
      entry:resolve(__dirname,'src/index.ts'),
      name:'HcUi',
      fileName:'hc-ui',
      formats:['cjs']
    },
    rollupOptions:{
      external:['vue'],
      output:{
        exports:'named',
        globals:{
          vue:'Vue'
        },
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

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
    dts()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port:8001,
    hmr:true
  },
  build:{
    lib:{
      entry:resolve(__dirname,'src/index.ts'),
      name:'HcUi',
      fileName:'hc-ui'
    },
    rollupOptions:{
      external:['vue'],
      output:{
        exports:'named',
        globals:{
          vue:'Vue'
        }
      }
    }
  }
})

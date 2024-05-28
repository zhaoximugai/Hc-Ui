import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "组件指南",
  description: "A VitePress Site",
  vite:{
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    },
  },
  markdown:{
    config(md) {
        md.use(containerPreview)
        md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '../' },
      { text: '快速起步', link: '../components/demo.md' },
      { text: '组件', link: '../components/button.md' }
      
    ],

    sidebar: [
      {
        text:'快速起步',
        items:[
          {
            text:'安装',link:'/components/demo'
          }
        ]
      },
     
      {
        text:'Basic基础组件',
        items:[
          {
            text:'Button按钮',link:'/components/button',
          },
          {
            text:'Collapse 折叠面板',
            link:'../components/collapse.md'
          }
        ]
      },
      
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

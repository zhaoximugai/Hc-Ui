import  DefaultTheme from 'vitepress/theme'
import '../../../src/styles/index.css'
import '@vitepress-demo-preview/component/dist/style.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import './custom.css'

import { ElementPlusContainer } from '@vitepress-demo-preview/component'

library.add(fas)

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.component('demo-preview', ElementPlusContainer)
    }
  }


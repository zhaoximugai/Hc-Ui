# 安装Hc-UI

```
npm i @stophjc/hc-ui
```

# 全局引入
```
import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import  {createPinia}  from 'pinia'
import HcUI from '@stophjc/hc-ui'

import  '@stophjc/hc-ui/dist/es/index.css'
   
createApp(App).use(HcUI).mount('#app')

```

# 局部引入
```
import {HcButton} from '@stophjc/hc-ui'
import {HcCollapse} from '@stophjc/hc-ui'

```

import { createApp } from 'vue'
import './style.css'
import './styles/common/index.scss'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// element dark theme style
import "element-plus/theme-chalk/src/dark/css-vars.scss";
import "@/styles/element/index.scss";

// element-plus message、loading
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";

import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)


app.use(ElementPlus)

app.use(createPinia());

app.use(router);

app.mount('#app')

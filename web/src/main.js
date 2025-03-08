import { createApp } from "vue";
import "./styles/main.scss";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";

// 创建 Pinia 实例并使用持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 创建 Vue 应用并注册路由和状态管理
const app = createApp(App);
app.use(router);
app.use(pinia);

// 挂载应用到 DOM
app.mount("#app");

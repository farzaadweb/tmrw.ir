import { createApp } from "vue";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import router from "./router";
import "./App.css";

const app = createApp(App);
app.use(router);
app.component("Icon", Icon);
app.mount("#app");

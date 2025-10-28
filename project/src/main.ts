import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import prime from "primevue/config";

const app = createApp(App);
app.use(router);
app.use(prime)
app.mount("#app");
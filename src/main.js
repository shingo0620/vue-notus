import { createApp } from "vue";


// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// routes
import router from './routes'

createApp(App).use(router).mount("#app");

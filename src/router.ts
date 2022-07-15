import { createRouter, createWebHistory } from "vue-router";
import Shows from "./view/Shows.vue";

const routes: any[] = [
  {
    path: "/shows",
    name: "shows",
    component: Shows,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

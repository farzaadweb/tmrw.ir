import { createRouter, createWebHistory } from "vue-router";
import Shows from "./view/Shows.vue";
import Details from "./view/slug/Details.vue";

const routes: any[] = [
  {
    path: "/shows",
    name: "shows",
    component: Shows,
  },
  {
    path: "/shows/:id",
    name: "details",
    component: Details,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

import { createRouter, createWebHistory } from "vue-router";
import Search from "./view/Search.vue";
import Details from "./view/Details.vue";
import Shows from "./view/Shows.vue";

const routes: any[] = [
  {
    path: "/search",
    name: "search",
    component: Search,
    prop: true,
  },
  {
    path: "/shows",
    name: "shows",
    component: Shows,
  },
  {
    path: "/movie/:id",
    name: "details",
    component: Details,
    prop: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

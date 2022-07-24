import { createRouter, createWebHistory } from "vue-router";
import Search from "./view/Search.vue";
import Details from "./view/Details.vue";
import Shows from "./view/shows/index.vue";
import showItems from "./view/shows/slug.vue";

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
    prop: true,
  },
  {
    path: "/shows/:slug",
    name: "showItems",
    component: showItems,
  },
  {
    path: "/movie/:slug",
    name: "details",
    component: Details,
    prop: true,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

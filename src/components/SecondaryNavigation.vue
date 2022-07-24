<script setup lang="ts">
import { fetchgenre } from "../api/apiTokens";
let ganersList = $ref<any>([]);
const genre = async () => {
  ganersList = await fetchgenre();
  ganersList = ganersList.genres;
};
genre();
</script>

<template>
  <div class="size-full">
    <div class="h-full mx-container flex-all">
      <ul class="flex text-black-3 text-sm lg:text-base">
        <li class="mx-3 flex items-center group relative z-50">
          <span class="text-sm">Genres</span>
          <Icon icon="ph:caret-down" class="text-sm ml-1" />
          <div
            class="px-3 pt-8 pb-4 bg-white-1 hidden group-hover:grid grid-cols-3 absolute -left-3 top-0 -z-10 w-max rounded-b-lg"
          >
            <router-link
              v-for="item in ganersList"
              :to="{ name: 'showItems', params: { slug: item.id } }"
              class="mt-2 text-sm hover:text-white-2 outline-none"
              >{{ item.name }}</router-link
            >
          </div>
        </li>
        <li class="mx-3 lg:mx-6 text-sm z-20">
          <router-link :to="{ name: 'showItems', params: { slug: 'popular' } }"
            >Popular</router-link
          >
        </li>
        <li class="mx-3 lg:mx-6 text-sm z-20">
          <router-link :to="{ name: 'showItems', params: { slug: 'topRated' } }"
            >TopRated</router-link
          >
        </li>
        <li class="mx-3 lg:mx-6 text-sm z-20">
          <router-link :to="{ name: 'showItems', params: { slug: 'upcoming' } }"
            >UpComing</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
a {
  outline: none;
}
</style>

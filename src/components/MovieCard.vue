<script setup lang="ts">
import { inject } from "vue";

const BASE_URL = inject<any>("BASE_URL");
defineProps<{
  list: any[];
}>();
</script>

<template>
  <div
    v-for="item in list"
    class="rounded-lg lg:rounded-sm overflow-hidden my-3 lg:my-4 mx-2 lg:mx-3 relative group"
  >
    <img
      :src="BASE_URL(item.poster_path)"
      :alt="item.title"
      class="h-full select-none group-hover:brightness-50 transition-all"
    />
    <router-link
      :to="{ name: 'details', params: { slug: item.id } }"
      class="w-full h-full lg:h-3/5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 absolute bottom-0 py-3 px-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
    >
      <div>
        <span class="text-sm text-white-2">{{ item.release_date }}</span>
        <span
          class="ml-2 text-sm text-white-1 px-2 border border-white-2 rounded-lg"
          >{{ item.original_language }}</span
        >
      </div>
      <span class="mt-2 text-white-1 font-bold">{{ item.title }}</span>
      <div class="mt-1 flex items-center">
        <Icon icon="la:imdb" class="text-3xl text-yellow" />
        <span class="ml-2 text-sm text-white-2"
          >{{ item.vote_average }}/10</span
        >
      </div>
      <p
        class="text-sm text-white-2 mt-1 leading-normal h-20 lg:h-16 overflow-hidden"
      >
        {{ item.overview }}
      </p>
    </router-link>
  </div>
</template>

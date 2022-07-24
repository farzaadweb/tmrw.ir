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
    class="rounded-lg overflow-hidden my-3 lg:my-4 lg:mx-3 relative group"
  >
    <img
      :src="BASE_URL(item.poster_path)"
      :alt="item.title"
      class="h-full group-hover:blur-[2px] select-none"
    />
    <router-link
      :to="{ name: 'details', params: { slug: item.id } }"
      class="size-full absolute top-0 left-0 z-20 px-6 py-4 bg-gradient-to-t from-black-1 via-black-1/70 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end"
    >
      <span class="text-white-1 text-base">{{ item.title }}</span>
      <div class="flex items-center mt-2">
        <span class="text-white-2 text-sm">{{ item.release_date }}</span>
        <span
          class="w-fit text-black-3 text-sm ml-2 px-2 rounded-full"
          :class="
            item.vote_average > 4 && item.vote_average < 8
              ? 'bg-yellow'
              : 'bg-green-1'
          "
          >{{ item.vote_average }}</span
        >
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { watch, inject } from "vue";
import { fetchSearch } from "../api/search";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

let searchText = $ref<string>("");
let searchResults = $ref<any>([]);
const BASE_URL = inject<any>("BASE_URL");

const runSearch = async () => {
  searchResults = await fetchSearch(searchText);
  searchResults = searchResults.results;
};
watch(
  () => searchText,
  async () => {
    if (searchText) await runSearch();
  }
);
</script>

<template>
  <div class="h-12 bg-white-1">
    <div class="size-full mx-container px-4 lg:px-6 flex items-center">
      <Icon icon="ph:magnifying-glass" class="text-xl text-black-3" />
      <input
        type="text"
        placeholder="Search for a movie, tv show, person ..."
        v-model="searchText"
        class="w-full outline-none text-sm"
      />
    </div>
  </div>
  <div
    class="mx-container px-4 lg:px-6 py-8 flex flex-col lg:flex-row"
    v-if="searchResults.length"
  >
    <div class="grid grid-cols-1 overflow-y-auto">
      <router-link
        v-for="item in searchResults"
        :to="{ name: 'details', params: { slug: item.id } }"
        class="bg-black-2 my-2 rounded-lg border border-white-2 hover:bg-white-2 hover:bg-opacity-5 transition-all flex"
      >
        <img
          :src="BASE_URL(item.poster_path)"
          alt=""
          class="w-24 rounded-l-lg"
        />
        <div class="ml-4 py-4">
          <div class="flex items-center">
            <span class="text-white-1 text-base">{{ item.title }}</span>
            <span
              class="ml-2 py-[2px] px-1 text-black-3 text-xs rounded-md"
              :class="
                item.vote_average > 4 && item.vote_average < 7
                  ? 'bg-yellow '
                  : 'bg-green-1'
              "
              >{{ item.vote_average }}</span
            >
          </div>
          <span class="text-white-2 text-sm">{{ item.release_date }}</span>
          <p
            class="text-white-1 text-xs leading-[22px] mt-2 w-4/5 h-12 overflow-hidden"
          >
            {{ item.overview }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
  <div v-else>adwawd</div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { fetchSearch } from "../api/search";
import { apiBaseURL } from "../api/apiTokens";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

let searchBarStatus = $ref<boolean>(false);
let searchText = $ref<string>("");
let smHeaderStatus = $ref<boolean>(false);
let searchResults = $ref<any>([]);

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

function clearSearchResults() {
  searchText = "";
  searchResults = [];
}
</script>

<template>
  <div v-if="lgAndLarger" class="size-full relative">
    <div class="size-full mx-container flex-all px-6">
      <div class="w-full">
        <h2 class="linear-wipe font-bold">TMRW</h2>
      </div>
      <div class="w-full z-50">
        <ul class="flex-all text-white-1">
          <li>Home</li>
          <li class="ml-12"><router-link to="/shows">Shows</router-link></li>
          <li class="ml-12">AboutUs</li>
          <li class="ml-12">API</li>
        </ul>
      </div>
      <div class="w-full text-right">
        <button @click="searchBarStatus = !searchBarStatus">
          <Icon
            :icon="searchBarStatus ? 'ph:x-fill' : 'ph:magnifying-glass'"
            class="text-white-1 text-2xl"
          />
        </button>
      </div>
    </div>
    <Transition
      ><div
        v-if="searchBarStatus"
        class="w-full bg-white-1 absolute right-0 top-12 px-6 pb-3 z-50"
      >
        <div class="flex justify-between border-b py-3 mx-container">
          <div>
            <Icon
              icon="ph:magnifying-glass"
              class="text-black-3 text-xl inline"
            />
            <input
              type="text"
              class="ml-3 text-sm outline-none"
              placeholder="Search for a movie, tv show, person ..."
              v-model="searchText"
            />
          </div>
          <button
            v-if="searchText"
            class="text-xl text-black-3"
            @click="clearSearchResults"
          >
            <Icon icon="ph:x-fill" />
          </button>
        </div>
        <div class="mt-3 h-48 mx-container overflow-y-auto">
          <div v-if="searchResults.length" class="grid grid-cols-1">
            <div v-for="item in searchResults" class="flex py-2 px-3 mx-2 mt-2">
              <router-link
                :to="{ name: 'details', params: { id: item.id } }"
                class="flex items-center text-black-3"
                @click="searchBarStatus = false"
              >
                <span class="text-sm">{{ item.title }}</span
                ><Icon icon="ph:caret-right" />
              </router-link>
            </div>
          </div>
          <div v-else>
            <span class="text-sm text-black-3">No any resault</span>
          </div>
        </div>
      </div></Transition
    >
  </div>

  <div v-if="!lgAndLarger" class="size-full px-4 relative z-30">
    <div class="size-full flex items-center justify-between">
      <div><h3 class="linear-wipe font-bold text-xl">TMRW</h3></div>
      <div class="flex items-center">
        <button @click="searchBarStatus = !searchBarStatus">
          <Icon
            :icon="searchBarStatus ? 'ph:x-fill' : 'ph:magnifying-glass'"
            class="text-white-1 text-2xl mr-3"
          />
        </button>
        <button @click="smHeaderStatus = !smHeaderStatus">
          <Icon
            :icon="smHeaderStatus ? 'ph:x-fill' : 'ci:hamburger'"
            class="text-white-1 text-3xl"
          />
        </button>
      </div>
    </div>
    <Transition
      ><div
        v-if="smHeaderStatus"
        class="bg-white-1 overflow-hidden py-4 px-4 -mx-4 relative z-50"
      >
        <ul class="text-base">
          <li>Home</li>
          <li class="mt-3">
            <router-link to="/shows" @click="smHeaderStatus = false"
              >Shows</router-link
            >
          </li>
          <li class="mt-3">AboutUs</li>
          <li class="mt-3">API</li>
        </ul>
      </div></Transition
    >
    <Transition>
      <div v-if="searchBarStatus" class="bg-white-1 py-2 px-4 -mx-4 z-50">
        <div class="flex-all border-b pb-3">
          <div class="w-full">
            <Icon icon="ph:magnifying-glass" class="text-2xl inline" />
            <input
              type="text"
              placeholder="Search for a movie, tv show, person ..."
              class="text-xs ml-2 outline-none"
              v-model="searchText"
            />
          </div>
          <div class="flex items-center">
            <button class="text-xl text-black-3" @click="clearSearchResults">
              <Icon icon="ph:x-fill" />
            </button>
          </div>
        </div>
        <div class="mt-3">
          <div v-if="searchResults.length" class="grid grid-cols-2">
            <div v-for="item in searchResults" class="mx-2 my-3">
              <img
                :src="item.poster_path"
                :alt="item.title"
                class="rounded-lg"
              />
              <span class="text-sm mt-3">{{ item.title }}</span>
              <router-link
                :to="{ name: 'details', params: { id: item.id } }"
                class="flex items-center text-blue text-sm"
                @click="searchBarStatus = false"
              >
                <span>Show more</span><Icon icon="ph:caret-right" />
              </router-link>
            </div>
          </div>
          <div v-else>
            <span class="text-xs text-black">No any resault</span>
          </div>
        </div>
      </div></Transition
    >
  </div>
</template>
<style scoped>
.linear-wipe {
  background: linear-gradient(
    to right,
    #7f5af0 20%,
    #fffffe 40%,
    #2cb67d 60%,
    #7f5af0 80%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: shine 1s linear infinite;
  animation: shine 2.5s linear infinite;
}
@-webkit-keyframes shine {
  to {
    background-position: 200% center;
  }
}
@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>

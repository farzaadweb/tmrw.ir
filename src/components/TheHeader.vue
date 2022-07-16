<script setup lang="ts">
import { ref, watch } from "vue";
import { fetchSearch } from "../api/search";
import { lgAndLarger } from "../lib/responsive";

const searchBarStatus = ref<boolean>(false);
const searchText = ref<string>("");
const smHeaderStatus = ref<boolean>(false);

const searchResults = ref<any>([]);
watch(searchText, async () => {
  searchResults.value = await fetchSearch(searchText.value);
  searchResults.value = searchResults.value.results;
  console.log(searchResults.value);
  if (searchResults.value) {
    searchResults.value = searchResults.value.map((item: any) => {
      item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      item.backdrop_path = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
      return item;
    });
  }
});
function clearSearchResults() {
  searchText.value = "";
  searchResults.value = [];
}
</script>

<template>
  <div v-if="lgAndLarger" class="w-full h-full relative">
    <div
      class="w-full h-full mx-auto container flex items-center justify-between px-6"
    >
      <div class="w-full">
        <span class="linear-wipe font-bold text-3xl">TMRW</span>
      </div>
      <div class="w-full z-50">
        <ul class="flex justify-center items-center text-white">
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
            class="text-white text-2xl"
          />
        </button>
      </div>
    </div>
    <Transition
      ><div
        v-if="searchBarStatus"
        class="w-full bg-white absolute right-0 top-16 px-6 pb-3 z-50"
      >
        <div class="flex justify-between border-b py-3 mx-auto container">
          <div>
            <Icon
              icon="ph:magnifying-glass"
              class="text-[#212121] text-xl inline"
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
            class="text-xl text-[#72757e] hover:text-black"
            @click="clearSearchResults"
          >
            <Icon icon="ph:x-fill" class="" />
          </button>
        </div>
        <div class="mt-3 mx-auto container">
          <div v-if="searchResults.length" class="grid grid-cols-5">
            <div
              v-for="(item, index) in searchResults"
              :key="index"
              class="flex bg-[#f0f0f0] py-2 px-2 my-4 mx-3 rounded-lg"
            >
              <img
                :src="item.poster_path"
                :alt="item.title"
                class="w-28 rounded-lg"
              />

              <div class="flex flex-col justify-between items-end text-sm ml-3">
                <span class="font-medium">{{ item.title }}</span>
                <button class="flex items-center text-[#7f5af0] text-xs">
                  <span>Show more</span><Icon icon="ph:caret-right" />
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <span class="text-sm text-[#72757e]">No any resault</span>
          </div>
        </div>
      </div></Transition
    >
  </div>

  <div v-if="!lgAndLarger" class="w-full h-full px-4 relative z-30">
    <div class="w-full h-full flex items-center justify-between">
      <div><span class="linear-wipe font-bold text-xl">TMRW</span></div>
      <div class="flex items-center">
        <button @click="searchBarStatus = !searchBarStatus">
          <Icon
            :icon="searchBarStatus ? 'ph:x-fill' : 'ph:magnifying-glass'"
            class="text-white text-2xl mr-3"
          />
        </button>
        <button @click="smHeaderStatus = !smHeaderStatus">
          <Icon
            :icon="smHeaderStatus ? 'ph:x-fill' : 'ci:hamburger'"
            class="text-white text-3xl"
          />
        </button>
      </div>
    </div>
    <Transition
      ><div
        v-if="smHeaderStatus"
        class="bg-white overflow-hidden py-4 px-4 -mx-4 relative z-50"
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
      <div v-if="searchBarStatus" class="bg-white py-2 px-4 -mx-4 z-50">
        <div class="flex items-center justify-between">
          <div class="w-full">
            <Icon icon="ph:magnifying-glass" class="text-2xl inline" />
            <input
              type="text"
              placeholder="Search for a movie, tv show, person ..."
              class="text-xs outline-none ml-2"
              v-model="searchText"
            />
          </div>
          <div class="flex items-center">
            <button
              class="text-xl text-[#72757e] hover:text-black"
              @click="searchText = ''"
            >
              <Icon icon="ph:x-fill" />
            </button>
          </div>
        </div>
        <div class="mt-3">
          <div v-if="searchResults.length"></div>
          <div v-else>
            <span class="text-xs text-[#72757e]">No any resault</span>
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

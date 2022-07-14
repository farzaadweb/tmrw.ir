<script setup lang="ts">
import { ref } from "vue";
import { lgAndLarger } from "../lib/responsive";

const searchBarStatus = ref<boolean>(false);
const searchText = ref<string>("");
const searchResault = ref<any[]>();
const smHeaderStatus = ref<boolean>(false);
</script>

<template>
  <div
    v-if="lgAndLarger"
    class="w-full h-full mx-auto container px-6 flex items-center justify-between relative"
  >
    <div>
      <!-- <img src="../assets/Wlogo.png" alt="tmrw logo" class="w-28" /> -->
      <span class="linear-wipe font-bold text-3xl">TMRW</span>
    </div>
    <div>
      <ul class="flex text-white">
        <li class="mx-6">Home</li>
        <li class="mx-6">Shows</li>
        <li class="mx-6">AboutUs</li>
        <li class="mx-6">API</li>
      </ul>
    </div>
    <div class="">
      <button @click="searchBarStatus = !searchBarStatus">
        <Icon
          :icon="searchBarStatus ? 'ph:x-fill' : 'ph:magnifying-glass'"
          class="text-white text-2xl"
        />
      </button>
    </div>
    <Transition
      ><div
        v-if="searchBarStatus"
        class="w-full bg-white absolute right-0 top-16 px-4 pb-3"
      >
        <div class="flex justify-between border-b py-3">
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
            @click="searchText = ''"
          >
            <Icon icon="ph:x-fill" class="" />
          </button>
        </div>
        <div class="mt-3">
          <div v-if="searchResault"></div>
          <div v-else>
            <span class="text-sm text-[#72757e]">No any resault</span>
          </div>
        </div>
      </div></Transition
    >
  </div>

  <div v-if="!lgAndLarger" class="w-full h-full px-4 relative">
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
    <div v-if="smHeaderStatus" class="bg-white overflow-hidden py-4 px-4 -mx-4">
      <ul class="text-base">
        <li>Home</li>
        <li class="mt-3">Shows</li>
        <li class="mt-3">AboutUs</li>
        <li class="mt-3">API</li>
      </ul>
    </div>
    <div v-if="searchBarStatus" class="bg-white py-2 px-4 -mx-4">
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
        <div v-if="searchResault"></div>
        <div v-else>
          <span class="text-xs text-[#72757e]">No any resault</span>
        </div>
      </div>
    </div>
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

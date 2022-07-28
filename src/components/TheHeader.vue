<script setup lang="ts">
import { watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

let smHeaderStatus = $ref<boolean>(false);
</script>

<template>
  <div v-if="lgAndLarger" class="size-full relative">
    <div class="size-full mx-container flex items-center px-6">
      <div class="w-full">
        <h2 class="text-white-1 font-bold">TMRW</h2>
      </div>
      <div class="w-full z-50">
        <ul class="text-white-1 text-center">
          <li class="inline-block" disabled>Home</li>
          <li class="ml-12 inline-block">
            <router-link to="/shows">Shows</router-link>
          </li>
          <li class="ml-12 inline-block" disabled>AboutUs</li>
          <li class="ml-12 inline-block" disabled>API</li>
        </ul>
      </div>
      <div class="w-full flex justify-end">
        <router-link to="/search">
          <Icon icon="ph:magnifying-glass" class="text-white-1 text-2xl" />
        </router-link>
      </div>
    </div>
  </div>

  <div v-if="!lgAndLarger" class="size-full px-4 relative z-30">
    <div class="size-full flex items-center justify-between">
      <div><h3 class="text-white-1 font-bold text-xl">TMRW</h3></div>
      <div class="flex items-center">
        <router-link to="/search">
          <Icon icon="ph:magnifying-glass" class="text-white-1 text-2xl mr-3" />
        </router-link>
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
          <li disabled>Home</li>
          <li class="mt-3">
            <router-link to="/shows" @click="smHeaderStatus = false"
              >Shows</router-link
            >
          </li>
          <li class="mt-3" disabled>AboutUs</li>
          <li class="mt-3" disabled>API</li>
        </ul>
      </div></Transition
    >
  </div>
</template>

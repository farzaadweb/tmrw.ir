<script setup lang="ts">
import SecondaryNavigation from "./components/SecondaryNavigation.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import TheHeader from "./components/TheHeader.vue";
import { useRoute } from "vue-router";
import { watch } from "vue";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

let route = useRoute();
</script>

<template>
  <div class="w-full relative">
    <div class="bg-black-3 h-12 sticky top-0 z-50">
      <TheHeader />
    </div>
    <div
      v-if="
        route.path === '/shows' ||
        route.name == 'details' ||
        route.name == 'showItems'
      "
      class="w-full h-12 bg-white-1"
    >
      <SecondaryNavigation />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

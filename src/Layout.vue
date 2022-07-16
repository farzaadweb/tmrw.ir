<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "./components/TheHeader.vue";
import { lgAndLarger } from "./lib/responsive";
import { useRouter, useRoute } from "vue-router";
import SecondaryNavigation from "./components/SecondaryNavigation.vue";
const router = useRouter();
const route = useRoute();

const loadingBarStatus = ref<boolean>(false);
router.beforeEach(() => {
  loadingBarStatus.value = true;
});
router.afterEach(() => {
  loadingBarStatus.value = false;
});
</script>

<template>
  <div class="w-full relative">
    <div class="absolute top-0 inset-x-0">
      <div
        class="h-1 transition-transform duration-1000 origin-left"
        :class="
          loadingBarStatus
            ? 'scale-x-100 bg-[#2cb67d]'
            : 'scale-x-0 bg-transparent'
        "
      ></div>
    </div>
    <div class="bg-[#212121] h-12 lg:h-16">
      <TheHeader />
    </div>
    <div v-if="route.path === '/shows'" class="w-full h-12 bg-[#94a1b2]">
      <SecondaryNavigation />
    </div>
    <div class="mx-auto container py-8 px-4 lg:px-6">
      <router-view />
    </div>
  </div>
</template>

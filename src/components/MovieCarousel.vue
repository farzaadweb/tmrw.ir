<script setup lang="ts">
import { watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import "swiper/css";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

let {
  title,
  categorizeStatus = false,
  categorize = ["Tv", "Video", "Stream"],
  lists,
} = defineProps<{
  title: string;
  categorizeStatus?: boolean;
  categorize?: string[];
  lists: any[];
}>();
</script>

<template>
  <div>
    <div class="flex items-center">
      <h1 class="text-white-1 text-lg lg:text-2xl font-medium lg:font-normal">
        {{ title }}
      </h1>
      <div
        v-if="categorizeStatus"
        class="w-fit flex border border-blue ml-4 rounded-full overflow-hidden py-1 px-1"
      >
        <button
          v-for="(item, index) in categorize"
          :key="index"
          class="text-white-1 text-sm px-4 focus:bg-green-1 transition rounded-r-full rounded-l-full"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div class="mt-6">
      <swiper
        :Scrollbar="true"
        :slides-per-view="lgAndLarger ? 7 : 2"
        :space-between="25"
        :loop="true"
        :autoplay="{
          delay: 10000,
          disableOnInteraction: false,
        }"
        :modules="[Autoplay]"
      >
        <swiper-slide v-for="(item, index) in lists">
          <router-link
            :to="{ name: 'details', params: { id: item.id } }"
            class="flex flex-col rounded-md"
          >
            <div class="relative">
              <img
                :src="item.poster_path"
                :alt="item.title"
                class="rounded-lg"
              />
              <div
                class="absolute -bottom-4 left-3 w-9 h-9 rounded-full flex-all overflow-hidden"
              >
                <span class="text-xs font-extrabold z-20 text-white-1">{{
                  item.vote_average
                }}</span>
                <div
                  class="w-full absolute bg-black-3 border-2 border-green-1 rounded-full h-full z-10"
                ></div>
              </div>
            </div>
            <div class="px-1 mt-6">
              <span class="text-sm text-white-1 block">{{ item.title }}</span>
              <span class="text-sm text-white-2">{{ item.release_date }}</span>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { fetchDetails } from "../../api/movieDetails";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRoute } from "vue-router";
import { watch, inject } from "vue";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const breakpoints = useBreakpoints(breakpointsTailwind);
let lgAndLarger = $ref<boolean>(breakpoints.greater("lg"));
watch(
  () => lgAndLarger,
  (newDate: boolean) => {
    lgAndLarger = newDate;
  }
);

const BASE_URL = inject<any>("BASE_URL");
let route = useRoute();
let movieDetail = $ref<any | null>(null);

const runMovieDetail = async () => {
  movieDetail = await fetchDetails(route.params.id);
};
runMovieDetail();

watch(
  () => route.params.id,
  () => {
    runMovieDetail();
  }
);
</script>

<template>
  <div
    style="height: calc(100vh - 6rem)"
    class="absolute w-full -z-50 overflow-hidden"
    v-if="movieDetail && lgAndLarger"
  >
    <div class="absolute -z-40 size-full bg-black-1 opacity-60"></div>
    <div class="absolute -z-50 size-full flex-all">
      <img
        :src="BASE_URL(movieDetail.backdrop_path, 'backdrop')"
        :alt="`${movieDetail.title} background imge`"
        class="brightness-50 blur-[4px]"
      />
    </div>
  </div>
  <div
    :style="lgAndLarger ? 'height: calc(100vh - 6rem)' : ''"
    class="mx-container px-4 lg:px-6 py-8"
  >
    <div class="w-full flex flex-col lg:flex-row" v-if="movieDetail">
      <div class="lg:w-1/3 flex justify-center">
        <img
          :src="BASE_URL(movieDetail.poster_path, 'poster')"
          :alt="movieDetail.title"
          class="lg:w-5/6 rounded-lg"
        />
      </div>
      <div class="lg:w-2/3 h-full flex flex-col mt-10 lg:mt-0">
        <div>
          <h1 class="text-white-1 font-black text-2xl lg:text-3xl inline-block">
            {{ movieDetail.title }}
          </h1>
          <span class="text-white-2 ml-2 hidden lg:inline-block"
            >({{ movieDetail.id }})</span
          >
        </div>
        <div class="mt-2">
          <div class="overflow-x-auto">
            <div class="flex items-center w-max text-white-1">
              <span
                class="text-pink text-2xl"
                :title="movieDetail.adult ? '+18' : 'good for kids'"
              >
                <Icon :icon="movieDetail.adult ? 'uil:18-plus' : 'ph:baby'" />
              </span>
              <span class="ml-2 text-base">{{ movieDetail.release_date }}</span>
              <span
                v-for="item in movieDetail.production_countries"
                class="ml-1 text-sm"
                >({{ item.iso_3166_1 }})</span
              >
              <span
                class="ml-2 text-base"
                v-for="item in movieDetail.genres"
                :title="item.id"
                >-{{ item.name }}</span
              >
              <span
                class="ml-2 text-sm border px-1 rounded-md"
                title="original_language"
                >{{ movieDetail.original_language }}</span
              >
            </div>
          </div>
        </div>
        <div class="mt-2 lg:mt-3 relative">
          <div class="flex items-center absolute">
            <a
              :href="`https://www.imdb.com/title/${movieDetail.imdb_id}`"
              target="_blank"
              class="transition-all text-4xl hover:text-5xl text-white-1 hover:text-green-1"
              ><Icon icon="la:imdb"
            /></a>
            <a
              :href="movieDetail.homepage"
              target="_blank"
              class="transition-all text-4xl hover:text-5xl text-white-1 hover:text-pink ml-3"
              ><Icon icon="ph:crown"
            /></a>
            <a
              href="#trailer"
              class="hover-effect flex items-center ml-4 border border-blue rounded-md overflow-hidden px-2 py-1 relative"
              ><Icon icon="ph:play-fill" class="text-white-2" /><span
                class="text-white-1 ml-2 text-sm"
                >Play Trailer</span
              ></a
            >
          </div>
        </div>

        <span class="text-base text-white-2 italic mt-14 lg:mt-14">{{
          movieDetail.tagline
        }}</span>
        <p class="text-white-1 leading-7 font-light text-justify mt-2 lg:mt-3">
          {{ movieDetail.overview }}
        </p>

        <div class="mt-5 relative" v-if="movieDetail.credits.cast">
          <div class="flex items-center overflow-x-auto pl-3 absolute">
            <img
              v-for="item in movieDetail.credits.cast.slice(0, 20)"
              :src="BASE_URL(item.profile_path, 'profile')"
              :alt="item.name"
              class="w-10 rounded-full -ml-3 hover:w-14 transition-all"
            />
          </div>
        </div>
        <div class="mt-24">
          <h4 class="text-white-1 font-bold block">Other slides</h4>
          <swiper
            :Scrollbar="true"
            :slides-per-view="lgAndLarger ? 5 : 2"
            :space-between="25"
            :loop="true"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }"
            :modules="[Autoplay]"
            class="size-full mt-3 lg:mt-4"
          >
            <swiper-slide
              v-for="item in movieDetail.images.posters.slice(0, 10)"
            >
              <img
                :src="BASE_URL(item.file_path, 'posters')"
                alt="another novie posters"
                class="rounded-lg"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>

  <div
    class="h-screen w-full relative border-b-2 border-white-1"
    id="trailer"
    v-if="movieDetail"
  >
    <div class="custom-pattern absolute -z-10 size-full"></div>
    <div class="bg-white-1 w-full h-8 py-1 flex-all">
      <span class="text-sm lg:text-base text-black-3 font-medium"
        >This page is Sponsored by</span
      >
      <Icon icon="logos:youtube" class="text-lg lg:text-lg ml-3" />
      <Icon icon="logos:netflix" class="text-lg lg:text-lg ml-3" />
    </div>
    <div class="mt-3 flex justify-center">
      <span class="text-xl lg:text-3xl text-white-1 font-medium">Trailers</span>
    </div>
    <div
      class="size-full mx-container px-4 lg:px-6"
      style="height: calc(100vh - 4rem)"
    >
      <div class="h-2/3 py-4">
        <swiper
          :pagination="{
            type: 'progressbar',
          }"
          :loop="true"
          :navigation="true"
          :modules="[Pagination, Navigation]"
          class="mySwiper h-full"
        >
          <swiper-slide v-for="item in movieDetail.videos.results">
            <iframe
              :src="`https://www.youtube.com/embed/${item.key}?autoplay=0&loop=1&controls=1&mute=0`"
              frameborder="0"
              class="size-full"
            ></iframe>
          </swiper-slide>
        </swiper>
      </div>
      <div class="h-1/3 lg:pt-3 lg:pb-8">
        <swiper
          :Scrollbar="true"
          :slides-per-view="lgAndLarger ? 4 : 2"
          :space-between="25"
          :loop="true"
          :autoplay="{
            delay: 8000,
            disableOnInteraction: false,
          }"
          :modules="[Autoplay]"
          class="mySwiper h-full"
        >
          <swiper-slide v-for="item in movieDetail.videos.results">
            <iframe
              :src="`https://www.youtube.com/embed/${item.key}?autoplay=0&loop=1&controls=1&mute=0`"
              frameborder="0"
              class="size-full"
            ></iframe>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>

  <div class="w-full h-screen"></div>
</template>
<style scoped>
.linear-wipe {
  background: linear-gradient(
    to right,
    #fff323 20%,
    #fac213 40%,
    #f77e21 60%,
    #fff323 80%
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
.custom-shadow {
  box-shadow: 0px 0px 40px black;
}
.hover-effect::before {
  content: "";
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(98 70 234);
  transition: all 0.4s;
  transform: translate(-8px, 100%);
  z-index: -1;
}
.hover-effect:hover:before {
  transform: translate(-8px, 0px);
}

.custom-pattern {
  background-color: transparent;
  opacity: 0.2;
  background-image: radial-gradient(#fffffe 1px, #0f0e17 0px);
  background-size: 30px 30px;
}
</style>

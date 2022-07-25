<script setup lang="ts">
import SponsorHeader from "../components/SponsorHeader.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { fetchDetails } from "../api/movieDetails";
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
  movieDetail = await fetchDetails(route.params.slug);
};
runMovieDetail();

watch(
  () => route.params.slug,
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
          <h4 class="text-white-1 font-bold block">Other posters</h4>
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
              <button
                @click="movieDetail.poster_path = item.file_path"
                class="relative outline-none before-effect"
              >
                <img
                  :src="BASE_URL(item.file_path, 'posters')"
                  alt="another novie posters"
                  class="rounded-lg"
                />
              </button>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>

  <SponsorHeader>
    <Icon icon="logos:youtube" class="text-lg lg:text-lg ml-3" />
    <Icon icon="logos:netflix" class="text-lg lg:text-lg ml-3" />
  </SponsorHeader>

  <div
    class="h-screen w-full border-b border-white-2"
    id="trailer"
    v-if="movieDetail"
  >
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
          <swiper-slide v-for="item in movieDetail.videos.results.slice(0, 4)">
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
          class="mySwiper h-full"
        >
          <swiper-slide v-for="item in movieDetail.videos.results.slice(0, 4)">
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

  <div class="w-full h-screen mx-container px-4 lg:px-6 py-8 text-center">
    <span class="text-white-1 text-xl lg:text-2xl font-bold">All Details</span>
    <table class="w-full mt-10">
      <tr>
        <th>Name</th>
        <td>{{ movieDetail.title }}</td>
      </tr>
      <tr>
        <th>Genres</th>
        <td class="flex items-center space-x-6">
          <div v-for="item in movieDetail.genres" class="">
            <Icon icon="ph:circle-dashed-fill" class="inline-block" />
            <span class="text-base ml-1">{{ item.name }}({{ item.id }})</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>Release Date</th>
        <td>{{ movieDetail.release_date }}</td>
      </tr>
      <tr>
        <th>Movie Budget</th>
        <td>${{ movieDetail.budget }}</td>
      </tr>
      <tr>
        <th>Movie Revenue</th>
        <td>${{ movieDetail.revenue }}</td>
      </tr>
      <tr>
        <th>Movie Keywords</th>
        <td class="flex items-center space-x-6">
          <div v-for="item in movieDetail.keywords.keywords.slice(0, 6)">
            <Icon icon="ph:circle-dashed-fill" class="inline-block" />
            <span class="text-base ml-1">{{ item.name }}</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>Movie Companies</th>
        <td class="space-x-6 flex item-center">
          <div v-for="item in movieDetail.production_companies">
            <Icon icon="ph:circle-dashed-fill" class="inline-block" />
            <span class="text-base ml-1"
              >{{ item.name }} ({{ item.origin_country }})</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th>Languages</th>
        <td class="space-x-6 flex item-center">
          <div v-for="item in movieDetail.spoken_languages">
            <Icon icon="ph:circle-dashed-fill" class="inline-block" />
            <span class="text-base ml-1"
              >{{ item.english_name }} ({{ item.iso_639_1 }})</span
            >
          </div>
        </td>
      </tr>
      <tr>
        <th>Vote Average</th>
        <td>{{ movieDetail.vote_average }} / 10</td>
      </tr>
      <tr>
        <th>Vote Count</th>
        <td>{{ movieDetail.vote_count }} People</td>
      </tr>
      <tr>
        <th>Popularity</th>
        <td>{{ movieDetail.popularity }}</td>
      </tr>
      <tr>
        <th>Movie Status</th>
        <td>{{ movieDetail.status }}</td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
tabel,
th,
td {
  border: 1px solid #a7a9be;
}
tr:nth-child(even) {
  background-color: #1c1c1c;
}
th,
td {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 24px;
  text-align: left;
}
td:hover {
  color: antiquewhite;
}
th {
  color: #fffffe;
}
td {
  color: #a7a9be;
  font-size: 16px;
  transition: all 0.3s;
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
.before-effect::before {
  content: "";
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.before-effect:hover:before {
  opacity: 0.3;
}
</style>

<script setup lang="ts">
import MovieCarousel from "../../components/MovieCarousel.vue";
import { fetchdiscover } from "../../api/discover";

let popularMovies = $ref<any>([]);
let topRatedMovies = $ref<any>([]);
let upcomingMovies = $ref<any>([]);

const runDiscover = async () => {
  popularMovies = await fetchdiscover("popular");
  popularMovies = popularMovies.results.slice(0, 15);
};
const runTopRated = async () => {
  topRatedMovies = await fetchdiscover("topRated");
  topRatedMovies = topRatedMovies.results.slice(0, 15);
};
const runUpcoming = async () => {
  upcomingMovies = await fetchdiscover("upcoming");
  upcomingMovies = upcomingMovies.results.slice(0, 15);
};
runDiscover();
runTopRated();
runUpcoming();
</script>

<template>
  <div class="mx-container px-4 lg:px-6 py-8 lg:py-12">
    <div class="w-full">
      <MovieCarousel
        title="Popular Movies"
        :categorizeStatus="true"
        :lists="popularMovies"
      />
    </div>
    <div class="w-full my-16">
      <MovieCarousel
        title="TopRated Movies"
        :categorizeStatus="true"
        :lists="topRatedMovies"
      />
    </div>
    <div class="w-full">
      <MovieCarousel
        title="UpComing Movies"
        :categorizeStatus="true"
        :lists="upcomingMovies"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $ref } from "vue/macros";
import MovieCarousel from "../components/MovieCarousel.vue";
import { fetchPopularMovies } from "../api/popularMovies";
import { apiBaseURL } from "../api/apiTokens";

let popularMoviesList = $ref<any>([]);
const runPopularMovies = async () => {
  popularMoviesList = await fetchPopularMovies();
  popularMoviesList = popularMoviesList.results;
};
runPopularMovies();
</script>

<template>
  <div class="mx-container px-4 lg:px-6">
    <MovieCarousel
      title="Top Popular"
      :lists="popularMoviesList"
      class="mt-5"
    />
  </div>
</template>

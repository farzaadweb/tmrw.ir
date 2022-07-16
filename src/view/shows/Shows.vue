<script setup lang="ts">
import MovieCarousel from "../../components/MovieCarousel.vue";
import { popularMoviesList, fetchPopularMovies } from "../../api/popularMovies";
fetchPopularMovies();
</script>

<template>
  <secondaryNavigation />
  <MovieCarousel title="Top Popular" :lists="popularMoviesList" class="mt-5" />
</template>

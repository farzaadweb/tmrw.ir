<script setup lang="ts">
import MovieCarousel from "../components/MovieCarousel.vue";
import { popularMoviesList, fetchPopularMovies } from "../api/popularMovies";
fetchPopularMovies();
</script>

<template>
  <MovieCarousel title="Top Popular" :lists="popularMoviesList" />
</template>

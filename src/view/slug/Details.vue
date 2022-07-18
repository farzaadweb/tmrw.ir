<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchMovieDetails, setCustomize } from "../../api/movieDetails";
let route = useRoute();
let movieDetail = $ref<any | null>(null);

const runMovieDetail = async () => {
  movieDetail = await fetchMovieDetails(route.params.id);
  setCustomize(movieDetail);
};
runMovieDetail();
</script>

<template></template>

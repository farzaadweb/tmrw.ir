<script setup lang="ts">
import Pagination from "../../components/Pagination.vue";
import MovieCard from "../../components/MovieCard.vue";
import { fetchdiscover } from "../../api/discover";
import { useRoute } from "vue-router";
import { watch } from "vue";

let route = useRoute();
let movies = $ref<any>([]);
let page = $ref<number>(1);
const discover = async () => {
  movies = await fetchdiscover(route.params.slug, page);
  movies = movies.results;
};
discover();
watch(
  () => route.params.slug,
  () => {
    discover();
    page = 1;
  }
);

function nextPage() {
  page++;
  discover();
}
function previousPage() {
  if (page > 1) page--;
  discover();
}
function pageChange(num: number) {
  page = num;
  discover();
  console.log(num);
}
</script>

<template>
  <div class="mx-container px-4 lg:px-6 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-6">
      <MovieCard :list="movies" />
    </div>
    <div class="mt-6">
      <Pagination
        @next="nextPage"
        @previous="previousPage"
        @pageChange="pageChange"
        :pageNumber="page"
      />
    </div>
  </div>
</template>

import { ref } from "vue";
import { apiKey, apiTokenData } from "./apiTokens";

export const popularMoviesList = ref<any[]>([]);

export async function fetchPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    apiTokenData
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) return;
      data.results = data.results.sort((a: any, b: any) => {
        return b.vote_average - a.vote_average;
      });
      data.results = data.results.map((item: any) => {
        item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        item.backdrop_path = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
        return item;
      });
      popularMoviesList.value = data.results;
    })
    .catch((error) => {
      console.log(error);
    });
}

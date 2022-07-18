import { apiKey, apiTokenData } from "./apiTokens";

export async function fetchPopularMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

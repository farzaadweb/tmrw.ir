import { apiKey, apiTokenData } from "./apiTokens";

export async function fetchdiscover(genreId: any, page: number) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}&with_genres=${genreId}`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

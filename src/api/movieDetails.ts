import { apiKey, apiTokenData } from "./apiTokens";

export async function fetchDetails(movieId: any) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,images,credits,keywords,recommendations,reviews`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

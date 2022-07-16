import { ref } from "vue";
import { apiKey, apiTokenData } from "./apiTokens";

export async function fetchSearch(subject: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${subject}&page=1&include_adult=true`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "error";
}

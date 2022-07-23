import { apiKey, apiTokenData } from "./apiTokens";

export async function fetchSearch(subject: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${subject}&language=en-US&page=1&include_adult=true`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

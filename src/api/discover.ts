import { apiKey, apiTokenData } from "./apiTokens";

let requestURL = $ref<string>("");

export async function fetchdiscover(
  type: "popular" | "topRated" | "upcoming" | number,
  page?: number
) {
  if (type === "popular") {
    requestURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (type === "topRated") {
    requestURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`;
  } else if (type === "upcoming") {
    requestURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`;
  } else {
    requestURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}&with_genres=${type}`;
  }
  const response = await fetch(requestURL, apiTokenData);
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

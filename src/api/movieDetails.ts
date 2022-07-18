import { apiKey, apiTokenData } from "./apiTokens";

let movieId = $ref<number>(0);

export async function fetchMovieDetails(id: any) {
  movieId = id;
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

async function setRecommendations() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

async function setExperts() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

async function setMedias() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${apiKey}`
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

async function setReviews() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

export async function setCustomize(storage: any) {
  let recommendations = await setRecommendations();
  let castANDcrew = await setExperts();
  let allMedias = await setMedias();
  let Reviews = await setReviews();

  storage.reviews = Reviews.results;
  storage.medias = allMedias;
  storage.casts = castANDcrew.cast;
  storage.crews = castANDcrew.crew;
  storage.recommend = recommendations.results;
  storage.poster_path = `https://image.tmdb.org/t/p/w500${storage.poster_path}`;
  storage.backdrop_path = `https://image.tmdb.org/t/p/original${storage.backdrop_path}`;
  storage.imdb_id = `https://www.imdb.com/title/${storage.imdb_id}`;

  storage.production_companies = storage.production_companies.map(
    (item: any) => {
      item.logo_path = `https://image.tmdb.org/t/p/original${item.logo_path}`;
      return item;
    }
  );
}

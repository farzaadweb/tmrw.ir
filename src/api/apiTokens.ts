export const apiKey = "c0fa80bbd0dfe9d93d3864b6b836099c";

export const apiTokenData: { method: string; header: object } = {
  method: "GET",
  header: {
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGZhODBiYmQwZGZlOWQ5M2QzODY0YjZiODM2MDk5YyIsInN1YiI6IjYyY2U0Y2Q4NjMzMWIyMDBmMTEzZGIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m_zRxoXppqF6XQgP-cSytUEKLkC9sQ6o_HMsGvPwgHM",
    "Content-Type": "application/json;charset=utf-8",
  },
};

export async function apiBaseURL() {
  const response = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

export async function fetchgenre() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&api_language=en-US`,
    apiTokenData
  );
  if (response.ok) {
    return response.json();
  }
  return "Error";
}

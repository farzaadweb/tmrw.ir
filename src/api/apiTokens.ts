export const apiKey = "c0fa80bbd0dfe9d93d3864b6b836099c";

export const apiTokenData: { method: string; header: object } = {
  method: "GET",
  header: {
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGZhODBiYmQwZGZlOWQ5M2QzODY0YjZiODM2MDk5YyIsInN1YiI6IjYyY2U0Y2Q4NjMzMWIyMDBmMTEzZGIyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m_zRxoXppqF6XQgP-cSytUEKLkC9sQ6o_HMsGvPwgHM",
    "Content-Type": "application/json;charset=utf-8",
  },
};

export function setCustomize(storage: any[]) {
  if (storage) {
    storage = storage.map((item: any) => {
      item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
      item.backdrop_path = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
      return item;
    });
  }
}

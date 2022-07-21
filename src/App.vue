<script setup lang="ts">
import { provide } from "vue";
import layout from "./Layout.vue";
import { apiBaseURL } from "./api/apiTokens";

let tmdbConfig: any = null;

async function fetchBaseURL() {
  tmdbConfig = await apiBaseURL();
}
fetchBaseURL();

function assetUrl(
  path: string,
  type: "poster" | "backdrop" | "profile" | "logo"
) {
  if (type === "poster") {
    return `${tmdbConfig.images.base_url}${tmdbConfig.images.poster_sizes[4]}${path}`;
  } else if (type === "profile") {
    return `${tmdbConfig.images.base_url}${tmdbConfig.images.profile_sizes[1]}${path}`;
  } else if (type === "logo") {
    return `${tmdbConfig.images.base_url}${tmdbConfig.images.logo_sizes[4]}${path}`;
  } else {
    return `${tmdbConfig.images.base_url}${tmdbConfig.images.backdrop_sizes[3]}${path}`;
  }
}

provide("BASE_URL", assetUrl);
</script>

<template>
  <layout />
</template>

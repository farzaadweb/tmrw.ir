<script setup lang="ts">
const ganersList = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "Western",
];
</script>

<template>
  <div class="size-full">
    <div class="h-full mx-container flex-all">
      <ul class="flex text-black-3 text-sm lg:text-base">
        <li class="mx-3 flex items-center group relative z-40">
          <span class="text-sm">Genres</span>
          <Icon icon="ph:caret-down" class="text-sm ml-1" />
          <div
            class="hidden group-hover:block absolute -left-4 top-6 bg-white-1 py-2 px-3 text-black-2 z-50"
          >
            <ul class="grid grid-cols-3 w-max">
              <li
                v-for="(item, index) in ganersList"
                class="mx-2 my-1 hover:text-pink text-sm"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
        <li class="mx-3 lg:mx-6 flex items-center group relative z-40">
          <span class="text-sm">Popular</span
          ><Icon icon="ph:caret-down" class="text-sm ml-1" />
          <div
            class="hidden group-hover:flex absolute left-0 top-6 bg-white-1 py-2 px-3 z-40"
          >
            <ul class="flex w-max">
              <li class="mx-2 text-black hover:text-pink text-sm">By IMDB</li>
              <li class="mx-2 text-black hover:text-pink text-sm">By Votes</li>
            </ul>
          </div>
        </li>
        <li class="mx-3 lg:mx-6 text-sm">Latest</li>
        <li class="mx-3 lg:mx-6 text-sm">Coming soon</li>
      </ul>
    </div>
  </div>
</template>

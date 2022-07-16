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
  <div class="w-full h-full">
    <div class="h-full mx-auto container flex items-center justify-center">
      <ul class="flex text-[#a7a9be] text-sm lg:text-base">
        <li class="mx-3 flex items-center group relative">
          <span>Genres</span> <Icon icon="ph:caret-down" class="text-sm ml-1" />
          <div
            class="hidden group-hover:flex absolute -left-4 top-6 bg-white py-2 px-3 text-black z-50"
          >
            <ul class="grid grid-cols-3 w-max pt-2">
              <li
                v-for="(item, index) in ganersList"
                class="mx-2 my-1 hover:text-[#a7a9be] text-sm"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
        <li class="mx-3 lg:mx-6 flex items-center group relative">
          <span>Popular</span><Icon icon="ph:caret-down" class="text-sm ml-1" />
          <div
            class="hidden group-hover:flex absolute left-0 top-6 bg-white py-2 px-3 text-black z-50"
          >
            <ul class="flex w-max pt-2">
              <li class="mx-2 hover:text-[#a7a9be] text-sm">By IMDB</li>
              <li class="mx-2 hover:text-[#a7a9be] text-sm">By Votes</li>
            </ul>
          </div>
        </li>
        <li class="mx-3 lg:mx-6">Latest</li>
        <li class="mx-3 lg:mx-6">Coming soon</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <div class="w-full mt-4 flex justify-center items-center">
    <button class="flex items-center">
      <Icon
        icon="ph:arrow-left"
        class="text-xl text-white-2 transition-all hover:text-white-1"
      /><span class="text-white-1 text-base ml-2">Previous</span>
    </button>
    <div
      class="w-fit border border-white-1 bg-white-1 bg-opacity-10 rounded-md mx-8 overflow-hidden"
    >
      <ul class="text-base text-white-1 h-8 flex items-center">
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          1
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          2
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          3
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          ...
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          498
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          499
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all"
        >
          500
        </li>
      </ul>
    </div>
    <button class="flex items-center">
      <span class="text-white-1 text-base mr-2">Next</span>
      <Icon
        icon="ph:arrow-right"
        class="text-xl text-white-2 transition-all hover:text-white-1"
      />
    </button>
  </div>
</template>

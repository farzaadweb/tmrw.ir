<script setup lang="ts">
defineProps<{
  pageNumber: number;
}>();
</script>

<template>
  <div
    class="w-full mt-4 flex flex-col lg:flex-row justify-center items-center"
  >
    <button
      @click="$emit('previous')"
      class="flex items-center outline-none"
      :class="{ 'cursor-not-allowed': pageNumber === 1 }"
    >
      <Icon
        icon="ph:arrow-left"
        class="text-lg lg:text-xl text-white-2 transition-all hover:text-white-1"
      /><span class="text-white-1 text-sm lg:text-base ml-2">Previous</span>
    </button>
    <div
      class="w-fit border border-white-1 bg-white-1 bg-opacity-10 rounded-md mx-8 my-3 lg:my-0 overflow-hidden"
    >
      <ul class="text-sm lg:text-base text-white-1 h-8 flex items-center">
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 1)"
        >
          1
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 2)"
        >
          2
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 3)"
        >
          3
        </li>
        <li class="h-full py-1 px-3 transition-all">...</li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 498)"
        >
          498
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 499)"
        >
          499
        </li>
        <li
          class="h-full py-1 hover:bg-white-1 hover:bg-opacity-10 px-3 transition-all cursor-pointer"
          @click="$emit('pageChange', 500)"
        >
          500
        </li>
      </ul>
    </div>
    <button
      @click="$emit('next')"
      class="flex items-center outline-none"
      :class="{ 'cursor-not-allowed': pageNumber === 500 }"
    >
      <span class="text-white-1 text-sm lg:text-base mr-2">Next</span>
      <Icon
        icon="ph:arrow-right"
        class="text-lg lg:text-xl text-white-2 transition-all hover:text-white-1"
      />
    </button>
  </div>
</template>

import { ref, watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsTailwind);
export const lgAndLarger = ref(breakpoints.greater("lg"));

watch(lgAndLarger, (newDate, _) => {
  lgAndLarger.value = newDate;
});

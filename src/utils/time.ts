import { ref } from "vue";
import { DateTime } from "luxon";

const now = ref(DateTime.now());

setInterval(() => {
  now.value = DateTime.now();
}, 1000);

export function useNow() {
  return now;
}

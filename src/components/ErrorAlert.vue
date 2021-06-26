<template>
  <div class="flex items-center space-x-3 px-4 py-3 bg-red rounded" v-if="message">
    <ExclamationIcon class="w-6 h-6 text-white" />
    <div class="flex flex-col justify-center">
      <span class="text-sm text-white">Ошибка!</span>
      <span class="text-xs text-gray-300">{{ message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    ExclamationIcon,
  },
  props: {
    message: {
      type: String,
    },
  },
});
</script>

<template>
  <div class="p-4 text-white text-sm bg-red-600 rounded-md">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

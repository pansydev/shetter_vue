<template>
  <div v-if="message" class="alert-error">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
    },
  },
});
</script>

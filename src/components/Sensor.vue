<template>
  <div v-observe-visibility="visibilityChanged"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["visible"],
  setup(_, context) {
    const visibilityChanged = visible => {
      if (visible) context.emit("visible");
    };

    return { visibilityChanged };
  },
});
</script>

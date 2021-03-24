<template>
  <div v-observe-visibility="visibilityChanged"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["enter", "leave"],
  setup(_, context) {
    const visibilityChanged = (visible: boolean) => {
      context.emit(visible ? "enter" : "leave");
    };

    return { visibilityChanged };
  },
});
</script>

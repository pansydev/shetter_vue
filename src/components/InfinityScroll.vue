<template>
  <div ref="scroll-element">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  emits: ["scroll-end"],
  setup(_, context) {
    const scrollElement = ref<HTMLElement>();

    const handleScroll = () => {
      if (scrollElement.value!.getBoundingClientRect().bottom < window.innerHeight) {
        context.emit("scroll-end");
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { scrollElement };
  },
});
</script>

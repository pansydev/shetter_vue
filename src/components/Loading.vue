<template>
  <span v-if="visible" class="material-icons-outlined animate-spin">motion_photos_on</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

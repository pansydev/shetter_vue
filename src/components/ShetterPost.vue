<template>
  <article class="w-full border border-gray-200 rounded-md p-4 space-y-1">
    <div class="flex">
      <p class="text-sm text-gray-600 font-semibold">unknown</p>
      <p class="text-xs text-gray-600 font-semibold ml-auto">{{ createdAt }}</p>
    </div>
    <div class="break-all">
      <p class="text-sm text-gray-600">{{ post.text }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import moment from "moment";

import { defineComponent, computed, PropType } from "vue";
import { Post } from "@shetter/models";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props) {
    const createdAt = computed(() => moment(props.post.createdAt).calendar());

    return { createdAt };
  },
});
</script>

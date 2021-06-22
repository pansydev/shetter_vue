<template>
  <article class="w-full border border-gray-200 rounded-md p-4 space-y-1">
    <div class="flex">
      <p class="text-sm text-gray-600 font-semibold">{{ authorUsername }}</p>
      <p class="text-xs text-gray-600 font-semibold ml-auto">{{ createdAt }}</p>
    </div>
    <div class="break-all">
      <p class="text-sm text-gray-600 whitespace-pre-wrap">{{ post.text }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { DateTime } from "luxon";
import { defineComponent, computed, PropType } from "vue";
import { Post } from "@shetter/models";
import { useNow } from "@shetter/utils/time";

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup({ post }) {
    const now = useNow();

    const createdAt = computed(() => {
      if (post.creationTime > now.value.toSeconds() - 1) {
        return "только что";
      }

      return DateTime.fromSeconds(post.creationTime).toRelative({
        base: now.value,
        locale: "ru",
      });
    });

    const authorUsername = computed(() => post.author?.username ?? "unknown");

    return { createdAt, authorUsername };
  },
});
</script>

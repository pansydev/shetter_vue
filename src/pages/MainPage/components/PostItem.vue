<template>
  <article class="w-full space-y-2 p-4 rounded border border-gray-200 dark:border-black-600">
    <div class="flex items-center">
      <p class="text-gray-700 dark:text-gray-300 text-sm font-semibold">
        {{ authorUsername }}
        <span class="badge" v-if="isAuthorBot">BOT</span>
      </p>
      <p class="ml-auto text-gray-700 dark:text-gray-300 text-xs font-semibold">{{ createdAt }}</p>
    </div>
    <div>
      <p class="text-gray-700 dark:text-white text-sm" style="white-space: break-spaces">{{ post.text }}</p>
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
    const isAuthorBot = computed(() => post.author?.isBot);

    return { createdAt, authorUsername, isAuthorBot };
  },
});
</script>

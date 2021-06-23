<template>
  <article class="post-list__item w-full space-y-1">
    <div class="post-list__item__header">
      <p class="post-list__item__header__username">{{ authorUsername }}</p>
      <p class="post-list__item__header__date">{{ createdAt }}</p>
    </div>
    <div class="post-list__item__content">
      <p class="post-list__item__content__text">{{ post.text }}</p>
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

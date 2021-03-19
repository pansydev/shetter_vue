<template>
  <article class="post rounded-md px-4 py-4">
    <div class="header flex">
      <!--      <p class="text-md text-gray-600 font-semibold">{{ post.author.username }}</p>-->
      <!--      <p class="ml-auto text-xs text-gray-600 font-semibold">{{ createdAt }}</p>-->
    </div>
    <div class="content">
      <p class="text text-sm text-gray-600">
        {{ post.text }}
      </p>
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

<style>
.post {
  border: 1px solid #00000015;
}
</style>

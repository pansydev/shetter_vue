<template>
  <form class="post-form" method="post" @submit.prevent="handleFormSubmit">
    <textarea
      v-model="text"
      class="post-form__textarea w-full mr-auto"
      placeholder="Начните писать текст..."
    ></textarea>
    <button type="submit" class="dark py-3" :disabled="!canSubmit">Опубликовать</button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

import CreatePostMutation from "@shetter/graphql/mutations/CreatePost.gql";

import { useMutation } from "@vue/apollo-composable";
import { Post, QueryResult } from "@shetter/models";

export default defineComponent({
  setup() {
    const text = ref("");

    type Result = QueryResult<"createPost", Post>;

    const { mutate: createPost } = useMutation<Result>(CreatePostMutation);

    const handleFormSubmit = () => {
      createPost({ input: { text: text.value } });
      text.value = "";
    };

    const canSubmit = computed(() => !!text.value);

    return { text, handleFormSubmit, canSubmit };
  },
});
</script>

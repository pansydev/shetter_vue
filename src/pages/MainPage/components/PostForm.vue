<template>
  <form
    class="flex items-center pr-4 border border-gray-200 dark:border-black-600 rounded"
    method="post"
    @submit.prevent="handleFormSubmit"
  >
    <textarea
      v-model="text"
      class="w-full mr-auto resize-none overflow-hidden p-4 bg-transparent text-sm text-gray-700 dark:text-white"
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

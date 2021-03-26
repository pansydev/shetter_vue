<template>
  <form
    method="post"
    @submit.prevent="handleFormSubmit"
    class="flex items-center pr-4 border border-gray-200 rounded-md h-auto"
  >
    <textarea
      v-model="text"
      class="rounded-md border-none resize-none overflow-hidden text-sm w-full mr-auto p-4 focus:ring-0"
      placeholder="Начните писать текст..."
    ></textarea>
    <button :disabled="!canSubmit" class="dark py-3" type="submit">Опубликовать</button>
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

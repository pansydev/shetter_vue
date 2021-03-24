<template>
  <main class="space-y-6">
    <header class="flex items-center">
      <div class="title mr-auto">
        <h1 class="text-lg font-semibold">Shetter</h1>
        <span class="text-sm text-gray-500">@unknown</span>
      </div>
      <a class="button" href="/login">Войти в аккаунт</a>
    </header>

    <form method="post" class="flex items-center pr-4 border border-gray-200 rounded-md h-auto">
      <textarea
        class="rounded-md border-none resize-none overflow-hidden text-sm w-full mr-auto p-4 focus:ring-0"
        placeholder="Начните писать текст..."
      ></textarea>
      <button class="dark py-3" type="submit">Опубликовать</button>
    </form>

    <PostList />
  </main>
</template>

<script>
import { defineComponent } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";

export default defineComponent({
  components: {
    PostList,
  },
});
</script>

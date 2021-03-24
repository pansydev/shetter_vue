<template>
  <main class="space-y-6">
    <header class="flex items-center">
      <div class="title mr-auto">
        <h1 class="text-lg font-semibold">Shetter</h1>
        <span class="text-sm text-gray-500">@unknown</span>
      </div>
      <a class="button" href="/login">Войти в аккаунт</a>
    </header>
    <PostForm />
    <PostList />
  </main>
</template>

<script>
import { defineComponent } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";
import PostForm from "@shetter/pages/MainPage/components/PostForm";

export default defineComponent({
  components: {
    PostForm,
    PostList,
  },
});
</script>

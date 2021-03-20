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
         class="rounded-md border-none resize-none overflow-hidden text-sm w-full mr-auto p-4"
         placeholder="Начните писать текст..."
       ></textarea>
      <button class="dark py-3" type="submit">Опубликовать</button>
    </form>

    <post-list />
    <pagination :value="currentPage" :total="totalPages" />
  </main>
</template>

<script>
import { ref, defineComponent } from "vue";

import PostList from "@shetter/components/PostList.vue";
import Pagination from "@shetter/components/Pagination.vue";

export default defineComponent({
  components: {
    PostList,
    Pagination
  },
  setup() {
    const currentPage = ref(1);
    const totalPages = ref(7);

    return { currentPage, totalPages };
  }
});
</script>

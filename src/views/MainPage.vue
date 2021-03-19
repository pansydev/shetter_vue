<template>
  <main>
    <!-- NEW POST FORM -->
    <form method="POST" class="post-form px-4 py-4 mb-4 flex items-center rounded-md">
      <textarea
        class="w-full text-justify text-sm resize-none overflow-hidden mr-3"
        placeholder="Начните писать текст..."
      ></textarea>
      <button type="submit">Опубликовать</button>
    </form>

    <PostList />

    <footer class="pagination mt-4 flex justify-center">
      <button class="light">←</button>
      <button>1</button>
      <button class="light">2</button>
      <button class="light">3</button>
      <button class="light">4</button>
      <button class="light">5</button>
      <button class="light">→</button>
    </footer>
  </main>
</template>

<script>
import PostList from "@shetter/components/PostList.vue";

export default {
  components: { PostList },
};
</script>

<style>
.post-form {
  border: 1px solid #00000015;
}

.pagination > :not(:last-child) {
  margin-right: 5px;
}
</style>

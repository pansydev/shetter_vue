<template>
  <ShetterContainer class="space-y-6 md:my-4 w-full 2xl:w-4/12 lg:w-6/12 md:w-8/12">
    <header class="flex items-center">
      <div class="mr-auto">
        <h1 class="text-lg font-semibold">Shetter</h1>
        <p class="text-sm text-gray-500">@unknown</p>
      </div>
      <RouterLink class="button" to="/login">Войти в аккаунт</RouterLink>
    </header>
    <PostForm />
    <PostList />
  </ShetterContainer>
</template>

<script>
import { defineComponent } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";
import PostForm from "@shetter/pages/MainPage/components/PostForm.vue";
import ShetterContainer from "@shetter/components/ShetterContainer.vue";

export default defineComponent({
  components: {
    ShetterContainer,
    PostForm,
    PostList,
  },
});
</script>

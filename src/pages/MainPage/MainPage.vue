<template>
  <div class="container space-y-6 w-full 2xl:w-4/12 lg:w-6/12 md:w-8/12 sm:my-4">
    <AppHeader v-model:authenticated="authenticated" />
    <PostForm v-if="authenticated" />
    <PostList />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";
import PostForm from "@shetter/pages/MainPage/components/PostForm.vue";
import AppHeader from "@shetter/pages/MainPage/components/AppHeader.vue";
import { tokenManager } from "@shetter/utils/tokenManager";

export default defineComponent({
  components: {
    AppHeader,
    PostForm,
    PostList,
  },
  setup() {
    const authenticated = ref(tokenManager.authenticated());
    return { authenticated };
  },
});
</script>

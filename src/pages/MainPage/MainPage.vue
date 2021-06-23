<template>
  <div class="container main-container space-y-6">
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

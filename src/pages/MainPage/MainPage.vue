<template>
  <ShetterContainer class="space-y-6 sm:my-4 w-full 2xl:w-4/12 lg:w-6/12 md:w-8/12">
    <AppHeader v-model:authenticated="authenticated" />
    <PostForm v-if="authenticated" />
    <PostList />
  </ShetterContainer>
</template>

<script>
import { defineComponent, ref } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";
import PostForm from "@shetter/pages/MainPage/components/PostForm.vue";
import ShetterContainer from "@shetter/components/ShetterContainer.vue";
import AppHeader from "@shetter/pages/MainPage/components/AppHeader.vue";
import { tokenManager } from "@shetter/utils/tokenManager";

export default defineComponent({
  components: {
    AppHeader,
    ShetterContainer,
    PostForm,
    PostList,
  },
  setup() {
    const authenticated = ref(tokenManager.authenticated());
    return { authenticated };
  },
});
</script>

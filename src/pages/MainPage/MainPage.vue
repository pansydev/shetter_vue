<template>
  <ShetterContainer class="space-y-6 md:my-4 w-full 2xl:w-4/12 lg:w-6/12 md:w-8/12">
    <AppHeader />
    <PostForm />
    <PostList />
  </ShetterContainer>
</template>

<script>
import { defineComponent } from "vue";

import PostList from "@shetter/pages/MainPage/components/PostList.vue";
import PostForm from "@shetter/pages/MainPage/components/PostForm.vue";
import ShetterContainer from "@shetter/components/ShetterContainer.vue";
import AppHeader from "@shetter/pages/MainPage/components/AppHeader.vue";

export default defineComponent({
  components: {
    AppHeader,
    ShetterContainer,
    PostForm,
    PostList,
  },
});
</script>

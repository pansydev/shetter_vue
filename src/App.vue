<template>
  <AppHeader />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@shetter/utils/client";

import PostList from "@shetter/components/PostList.vue";
import AppHeader from "@shetter/components/AppHeader.vue";

export default defineComponent({
  components: { AppHeader, PostList },
  setup() {
    provideApolloClient(apolloClient);
  },
});
</script>

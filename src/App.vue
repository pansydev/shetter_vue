<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@shetter/utils/client";

import PostList from "@shetter/components/PostList.vue";

export default defineComponent({
  components: {
    PostList
  },
  setup() {
    provideApolloClient(apolloClient);
  }
});
</script>

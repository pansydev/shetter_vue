<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@shetter/utils/client";

export default defineComponent({
  setup() {
    provideApolloClient(apolloClient);
  },
});
</script>

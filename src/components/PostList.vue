<template>
  <div class="space-y-2 flex flex-col items-center">
    <p v-if="loading">
      <span class="material-icons-outlined animate-spin">motion_photos_on</span>
    </p>
    <div v-if="!loading" class="w-full space-y-2">
      <PostItem v-for="post in postConnection.nodes" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Connection, Post } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import PostItem from "@shetter/components/PostItem.vue";

export default defineComponent({
  components: {
    PostItem,
  },
  setup() {
    const { result, loading } = useQuery<Connection<Post>>(GetPostsQuery, { pageSize: 5, cursor: null });
    const postConnection = useResult(result);

    return { postConnection, loading };
  },
});
</script>

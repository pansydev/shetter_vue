<template>
  <div class="space-y-2 flex flex-col items-center">
    <InfinityScroll>
      <div v-if="!loading" class="w-full space-y-2">
        <PostItem v-for="post in postConnection.nodes" :key="post.id" :post="post" />
      </div>
      <Loading :visible="loading" />
    </InfinityScroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Connection, Post } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import Loading from "@shetter/components/Loading.vue";
import PostItem from "@shetter/components/PostItem.vue";
import InfinityScroll from "@shetter/components/InfinityScroll.vue";

export default defineComponent({
  components: {
    Loading,
    PostItem,
    InfinityScroll,
  },
  setup() {
    const { result, loading } = useQuery<Connection<Post>>(GetPostsQuery, { pageSize: 5, cursor: null });
    const postConnection = useResult(result);

    return { postConnection, loading };
  },
});
</script>

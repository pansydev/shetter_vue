<template>
  <div class="space-y-2 flex flex-col items-center">
    <div v-if="postConnection" class="w-full space-y-2">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <LoadingSpinner v-if="loading" />
    <ViewportBlock v-if="!loading" @enter="handleScrollDown" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Connection, Post, QueryResult } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import LoadingSpinner from "@shetter/components/LoadingSpinner.vue";
import PostItem from "@shetter/pages/MainPage/components/PostItem.vue";
import ViewportBlock from "@shetter/components/ViewportBlock.vue";

export default defineComponent({
  components: {
    LoadingSpinner,
    PostItem,
    ViewportBlock,
  },
  setup() {
    type Result = QueryResult<"posts", Connection<Post>>;

    const { result, loading, fetchMore, variables } = useQuery<Result>(GetPostsQuery, { pageSize: 5 });

    const postConnection = useResult(result);
    const posts = computed(() => postConnection.value.edges.map(x => x.node));

    const handleScrollDown = () => {
      if (!postConnection.value?.pageInfo.hasNextPage) return;

      loading.value = true;

      fetchMore({
        variables: {
          ...variables,
          after: postConnection.value?.pageInfo.endCursor,
        },
      });
    };

    return { postConnection, posts, loading, handleScrollDown };
  },
});
</script>

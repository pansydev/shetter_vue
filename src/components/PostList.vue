<template>
  <div class="space-y-2 flex flex-col items-center">
    <div class="w-full space-y-2">
      <PostItem v-for="post in postConnection.nodes" :key="post.id" :post="post" />
    </div>
    <Loading v-if="loading" />
    <Sensor v-if="!loading" @visible="handleScrollDown" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Connection, Post } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import Loading from "@shetter/components/Loading.vue";
import PostItem from "@shetter/components/PostItem.vue";
import Sensor from "@shetter/components/Sensor.vue";

export default defineComponent({
  components: {
    Loading,
    PostItem,
    Sensor,
  },
  setup() {
    const { result, loading, fetchMore, variables } = useQuery<Connection<Post>>(GetPostsQuery, {
      pageSize: 5,
      cursor: null,
    });

    const postConnection = useResult(result, {
      nodes: [],
    });

    const handleScrollDown = () => {
      if (!postConnection.value?.pageInfo.hasNextPage) return;

      loading.value = true;

      fetchMore({
        variables: {
          ...variables,
          after: postConnection.value?.pageInfo.endCursor,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
          ...previousQueryResult,
          posts: {
            ...previousQueryResult.posts,
            nodes: [...previousQueryResult.posts.nodes, ...fetchMoreResult.posts.nodes],
            pageInfo: {
              ...fetchMoreResult.posts.pageInfo,
            },
          },
        }),
      });
    };

    return { postConnection, loading, handleScrollDown };
  },
});
</script>

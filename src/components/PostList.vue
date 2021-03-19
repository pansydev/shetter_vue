<template>
  <div class="posts">
    <ShetterPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Post } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import ShetterPost from "@shetter/components/ShetterPost.vue";

export default defineComponent({
  components: { ShetterPost },
  setup() {
    const { result, loading } = useQuery<Post[]>(GetPostsQuery);
    const posts = useResult(result);

    return { posts, loading };
  },
});
</script>

<style>
.posts > :not(:last-child) {
  margin-bottom: 8px;
}
</style>

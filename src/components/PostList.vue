<template>
  <div class="space-y-4 flex justify-center">
    <p v-if="loading">
      <span class="material-icons-outlined animate-spin">
        motion_photos_on
      </span>
    </p>
    <shetter-post
      v-if="!loading"
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Post } from "@shetter/models";

import GetPostsQuery from "@shetter/queries/GetPosts.gql";
import ShetterPost from "@shetter/components/ShetterPost.vue";

export default defineComponent({
  components: {
    ShetterPost
  },
  setup() {
    const { result, loading } = useQuery<Post[]>(GetPostsQuery);
    const posts = useResult(result);

    return { posts, loading };
  }
});
</script>
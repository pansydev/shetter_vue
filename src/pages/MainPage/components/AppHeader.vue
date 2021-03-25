<template>
  <header class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-lg font-semibold">Shetter</h1>
      <p v-if="authenticated" class="text-sm text-gray-500">@{{ username }}</p>
    </div>
    <RouterLink v-if="!authenticated" class="button" to="/login">Войти в аккаунт</RouterLink>
    <button v-else @click="logout" class="button">Выйти</button>
  </header>
</template>

<script lang="ts">
import { computed } from "vue";
import { tokenManager } from "@shetter/utils/tokenManager";

export default {
  name: "AppHeader",
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:authenticated"],
  setup(_, context) {
    const username = computed(() => tokenManager.username);

    const logout = () => {
      tokenManager.clearTokens();
      context.emit("update:authenticated", false);
    };

    return { username, logout };
  },
};
</script>

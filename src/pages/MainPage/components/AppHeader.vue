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
import { computed, ref } from "vue";
import { tokenManager } from "@shetter/utils/tokenManager";

export default {
  name: "AppHeader",
  setup() {
    const authenticated = ref(tokenManager.authenticated());
    const username = computed(() => tokenManager.username);

    const logout = () => {
      tokenManager.clearTokens();
      authenticated.value = false;
    };

    return { authenticated, username, logout };
  },
};
</script>

<template>
  <header class="flex items-center">
    <div class="mr-auto">
      <h1 class="text-black-700 dark:text-white text-lg font-semibold">Shetter</h1>
      <p v-if="authenticated" class="text-gray-400 text-sm">@{{ username }}</p>
    </div>
    <button class="mr-2" @click="toggleTheme">{{ theme === "dark" ? "🌞" : "🌚" }}</button>
    <RouterLink class="button" v-if="!authenticated" to="/login">Войти в аккаунт</RouterLink>
    <button v-else @click="logout">Выйти из аккаунта</button>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { tokenManager } from "@shetter/utils/tokenManager";
import { themeManager } from "@shetter/utils/themeManager";

export default defineComponent({
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:authenticated"],
  setup(_, context) {
    const theme = ref(themeManager.theme);
    const username = computed(() => tokenManager.username);

    const logout = () => {
      tokenManager.clearTokens();
      context.emit("update:authenticated", false);
    };

    const toggleTheme = () => {
      theme.value = themeManager.theme === "light" ? "dark" : "light";
      themeManager.switchTheme(theme.value);
    };

    return { username, logout, theme, toggleTheme };
  },
});
</script>

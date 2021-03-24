<template>
  <ShetterContainer class="space-y-6 w-full 2xl:w-3/12 lg:w-5/12 md:w-7/12">
    <header class="flex flex-col items-center space-y-2">
      <h1 class="text-xl font-semibold">Авторизация в Shetter</h1>
      <p class="text-sm text-gray-500">Введите данные, чтобы войти в аккаунт</p>
    </header>
    <main class="space-y-2">
      <input type="text" placeholder="Логин" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
    </main>
    <footer class="flex space-x-2">
      <button class="flex-1">Войти</button>
      <a class="button dark flex-1" href="register.html">Регистрация</a>
    </footer>
  </ShetterContainer>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

import ShetterContainer from "@shetter/components/ShetterContainer.vue";

export default defineComponent({
  components: {
    ShetterContainer,
  },
  setup() {
    const username = ref<string>();
    const password = ref<string>();

    return { username, password };
  },
});
</script>

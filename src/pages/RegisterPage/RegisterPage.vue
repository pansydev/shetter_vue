<template>
  <ShetterContainer class="space-y-6 self-center w-full 2xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-7/12">
    <header class="text-center space-y-2">
      <h1 class="text-xl font-semibold">Регистрация в Shetter</h1>
      <p class="text-sm text-gray-500">Введите данные, чтобы зарегистрироваться</p>
    </header>
    <main class="space-y-2">
      <input type="text" placeholder="Логин" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
    </main>
    <form class="flex space-x-2" @submit.prevent="handleFormSubmit">
      <button class="flex-1 dark" type="submit">Регистрация</button>
      <RouterLink class="flex-1 button" to="/login">Войти</RouterLink>
    </form>
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

    const handleFormSubmit = () => {
      console.log(username, password);
    };

    return { username, password, handleFormSubmit };
  },
});
</script>

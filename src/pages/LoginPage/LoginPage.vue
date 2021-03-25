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
    <form class="flex space-x-2" @submit.prevent="handleFormSubmit">
      <button type="submit" class="flex-1">Войти</button>
      <RouterLink class="button dark flex-1" to="/register">Регистрация</RouterLink>
    </form>
  </ShetterContainer>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { AuthenticationResult, QueryResult } from "@shetter/models";

import AuthenticationMutation from "@shetter/queries/Authentication.gql";
import ShetterContainer from "@shetter/components/ShetterContainer.vue";

export default defineComponent({
  components: {
    ShetterContainer,
  },
  setup() {
    const username = ref<string>();
    const password = ref<string>();

    const router = useRouter();

    type Result = QueryResult<"auth", AuthenticationResult>;

    const { mutate: authenticate, loading, onDone, onError } = useMutation<Result>(AuthenticationMutation);

    const handleFormSubmit = async () => {
      const { data } = await authenticate({
        username: username.value,
        password: password.value,
      });

      if (!data) return;

      const { auth: result } = data;

      if (result.__typename === "AuthenticationSuccessResult") {
        const { accessToken, refreshToken } = result.tokens;

        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);

        return router.replace({ name: "home" });
      }

      alert(result.code);
    };

    onDone(() => {
      username.value = "";
      password.value = "";
    });

    onError(error => {
      console.log(error);
    });

    return { username, password, handleFormSubmit };
  },
});
</script>

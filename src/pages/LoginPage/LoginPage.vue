<template>
  <ShetterContainer class="space-y-6 self-center w-full 2xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-7/12">
    <header class="text-center space-y-2">
      <h1 class="text-xl font-semibold">Авторизация в Shetter</h1>
      <p class="text-sm text-gray-500">Введите данные, чтобы войти в аккаунт</p>
    </header>
    <main class="space-y-2">
      <ErrorAlert :message="errorMessage" />
      <input type="text" placeholder="Логин" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
    </main>
    <form class="flex space-x-2" @submit.prevent="handleFormSubmit">
      <button class="flex-1 dark" type="submit">Войти</button>
      <RouterLink class="flex-1 button" to="/register">Регистрация</RouterLink>
    </form>
  </ShetterContainer>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { AuthenticationResult, AuthenticationResultType, QueryResult } from "@shetter/models";

import AuthMutation from "@shetter/queries/Auth.gql";

import ShetterContainer from "@shetter/components/ShetterContainer.vue";
import { tokenManager } from "@shetter/utils/tokenManager";
import ErrorAlert from "@shetter/components/ErrorAlert.vue";
import { useLocalizationUtils } from "@shetter/utils/i18n";

export default defineComponent({
  components: {
    ErrorAlert,
    ShetterContainer,
  },
  setup() {
    const username = ref<string>();
    const password = ref<string>();

    const errorMessage = ref<string>();

    const router = useRouter();
    const { localizeErrorCode } = useLocalizationUtils();

    type Result = QueryResult<"auth", AuthenticationResult>;

    const { mutate: auth, onDone, onError } = useMutation<Result>(AuthMutation);

    const handleFormSubmit = async () => {
      const { data } = await auth({
        username: username.value,
        password: password.value,
      });

      if (!data) return;

      const { auth: result } = data;

      if (result.__typename === AuthenticationResultType.AuthenticationSuccessResult) {
        tokenManager.setTokens(result.tokens);
        return router.replace({ name: "home" });
      }

      errorMessage.value = localizeErrorCode(result.code);
    };

    onDone(() => {
      username.value = "";
      password.value = "";
    });

    onError(error => {
      errorMessage.value = error.message;
    });

    return { username, password, errorMessage, handleFormSubmit };
  },
});
</script>

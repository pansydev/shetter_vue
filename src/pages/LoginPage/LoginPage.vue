<template>
  <div class="container self-center space-y-6 w-full 2xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-7/12">
    <header class="text-center space-y-2">
      <h1 class="text-gray-700 dark:text-white text-lg font-semibold">Авторизация в Shetter</h1>
      <p class="text-gray-400 text-sm">Введите данные, чтобы войти в аккаунт</p>
    </header>
    <main class="space-y-2">
      <ErrorAlert :message="errorMessage" />
      <input type="text" placeholder="Логин" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
    </main>
    <form class="flex space-x-2" @submit.prevent="handleFormSubmit">
      <button type="submit" class="flex-1 dark" :disabled="!canSubmit">Войти</button>
      <RouterLink class="flex-1 button" to="/register">Регистрация</RouterLink>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useMutation } from "@vue/apollo-composable";
import { tokenManager } from "@shetter/utils/tokenManager";
import { AuthenticationResult, AuthenticationResultType, QueryResult } from "@shetter/models";

import AuthMutation from "@shetter/graphql/mutations/Auth.gql";

import ErrorAlert from "@shetter/components/ErrorAlert.vue";
import { useLocalizationUtils } from "@shetter/utils/i18n";

export default defineComponent({
  components: {
    ErrorAlert,
  },
  props: {
    code: {
      type: String,
    },
  },
  setup(props) {
    const username = ref<string>();
    const password = ref<string>();

    const canSubmit = computed(() => username.value && password.value);

    const router = useRouter();
    const { localizeErrorCode } = useLocalizationUtils();

    const errorMessage = ref<string>(props.code && localizeErrorCode(props.code));

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

    return { username, password, errorMessage, handleFormSubmit, canSubmit };
  },
});
</script>

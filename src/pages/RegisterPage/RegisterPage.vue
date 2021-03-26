<template>
  <ShetterContainer class="space-y-6 self-center w-full 2xl:w-3/12 lg:w-4/12 md:w-6/12 sm:w-7/12">
    <header class="text-center space-y-2">
      <h1 class="text-xl font-semibold">Регистрация в Shetter</h1>
      <p class="text-sm text-gray-500">Введите данные, чтобы зарегистрироваться</p>
    </header>
    <main class="space-y-2">
      <ErrorAlert v-if="errorMessage" :message="errorMessage" />
      <input type="text" placeholder="Логин" v-model="username" />
      <input type="password" placeholder="Пароль" v-model="password" />
    </main>
    <form class="flex space-x-2" @submit.prevent="handleFormSubmit">
      <button :disabled="!canSubmit" class="flex-1 dark" type="submit">Регистрация</button>
      <RouterLink class="flex-1 button" to="/login">Войти</RouterLink>
    </form>
  </ShetterContainer>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { QueryResult, RegistrationResult, RegistrationResultType } from "@shetter/models";
import { useMutation } from "@vue/apollo-composable";
import { tokenManager } from "@shetter/utils/tokenManager";
import { useRouter } from "vue-router";
import { useLocalizationUtils } from "@shetter/utils/i18n";

import RegisterMutation from "@shetter/graphql/mutations/Register.gql";

import ShetterContainer from "@shetter/components/ShetterContainer.vue";
import ErrorAlert from "@shetter/components/ErrorAlert.vue";

export default defineComponent({
  components: {
    ErrorAlert,
    ShetterContainer,
  },
  setup() {
    const username = ref<string>();
    const password = ref<string>();

    const canSubmit = computed(() => username.value && password.value);

    const errorMessage = ref<string>();

    const router = useRouter();
    const { localizeErrorCode } = useLocalizationUtils();

    type Result = QueryResult<"register", RegistrationResult>;

    const { mutate: register, onDone, onError } = useMutation<Result>(RegisterMutation);

    const handleFormSubmit = async () => {
      const { data } = await register({
        username: username.value,
        password: password.value,
      });

      if (!data) return;

      const { register: result } = data;

      if (result.__typename === RegistrationResultType.RegistrationSuccessResult) {
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

    return { username, password, canSubmit, errorMessage, handleFormSubmit };
  },
});
</script>

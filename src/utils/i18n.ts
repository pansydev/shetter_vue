import { createI18n, useI18n } from "vue-i18n";

import ru from "@shetter/locales/ru";

export const i18n = createI18n({
  locale: "ru",
  messages: { ru },
});

export function useLocalizationUtils() {
  const i18n = useI18n();

  const localizeErrorCode = (code: string) => {
    return i18n.t(`errorMessages.${code}`);
  };

  return { i18n, localizeErrorCode };
}

import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import messages from "./lang";
import { getLang, setHtmlPageLang } from "./helper";
// export let i18n: ReturnType<typeof createI18n>;

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = getLang();
  setHtmlPageLang(locale);

  return {
    // The default is to use the Legacy API mode. If you want to use the Composition API mode, you need to set it to false.
    legacy: false,
    // The current locale this Composer instance is using.
    locale,
    // The current fallback locales this Composer instance is using.
    fallbackLocale: "en",
    // The locale messages of localization.
    messages: messages,
    // Whether suppress warnings outputted when localization fails.
    missingWarn: false,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  // i18n = createI18n(options) as I18n;
  app.use(createI18n(options));
}

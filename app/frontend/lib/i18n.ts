import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { DEFAULT_LOCALE } from "./locale"

const localeContext = import.meta.glob<Record<string, Record<string, object>>>("./locales/*.json", { eager: true })

const resources = Object.entries(localeContext).reduce((acc, [path, translation]) => {
	const locale = path.match(/\.\/locales\/(.+)\.json/)?.[1] || DEFAULT_LOCALE
	return {
		...acc,
		[locale]: {
			translation: translation[locale] as object,
		},
	}
}, {})

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: (code) => {
			if(code === undefined || code === null || code === "" || code === DEFAULT_LOCALE) {
				return [DEFAULT_LOCALE]
			}

			const normalized = String(code).replace(/_/g, "-")
			const language = normalized.split("-")[0]
			if(language !== normalized && language !== DEFAULT_LOCALE) {
				return [language, DEFAULT_LOCALE]
			}

			return [DEFAULT_LOCALE]
		},
		supportedLngs: Object.keys(resources),
		nonExplicitSupportedLngs: false,
		load: "currentOnly",
		debug: import.meta.env.DEV && import.meta.env.MODE !== "test",
		interpolation: {
			escapeValue: false,
			prefix: "%{",
			suffix: "}",
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"],
			lookupLocalStorage: "giving-circle.locale",
		},
	})

export { i18n }

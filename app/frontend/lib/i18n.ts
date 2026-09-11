import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

export const DEFAULT_LOCALE = "en"

const localeContext = import.meta.glob<Record<string, Record<string, object>>>("./locales/*.json", { eager: true })

const resources = Object.entries(localeContext).reduce<Record<string, { translation: Record<string, object> }>>((acc, [path, translation]) => {
	const locale = path.match(/\.\/locales\/(.+)\.json/)?.[1] || DEFAULT_LOCALE
	const localeTranslation = translation[locale]
	if(localeTranslation === undefined) {
		return acc
	}

	return {
		...acc,
		[locale]: {
			translation: localeTranslation,
		},
	}
}, {})

export const localeIds = Object.keys(resources)

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: DEFAULT_LOCALE,
		supportedLngs: localeIds,
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

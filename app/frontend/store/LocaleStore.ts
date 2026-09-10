import dayjs from "dayjs"
import { create } from "zustand"

import { applyDayjsLocale } from "@/lib/dayjs"
import { DEFAULT_LOCALE, i18n } from "@/lib/i18n"

interface LocaleStoreState {
	locale: string
	setLocale: (locale: string) => Promise<void>
	hydrateFromI18n: () => Promise<void>
}

async function syncToResolved(locale?: string) {
	if(locale !== undefined) {
		await i18n.changeLanguage(locale)
	}

	const resolved = i18n.resolvedLanguage || i18n.language || DEFAULT_LOCALE
	if(i18n.language !== resolved) {
		await i18n.changeLanguage(resolved)
	}

	try {
		await applyDayjsLocale(resolved)
	} catch{
		dayjs.locale("en")
	}

	return resolved
}

export const useLocaleStore = create<LocaleStoreState>()((set) => ({
	locale: DEFAULT_LOCALE,
	setLocale: async (locale) => {
		set({ locale: await syncToResolved(locale) })
	},
	hydrateFromI18n: async () => {
		set({ locale: await syncToResolved() })
	},
}))

let languageListenerBound = false

export function bindLocaleStoreToI18n() {
	if(languageListenerBound) return
	languageListenerBound = true

	const finishInit = () => {
		void useLocaleStore.getState().hydrateFromI18n()
	}

	if(i18n.isInitialized) {
		finishInit()
	} else {
		i18n.on("initialized", finishInit)
	}

	i18n.on("languageChanged", (language) => {
		void applyDayjsLocale(language).catch(() => {
			dayjs.locale("en")
		})
		if(useLocaleStore.getState().locale !== language) {
			useLocaleStore.setState({ locale: language })
		}
	})
}

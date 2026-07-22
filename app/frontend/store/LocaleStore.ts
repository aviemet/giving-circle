import dayjs from "dayjs"
import { create } from "zustand"

import { applyDayjsLocale } from "@/lib/dayjs"
import { i18n } from "@/lib/i18n"
import {
	DEFAULT_APP_LOCALE,
	resolveLocale,
	setCurrentAppLocale,
} from "@/lib/locale"

const LOCALE_STORAGE_KEY = "giving-circle.locale"

interface LocaleStoreState {
	locale: string
	setLocale: (locale: string) => Promise<void>
	hydrateFromI18n: () => Promise<void>
}

function persistLocale(locale: string) {
	if(typeof localStorage === "undefined") return
	localStorage.setItem(LOCALE_STORAGE_KEY, locale)
}

async function applyLocale(locale: string) {
	const resolved = resolveLocale(locale)
	setCurrentAppLocale(resolved)

	try {
		await applyDayjsLocale(resolved)
	} catch{
		dayjs.locale("en")
	}

	if(i18n.language !== resolved) {
		await i18n.changeLanguage(resolved)
	}

	persistLocale(resolved)

	return resolved
}

export const useLocaleStore = create<LocaleStoreState>()((set) => ({
	locale: DEFAULT_APP_LOCALE,
	setLocale: async (locale) => {
		const resolved = await applyLocale(locale)
		set({ locale: resolved })
	},
	hydrateFromI18n: async () => {
		const resolved = await applyLocale(i18n.resolvedLanguage || i18n.language || DEFAULT_APP_LOCALE)
		set({ locale: resolved })
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
		const resolved = resolveLocale(language)
		setCurrentAppLocale(resolved)
		void applyDayjsLocale(resolved).catch(() => {
			dayjs.locale("en")
		})
		persistLocale(resolved)

		if(useLocaleStore.getState().locale !== resolved) {
			useLocaleStore.setState({ locale: resolved })
		}

		if(language !== resolved) {
			void i18n.changeLanguage(resolved)
		}
	})
}

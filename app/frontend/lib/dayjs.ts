import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"

import { dayjsLocale, resolveLocale } from "./locale"

dayjs.extend(localizedFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const dayjsLocaleLoaders = import.meta.glob("/node_modules/dayjs/locale/*.js")

function dayjsLocaleLoader(dayjsId: string) {
	const key = `/node_modules/dayjs/locale/${dayjsId}.js`
	return dayjsLocaleLoaders[key]
}

export async function applyDayjsLocale(appLocale?: string) {
	const resolvedAppLocale = resolveLocale(appLocale)
	const localeId = dayjsLocale(resolvedAppLocale)

	if(localeId === "en") {
		dayjs.locale("en")
		return
	}

	const loader = dayjsLocaleLoader(localeId)
	if(loader !== undefined) {
		await loader()
		dayjs.locale(localeId)
		return
	}

	try {
		await import(/* @vite-ignore */ `dayjs/locale/${localeId}.js`)
		dayjs.locale(localeId)
	} catch{
		dayjs.locale("en")
	}
}

export { dayjs }

import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(localizedFormat)
dayjs.extend(duration)
dayjs.extend(relativeTime)

const dayjsLocaleLoaders = import.meta.glob("/node_modules/dayjs/locale/*.js")

function dayjsLocaleLoader(dayjsId: string) {
	const key = `/node_modules/dayjs/locale/${dayjsId}.js`
	return dayjsLocaleLoaders[key]
}

export async function applyDayjsLocale(locale = "en") {
	const normalized = locale.replaceAll("_", "-").toLowerCase()
	const language = normalized.split("-")[0]

	for(const localeId of [normalized, language]) {
		if(localeId === "en") {
			dayjs.locale("en")
			return
		}

		const loader = dayjsLocaleLoader(localeId)
		if(loader === undefined) continue

		await loader()
		dayjs.locale(localeId)
		return
	}

	dayjs.locale("en")
}

export { dayjs }

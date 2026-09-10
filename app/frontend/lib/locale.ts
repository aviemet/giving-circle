import { DEFAULT_LOCALE, i18n, localeIds } from "./i18n"

export { DEFAULT_LOCALE, localeIds }

export function intlLocale(id = i18n.language) {
	if(id === undefined || id === "") return DEFAULT_LOCALE
	return id
}

export function flagRegion(id = i18n.language) {
	try {
		const region = new Intl.Locale(intlLocale(id)).maximize().region
		if(region !== undefined) return region
	} catch{
	}

	return "US"
}

export function localeDisplayName(id: string, ofLocale = i18n.language) {
	try {
		const name = new Intl.DisplayNames([intlLocale(ofLocale), "en"], { type: "language" }).of(id)
		if(name !== undefined && name !== "") return name
	} catch{
	}

	return id
}

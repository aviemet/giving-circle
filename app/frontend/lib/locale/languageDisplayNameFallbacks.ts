const LANGUAGE_DISPLAY_NAME_FALLBACKS: Record<string, string> = {
	dz: "Dzongkha",
	hsb: "Upper Sorbian",
	pap: "Papiamento",
	sc: "Sardinian",
}

export function languageDisplayNameFallback(languageSubtag: string) {
	return LANGUAGE_DISPLAY_NAME_FALLBACKS[languageSubtag.toLowerCase()]
}

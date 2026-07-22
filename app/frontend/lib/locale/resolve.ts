import { languageDisplayNameFallback } from "./languageDisplayNameFallbacks"
import { localeRegistry } from "./localeRegistry"
import { type LocaleDefinition, type LocaleOption } from "./types"

export const DEFAULT_LOCALE = "en"

let currentAppLocale = DEFAULT_LOCALE

function homeRegionalLocaleId(languageOnlyId: string) {
	const hyphenated = languageOnlyId.replace(/_/g, "-")
	if(hyphenated.includes("-")) return undefined

	const definition = localeRegistry[hyphenated] ?? localeRegistry[languageOnlyId]
	if(definition === undefined) return undefined

	const homeRegionalId = `${hyphenated}-${definition.flagRegion}`
	if(localeRegistry[homeRegionalId] !== undefined) return homeRegionalId

	return undefined
}

function canonicalizeLocaleId(id: string) {
	const hyphenated = id.replace(/_/g, "-")
	const registryId = localeRegistry[hyphenated] !== undefined
		? hyphenated
		: localeRegistry[id] !== undefined
			? id
			: undefined

	if(registryId === undefined) return id

	const homeRegionalId = homeRegionalLocaleId(registryId)
	if(homeRegionalId !== undefined) return homeRegionalId

	return registryId
}

export function resolveLocale(language?: string) {
	if(language !== undefined && language !== "") {
		if(localeRegistry[language] !== undefined) {
			return canonicalizeLocaleId(language)
		}

		const hyphenated = language.replace(/_/g, "-")
		if(localeRegistry[hyphenated] !== undefined) {
			return canonicalizeLocaleId(hyphenated)
		}

		const languageOnly = hyphenated.split("-")[0]
		if(localeRegistry[languageOnly] !== undefined) {
			return canonicalizeLocaleId(languageOnly)
		}
	}

	return canonicalizeLocaleId(DEFAULT_LOCALE)
}

export const DEFAULT_APP_LOCALE = resolveLocale(DEFAULT_LOCALE)

currentAppLocale = DEFAULT_APP_LOCALE

export function setCurrentAppLocale(locale: string) {
	currentAppLocale = resolveLocale(locale)
}

export function getCurrentAppLocale() {
	return currentAppLocale
}

export function getLocaleDefinition(appLocale?: string): LocaleDefinition {
	const id = resolveLocale(appLocale ?? currentAppLocale)
	const definition = localeRegistry[id]
	if(definition !== undefined) return definition

	const fallback = localeRegistry[DEFAULT_LOCALE]
	if(fallback !== undefined) return fallback

	return {
		id: DEFAULT_APP_LOCALE,
		intlLocale: "en-US",
		dayjsLocale: "en",
		flagRegion: "US",
	}
}

export function intlLocale(appLocale?: string) {
	return getLocaleDefinition(appLocale).intlLocale
}

export function dayjsLocale(appLocale?: string) {
	return getLocaleDefinition(appLocale).dayjsLocale
}

export function flagRegion(appLocale?: string) {
	return getLocaleDefinition(appLocale).flagRegion
}

function languageTagForDisplay(definition: LocaleDefinition) {
	const hyphenated = definition.id.replace(/_/g, "-")
	const isLanguageOnly = !hyphenated.includes("-")
	if(!isLanguageOnly) return definition.intlLocale

	if(
		definition.intlLocale === hyphenated ||
		definition.intlLocale.startsWith(`${hyphenated}-`)
	) {
		return hyphenated
	}

	return definition.intlLocale
}

function languageSubtag(tag: string) {
	return tag.replace(/_/g, "-").split("-")[0]
}

function regionSubtag(tag: string) {
	const parts = tag.replace(/_/g, "-").split("-").slice(1)
	for(const part of parts) {
		if(/^[A-Za-z]{2}$/.test(part) || /^\d{3}$/.test(part)) return part.toUpperCase()
	}

	return undefined
}

function isCodeLikeLabel(label: string, definition: LocaleDefinition, languageTag: string) {
	const normalizedLabel = label.toLowerCase()
	const language = languageSubtag(languageTag).toLowerCase()
	return (
		normalizedLabel === definition.id.toLowerCase() ||
		normalizedLabel === definition.id.replace(/_/g, "-").toLowerCase() ||
		normalizedLabel === definition.intlLocale.toLowerCase() ||
		normalizedLabel === languageTag.toLowerCase() ||
		normalizedLabel === language ||
		new RegExp(`^${language}(?:\\s|\\(|$)`, "i").test(label)
	)
}

function capitalizeDisplayLabel(label: string, locale: string) {
	const characters = Array.from(label)
	if(characters.length === 0) return label

	characters[0] = characters[0].toLocaleUpperCase(locale)
	return characters.join("")
}

function composeLanguageRegionLabel(
	languageLabel: string,
	regionLabel: string | undefined,
	ofLocale: string,
) {
	if(regionLabel === undefined || regionLabel === "") {
		return capitalizeDisplayLabel(languageLabel, ofLocale)
	}

	return capitalizeDisplayLabel(`${languageLabel} (${regionLabel})`, ofLocale)
}

function resolveLanguageLabel(
	language: string,
	languageNames: Intl.DisplayNames,
	target: LocaleDefinition,
) {
	const fromIntl = languageNames.of(language)
	if(
		fromIntl !== undefined &&
		fromIntl !== "" &&
		!isCodeLikeLabel(fromIntl, target, language)
	) {
		return fromIntl
	}

	return languageDisplayNameFallback(language)
}

export function localeDisplayName(appLocale: string, displayLocale?: string) {
	const target = getLocaleDefinition(appLocale)
	const ofLocale = intlLocale(displayLocale ?? currentAppLocale)
	const languageTag = languageTagForDisplay(target)
	const language = languageSubtag(languageTag)
	const region = regionSubtag(languageTag)

	try {
		const languageNames = new Intl.DisplayNames([ofLocale, "en"], { type: "language" })
		const fullLabel = languageNames.of(languageTag)
		if(
			fullLabel !== undefined &&
			fullLabel !== "" &&
			!isCodeLikeLabel(fullLabel, target, languageTag)
		) {
			return capitalizeDisplayLabel(fullLabel, ofLocale)
		}

		const languageLabel = resolveLanguageLabel(language, languageNames, target)
		if(languageLabel === undefined) return target.id

		if(region === undefined) {
			return capitalizeDisplayLabel(languageLabel, ofLocale)
		}

		const regionNames = new Intl.DisplayNames([ofLocale, "en"], { type: "region" })
		const regionLabel = regionNames.of(region)
		if(regionLabel === undefined || regionLabel === "" || regionLabel === region) {
			return capitalizeDisplayLabel(languageLabel, ofLocale)
		}

		return composeLanguageRegionLabel(languageLabel, regionLabel, ofLocale)
	} catch{
		const fallback = languageDisplayNameFallback(language)
		if(fallback !== undefined) {
			if(region === undefined) return capitalizeDisplayLabel(fallback, ofLocale)
			try {
				const regionNames = new Intl.DisplayNames([ofLocale, "en"], { type: "region" })
				const regionLabel = regionNames.of(region)
				if(regionLabel !== undefined && regionLabel !== "" && regionLabel !== region) {
					return composeLanguageRegionLabel(fallback, regionLabel, ofLocale)
				}
			} catch{
				return capitalizeDisplayLabel(fallback, ofLocale)
			}
			return capitalizeDisplayLabel(fallback, ofLocale)
		}

		return target.id
	}
}

function preferPickerLocaleId(existingId: string, candidateId: string, intlLocaleId: string) {
	if(existingId === intlLocaleId) return existingId
	if(candidateId === intlLocaleId) return candidateId

	const existingHasUnderscore = existingId.includes("_")
	const candidateHasUnderscore = candidateId.includes("_")
	if(existingHasUnderscore !== candidateHasUnderscore) {
		if(existingHasUnderscore) return candidateId
		return existingId
	}

	if(existingId.length !== candidateId.length) {
		if(existingId.length > candidateId.length) return existingId
		return candidateId
	}

	if(existingId.localeCompare(candidateId) <= 0) return existingId
	return candidateId
}

function isRedundantLanguageOnlyId(id: string) {
	const hyphenated = id.replace(/_/g, "-")
	if(hyphenated.includes("-")) return false

	const definition = localeRegistry[id]
	if(definition === undefined) return false

	const homeRegionalId = `${hyphenated}-${definition.flagRegion}`
	return localeRegistry[homeRegionalId] !== undefined
}

function preferredPickerLocaleIds() {
	const byIntlLocale = new Map<string, string>()

	for(const id of Object.keys(localeRegistry)) {
		const definition = localeRegistry[id]
		if(definition === undefined) continue

		const existing = byIntlLocale.get(definition.intlLocale)
		if(existing === undefined) {
			byIntlLocale.set(definition.intlLocale, id)
			continue
		}

		byIntlLocale.set(
			definition.intlLocale,
			preferPickerLocaleId(existing, id, definition.intlLocale),
		)
	}

	return [...byIntlLocale.values()].filter(id => !isRedundantLanguageOnlyId(id))
}

export function localeLabelsDiffer(left: string, right: string) {
	return left.localeCompare(right, undefined, { sensitivity: "accent" }) !== 0
}

export function localeOptions(displayLocale?: string): LocaleOption[] {
	const ofLocale = displayLocale ?? currentAppLocale

	return preferredPickerLocaleIds()
		.map(id => {
			const definition = localeRegistry[id]
			return {
				id,
				nativeLabel: localeDisplayName(id, id),
				translatedLabel: localeDisplayName(id, ofLocale),
				flagRegion: definition.flagRegion,
			}
		})
		.filter(option => {
			const definition = localeRegistry[option.id]
			if(definition === undefined) return false

			const languageTag = languageTagForDisplay(definition)
			const nativeIsCode = isCodeLikeLabel(option.nativeLabel, definition, languageTag)
			const translatedIsCode = isCodeLikeLabel(option.translatedLabel, definition, languageTag)
			return !(nativeIsCode && translatedIsCode)
		})
		.sort((left, right) => left.nativeLabel.localeCompare(right.nativeLabel, "en"))
}

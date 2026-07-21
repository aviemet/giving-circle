export type { LocaleDefinition, LocaleOption } from "./types"
export { localeRegistry, registryLocaleIds } from "./localeRegistry"
export type { RegistryLocaleId } from "./localeRegistry"
export {
	DEFAULT_LOCALE,
	DEFAULT_APP_LOCALE,
	setCurrentAppLocale,
	getCurrentAppLocale,
	resolveLocale,
	getLocaleDefinition,
	intlLocale,
	dayjsLocale,
	flagRegion,
	localeDisplayName,
	localeLabelsDiffer,
	localeOptions,
} from "./resolve"

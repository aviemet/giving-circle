import clsx from "clsx"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Group, LocaleFlag, ScrollArea, Stack, Text, UnstyledButton } from "@/components"
import { SearchIcon } from "@/components/Icons"
import { TextInput } from "@/components/Inputs"
import { flagRegion, intlLocale, localeDisplayName, localeLabelsDiffer, localeOptions } from "@/lib/locale"
import { useLocaleStore } from "@/store"

import * as classes from "./LanguageModal.css"

interface LanguagePickerProps {
	onSelect?: (localeId: string) => void
}

export function LanguagePicker({ onSelect }: LanguagePickerProps) {
	const { t } = useTranslation()
	const locale = useLocaleStore(state => state.locale)
	const setLocale = useLocaleStore(state => state.setLocale)
	const [languageFilter, setLanguageFilter] = useState("")

	const options = useMemo(() => localeOptions(locale), [locale])
	const currentIntlLocale = useMemo(() => intlLocale(locale), [locale])

	const filteredOptions = useMemo(() => {
		const query = languageFilter.trim().toLowerCase()
		if(query === "") return options
		return options.filter(option =>
			option.nativeLabel.toLowerCase().includes(query) ||
			option.translatedLabel.toLowerCase().includes(query) ||
			option.id.toLowerCase().includes(query),
		)
	}, [options, languageFilter])

	const handleLanguageFilterChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setLanguageFilter(event.currentTarget.value)
	}, [])

	const handleSelectLocale = useCallback(async (localeId: string) => {
		setLanguageFilter("")
		onSelect?.(localeId)
		await setLocale(localeId)
	}, [onSelect, setLocale])

	return (
		<Stack gap="sm">
			<TextInput
				size="sm"
				placeholder={ t("navigation.languageSearch") }
				value={ languageFilter }
				onChange={ handleLanguageFilterChange }
				leftSection={ <SearchIcon /> }
				aria-label={ t("navigation.languageSearch") }
			/>
			<ScrollArea.Autosize mah={ 360 } type="scroll">
				<Stack gap={ 4 }>
					{ filteredOptions.map(option => {
						const isActive = intlLocale(option.id) === currentIntlLocale

						return (
							<UnstyledButton
								key={ option.id }
								type="button"
								onClick={ () => { void handleSelectLocale(option.id) } }
								data-locale-id={ option.id }
								data-active={ isActive ? "true" : undefined }
								className={ clsx(classes.option, isActive && classes.activeOption) }
							>
								<Group gap="sm" wrap="nowrap">
									<LocaleFlag region={ option.flagRegion } decorative />
									<Group gap="xs" wrap="nowrap">
										<Text size="sm">{ option.nativeLabel }</Text>
										{ localeLabelsDiffer(option.nativeLabel, option.translatedLabel) && (
											<Text size="sm" c="dimmed">{ option.translatedLabel }</Text>
										) }
									</Group>
								</Group>
							</UnstyledButton>
						)
					}) }
				</Stack>
			</ScrollArea.Autosize>
		</Stack>
	)
}

interface LanguageModalCurrentLocaleProps {
	locale: string
}

export function LanguageModalCurrentLocale({ locale }: LanguageModalCurrentLocaleProps) {
	const { t } = useTranslation()
	const nativeLabel = localeDisplayName(locale, locale)
	const translatedLabel = localeDisplayName(locale)

	return (
		<Box className={ clsx(classes.currentLocale) }>
			<Text size="xs" c="dimmed">{ t("navigation.currentLanguage") }</Text>
			<Group gap="sm" mt={ 4 }>
				<LocaleFlag region={ flagRegion(locale) } title={ nativeLabel } />
				<div>
					<Text fw={ 600 }>{ nativeLabel }</Text>
					{ localeLabelsDiffer(nativeLabel, translatedLabel) && (
						<Text size="xs" c="dimmed">{ translatedLabel }</Text>
					) }
					<Text size="xs" c="dimmed">{ locale }</Text>
				</div>
			</Group>
		</Box>
	)
}

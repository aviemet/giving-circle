import { router } from "@inertiajs/react"
import { modals } from "@mantine/modals"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Button, Group, Link, Stack, Text } from "@/components"
import { TextInput, Select } from "@/components/Inputs"
import { Routes } from "@/lib"

export interface CreatePresentationFromTemplateModalContentProps {
	template: Schema.TemplatesIndex
	themes: Schema.ThemesIndex[]
	circleSlug: string
}

export function CreatePresentationFromTemplateModalContent({
	template,
	themes,
	circleSlug,
}: CreatePresentationFromTemplateModalContentProps) {
	const { t } = useTranslation()
	const defaultName = template.name ? `${template.name} Presentation` : ""
	const [themeSlug, setThemeSlug] = useState(themes[0]?.slug ?? "")
	const [name, setName] = useState(defaultName)

	if(themes.length === 0) {
		return (
			<Stack gap="md">
				<Text size="sm">{ t("templates.index.createPresentationModal.noThemes") }</Text>
				<Link href={ Routes.newCircleTheme(circleSlug) }>
					{ t("templates.index.createPresentationModal.newTheme") }
				</Link>
			</Stack>
		)
	}

	const handleCreate = () => {
		if(name.trim().length === 0 || themeSlug.length === 0) return

		router.post(
			Routes.themePresentations(circleSlug, themeSlug),
			{ presentation: { name: name.trim(), template_id: template.id } },
		)
		modals.closeAll()
	}

	return (
		<Stack gap="md">
			<Select
				name="theme_slug"
				label={ t("templates.index.createPresentationModal.theme") }
				options={ themes.map((theme) => ({ value: theme.slug, label: theme.name })) }
				value={ themeSlug }
				onChange={ (value) => setThemeSlug(value ?? "") }
				required
			/>
			<TextInput
				name="presentation_name"
				label={ t("templates.index.createPresentationModal.name") }
				value={ name }
				onChange={ (event) => setName(event.currentTarget.value) }
				required
			/>
			<Group justify="flex-end">
				<Button variant="default" onClick={ () => modals.closeAll() }>
					{ t("templates.index.createPresentationModal.cancel") }
				</Button>
				<Button onClick={ handleCreate }>
					{ t("templates.index.createPresentationModal.submit") }
				</Button>
			</Group>
		</Stack>
	)
}

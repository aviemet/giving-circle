import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, Text, UnstyledButton } from "@/components"

import * as classes from "./flowLane.css"
import { FlowSurface } from "./FlowSurface"

interface MemberFormStepProps {
	uiTemplateId: string
	uiTemplates: Array<{ id: string, name: string, slug: string }>
	onChange: (uiTemplateId: string) => void
	required?: boolean
}

function screenHintForSlug(slug: string, t: (key: string) => string): string {
	const key = `presentations.interactions.form.pipeline.screen_hints.${slug}`
	const translated = t(key)
	if(translated === key) {
		return t("presentations.interactions.form.pipeline.screen_hints.default")
	}
	return translated
}

export function MemberFormStep({
	uiTemplateId,
	uiTemplates,
	onChange,
}: MemberFormStepProps) {
	const { t } = useTranslation()

	return (
		<FlowSurface title={ t("presentations.interactions.form.pipeline.member_form_title") }>
			<Text size="sm" c="dimmed" mb="sm">
				{ t("presentations.interactions.form.pipeline.member_form_description") }
			</Text>
			<Box className={ clsx(classes.screenGrid) } role="listbox" aria-label={ t("presentations.interactions.form.pipeline.member_form_title") }>
				{ uiTemplates.map((template) => {
					const selected = template.id === uiTemplateId

					return (
						<UnstyledButton
							key={ template.id }
							type="button"
							role="option"
							aria-selected={ selected }
							className={ clsx(classes.screenTile, selected && classes.screenTileSelected) }
							onClick={ () => {
								onChange(template.id)
							} }
						>
							<Box className={ clsx(classes.screenPreview) } aria-hidden>
								<Box className={ clsx(classes.screenPreviewBar) } />
								<Box className={ clsx(classes.screenPreviewRow) } />
								<Box className={ clsx(classes.screenPreviewRow) } />
							</Box>
							<Text className={ clsx(classes.screenName) }>{ template.name }</Text>
							<Text className={ clsx(classes.screenHint) }>
								{ screenHintForSlug(template.slug, t) }
							</Text>
						</UnstyledButton>
					)
				}) }
			</Box>
		</FlowSurface>
	)
}

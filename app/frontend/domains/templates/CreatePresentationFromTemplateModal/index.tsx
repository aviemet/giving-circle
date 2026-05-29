import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { ActionIcon, Tooltip } from "@/components"
import { PresentationIcon } from "@/components/Icons"
import { rem } from "@/lib"

import { CreatePresentationFromTemplateModalContent } from "./CreatePresentationFromTemplateModalContent"

interface CreatePresentationFromTemplateButtonProps {
	template: Schema.TemplatesIndex
	themes: Schema.ThemesIndex[]
	circleSlug: string
}

export function CreatePresentationFromTemplateButton({
	template,
	themes,
	circleSlug,
}: CreatePresentationFromTemplateButtonProps) {
	const { t } = useTranslation()

	const handleOpenModal = () => {
		modals.open({
			title: t("templates.index.createPresentationModal.title"),
			children: (
				<CreatePresentationFromTemplateModalContent
					template={ template }
					themes={ themes }
					circleSlug={ circleSlug }
				/>
			),
		})
	}

	return (
		<Tooltip label={ t("templates.index.createPresentation") }>
			<ActionIcon
				variant="subtle"
				color="gray"
				onClick={ handleOpenModal }
				aria-label={ t("templates.index.createPresentation") }
			>
				<PresentationIcon style={ { width: rem(16), height: rem(16) } } />
			</ActionIcon>
		</Tooltip>
	)
}

import { modals } from "@mantine/modals"
import { useTranslation } from "react-i18next"

import { Button, ButtonLink, Menu } from "@/components"
import { DownArrowIcon } from "@/components/Icons"
import { Routes } from "@/lib"

import { ChooseMessageTemplateModalContent } from "./ChooseMessageTemplateModalContent"

export interface NewMessageSplitButtonProps {
	messageTemplates: Schema.MessageTemplatesPersisted[]
	circleSlug: string
	themeSlug: string
	presentationSlug: string
}

export function NewMessageSplitButton({
	messageTemplates,
	circleSlug,
	themeSlug,
	presentationSlug,
}: NewMessageSplitButtonProps) {
	const { t } = useTranslation()

	const handleOpenTemplateModal = () => {
		modals.open({
			title: t("presentation_messages.index.choose_template_modal.title"),
			children: (
				<ChooseMessageTemplateModalContent
					messageTemplates={ messageTemplates }
					circleSlug={ circleSlug }
					themeSlug={ themeSlug }
					presentationSlug={ presentationSlug }
				/>
			),
		})
	}

	return (
		<Button.Group>
			<ButtonLink
				href={ Routes.newThemePresentationMessage(circleSlug, themeSlug, presentationSlug) }
				style={ { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }
			>
				{ t("presentation_messages.index.new_message") }
			</ButtonLink>
			<Menu position="bottom-end">
				<Menu.Target>
					<Button
						p="xs"
						aria-label={ t("presentation_messages.index.new_message_options") }
					>
						<DownArrowIcon />
					</Button>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item onClick={ handleOpenTemplateModal }>
						{ t("presentation_messages.index.from_template") }
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Button.Group>
	)
}

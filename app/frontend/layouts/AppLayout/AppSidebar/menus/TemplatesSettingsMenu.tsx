import { useTranslation } from "react-i18next"

import { Accordion, NavLink } from "@/components"
import { PresentationIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"

export const templatesSettingsMenuKey = "templates"

interface TemplatesSettingsMenuProps {
	circle: Schema.CirclesInertiaShare
}

export function TemplatesSettingsMenu({ circle }: TemplatesSettingsMenuProps) {
	const { t } = useTranslation()
	const { paths } = useLocation()
	const isThisCircle = paths[1] === circle.slug

	return (
		<Accordion.Item value={ templatesSettingsMenuKey }>
			<Accordion.Control icon={ <PresentationIcon /> }>
				{ t("navigation.templates") }
			</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.settingsTemplates(circle.slug) }
					active={ isThisCircle && paths[2] === "templates" }
				>
					{ t("navigation.presentationTemplates") }
				</NavLink>

				<NavLink
					href={ Routes.settingsInteractionTemplates(circle.slug) }
					active={ isThisCircle && paths[2] === "interaction_templates" }
				>
					{ t("navigation.interactionTemplates") }
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

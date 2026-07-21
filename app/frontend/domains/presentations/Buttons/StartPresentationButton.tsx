import { useTranslation } from "react-i18next"

import { Tooltip, Button, ButtonProps } from "@/components"
import { PresentationIcon } from "@/components/Icons"

interface PresentationIconProps extends ButtonProps {
	presentation: Schema.PresentationsPersisted
}

export const StartPresentationButton = ({ presentation }: PresentationIconProps) => {
	const { t } = useTranslation()
	const handleClick = () => {

	}

	return (
		<Tooltip label={ t("presentations.show.startPresentation") }>
			<Button onClick={ handleClick }>
				<PresentationIcon />
			</Button>
		</Tooltip>
	)
}

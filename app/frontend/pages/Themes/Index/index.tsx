import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { ThemesTable } from "@/domains/themes/Table"
import { IndexTableTemplate } from "@/features"

interface ThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes
// @route: circleThemes
const ThemesIndex = ({ themes, pagination, circle }: ThemeIndexProps) => {
	const { t } = useTranslation()

	return (
		<Page
			title={ t("themes.index.title") }
		>
			<IndexTableTemplate
				model="themes"
				pagination={ pagination }
			>
				<ThemesTable records={ themes } pagination={ pagination } model="themes" />
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemesIndex

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import ThemesTable from "../Table"

interface ThemeIndexProps {
	themes: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes
// @route: circleThemes
const ThemesIndex = ({ themes, pagination, circle }: ThemeIndexProps) => {
	const { params } = usePageProps<"circleThemes">()

	return (
		<Page
			title="Themes"
		>
			<IndexTableTemplate
				model="themes"
				rows={ themes }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{ label: 'New Theme', href: Routes.newCircleTheme(params.circle_slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<ThemesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default ThemesIndex

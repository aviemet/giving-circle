import { useTranslation } from "react-i18next"

import { Title, Page, Section } from "@/components"
import { ThemeForm } from "@/domains/themes/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewThemeProps {
	theme: Schema.ThemesFormData
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes/new
// @route: newCircleTheme
const NewTheme = ({ circle, ...data }: NewThemeProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"newCircleTheme">()

	const title = t("themes.new.title")

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<ThemeForm
					to={ Routes.circleThemes(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

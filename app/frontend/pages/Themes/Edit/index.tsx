import { Page, Section } from "@/components"
import { ThemeForm } from "@/domains/themes/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditThemeProps {
	theme: Schema.ThemesEdit
}

// @path: /:circle_slug/themes/:theme_slug/edit
// @route: editTheme
const EditTheme = ({ theme }: EditThemeProps) => {
	const { params } = usePageProps<"editTheme">()
	const title = "Edit Theme"

	return (
		<Page title={ title }>
			<Section>

				<ThemeForm
					method="put"
					to={ Routes.theme(params.circle_slug, params.theme_slug) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

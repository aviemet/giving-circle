import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { CircleForm } from "@/domains/circles/Form"
import { Routes } from "@/lib"


interface NewCircleProps {
	circle: Schema.CirclesFormData
}

// @path: /circles/new
// @route: newCircle
const NewCircle = (data: NewCircleProps) => {
	const { t } = useTranslation()
	const title = t("circles.new.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("navigation.circles"), href: Routes.circles() },
			{ title, href: Routes.newCircle() },
		] }>

			<Section>
				<CircleForm
					to={ Routes.circles() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewCircle

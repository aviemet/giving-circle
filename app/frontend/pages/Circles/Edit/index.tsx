import { useTranslation } from "react-i18next"

import { Page, Section } from "@/components"
import { CircleForm } from "@/domains/circles/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

// @path: /:circle_slug/edit
// @route: editCircle
const EditCircle = ({ circle }: EditCircleProps) => {
	const { t } = useTranslation()
	const { params } = usePageProps<"editCircle">()
	const title = t("circles.edit.title")

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: t("navigation.circles"), href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title, href: Routes.editCircle(params.circle_slug) },
		] }>
			<Section>
				<CircleForm
					method="put"
					to={ Routes.circle(params.circle_slug) }
					circle={ circle }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

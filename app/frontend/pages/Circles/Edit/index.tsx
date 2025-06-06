import { Page, Section } from "@/components"
import CirclesForm from "@/features/circles/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

// @path: /:circle_slug/edit
// @route: editCircle
const EditCircle = ({ circle }: EditCircleProps) => {
	const { params } = usePageProps<"editCircle">()
	const title = "Edit Circle"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Circles", href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title, href: Routes.editCircle(params.circle_slug) },
		] }>
			<Section>
				<CirclesForm
					method="put"
					to={ Routes.circle(params.circle_slug) }
					circle={ circle }
					filter={ ["circle.id", "circle.slug"] }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

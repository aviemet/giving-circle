import { Title, Page, Section } from "@/components"
import PeopleForm from "@/features/people/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface EditPersonProps {
	person: Schema.PeopleEdit
}

// @path: /people/:slug/edit
// @route: editPerson
const EditPerson = ({ person }: EditPersonProps) => {
	const { params } = usePageProps<"editPerson">()
	const title = `Edit ${person.name}`

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "People", href: Routes.people() },
			{ title: person.name, href: Routes.person(params.slug) },
			{ title },
		] }>
			<Section>
				<Title>{ title }</Title>

				<PeopleForm
					method="put"
					to={ Routes.person(params.slug) }
					person={ person }
				/>
			</Section>
		</Page>
	)
}

export default EditPerson

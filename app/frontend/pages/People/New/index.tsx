import { Title, Page, Section } from "@/components"
import PersonForm from "@/features/people/Form"
import { Routes } from "@/lib"


interface NewPersonProps {
	person: Schema.PeopleFormData
}

// @path: /people/new
// @route: newPerson
const NewPerson = ({ ...data }: NewPersonProps) => {
	const title = "New Person"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "People", href: Routes.people() },
			{ title: "New Person" },
		] }>

			<Section>
				<Title>{ title }</Title>

				<PersonForm
					to={ Routes.people() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewPerson

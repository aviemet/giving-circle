import { Grid } from "@/components"
import { Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"

export type NewTemplateFormData = {
	template: {
		name: string
	}
}

interface NewTemplateFormProps {}

const NewTemplateForm = ({}: NewTemplateFormProps) => {
	return (
		<Grid>
			<Grid.Col>
				<TextInput label="Name" name="template.name" />
			</Grid.Col>

			<Grid.Col>
				<Submit>Let&apos;s Get Started!</Submit>
			</Grid.Col>

		</Grid>
	)
}

export { NewTemplateForm }
/**
 * what are presentation settings values?
 *
 * rounds:
 * 	voting types:
 * 		counted votes:
 * 			goal post
 * 			ranked choice
 * 			chits
 *
 * 		money votes:
 * 			allocate your money
 *
 * 		pledges:
 * 			donate extra money
 *
 * how many orgs will get funded
 * will there be a consolation for the others
 *
 */

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type ThemeFormData = {
	theme: Schema.ThemesFormData
}

export interface ThemeFormProps {
	to: string
	method?: HTTPVerb
	theme: Schema.ThemesFormData
}

const ThemeForm = ({ to, method = "post", theme }: ThemeFormProps) => {
	return (
		<Form<ThemeFormData>
			action={ to }
			initialData={ { theme } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="theme.name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ theme.id ? "Update" : "Create" } Theme</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export { ThemeForm }

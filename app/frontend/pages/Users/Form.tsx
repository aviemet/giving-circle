import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import {
	Form,
	TextInput,
	Submit,
} from "@/components/Form"

type UserFormData = {
	user: Schema.UsersFormData
}

export interface UserFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<UserFormData>) => boolean | void
	user: Schema.UsersFormData
}

const UserForm = ({ to, method = "post", onSubmit, user }: UserFormProps) => {
	return (
		<Form
			model="user"
			data={ { user } }
			to={ to }
			method={ method }
			onSubmit={ onSubmit }
		>
			<TextInput name="first_name" label="First Name" required />

			<TextInput name="last_name" label="Last Name" required />

			<TextInput name="number" label="Number" required />

			<Submit>
				{ user.id ? "Update" : "Create" } User
			</Submit>
		</Form>
	)
}

export default React.memo(UserForm)

import React from "react"

import {
	Form,
	Submit,
} from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type UserFormData = {
	user: Schema.UsersFormData
}

export interface UserFormProps {
	to: string
	method?: HTTPVerb
	user: Schema.UsersFormData
}

const UserForm = ({ to, method = "post", user }: UserFormProps) => {
	return (
		<Form<UserFormData>
			action={ to }
			initialData={ { user } }
			method={ method }
		>
			<TextInput name="user.first_name" label="First Name" required />

			<TextInput name="user.last_name" label="Last Name" required />

			<TextInput name="user.number" label="Number" required />

			<Submit>
				{ user.id ? "Update" : "Create" } User
			</Submit>
		</Form>
	)
}

export const UserFormMemo = React.memo(UserForm)
export { UserFormMemo as UserForm }

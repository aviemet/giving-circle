import React from "react"
import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()

	return (
		<Form<UserFormData>
			action={ to }
			initialData={ { user } }
			method={ method }
		>
			<TextInput name="user.first_name" label={ t("users.form.first_name") } required />

			<TextInput name="user.last_name" label={ t("users.form.last_name") } required />

			<TextInput name="user.number" label={ t("users.form.number") } required />

			<Submit>
				{ t("users.form.update") }
			</Submit>
		</Form>
	)
}

export const UserFormMemo = React.memo(UserForm)
export { UserFormMemo as UserForm }

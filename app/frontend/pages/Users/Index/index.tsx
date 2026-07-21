import { useTranslation } from "react-i18next"

import { Page } from "@/components"
import { UsersTable } from "@/domains/users/Table"
import { IndexTableTemplate } from "@/features"


interface UserIndexProps {
	users: Schema.UsersIndex[]
	pagination: Schema.Pagination
}

// @path: /users
// @route: users
const UserIndex = ({ users, pagination }: UserIndexProps) => {
	const { t } = useTranslation()

	return (
		<Page
			title={ t("users.index.title") }
		>
			<IndexTableTemplate
				model="users"
				pagination={ pagination }
			>
				<UsersTable records={ users } pagination={ pagination } model="users" />
			</IndexTableTemplate>
		</Page>
	)
}

export default UserIndex

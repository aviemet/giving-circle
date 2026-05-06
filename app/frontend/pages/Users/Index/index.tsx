import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { UsersTable } from "@/domains/users/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"


interface UserIndexProps {
	users: Schema.UsersIndex[]
	pagination: Schema.Pagination
}

// @path: /users
// @route: users
const UserIndex = ({ users, pagination }: UserIndexProps) => {
	return (
		<Page
			title="Users"
		>
			<IndexTableTemplate
				model="users"
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.users(),
			// 	options: [
			// 		{ label: 'Invite New User', href: Routes.newUser(), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<UsersTable records={ users } pagination={ pagination } model="users" />
			</IndexTableTemplate>
		</Page>
	)
}

export default UserIndex

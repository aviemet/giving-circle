import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import UsersTable from "@/features/users/Table"
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
				rows={ users }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.users(),
			// 	options: [
			// 		{ label: 'Invite New User', href: Routes.newUser(), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<UsersTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default UserIndex

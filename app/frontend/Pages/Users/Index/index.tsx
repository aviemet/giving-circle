import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import UsersTable from '../Table'
import { Page } from '@/Components'

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

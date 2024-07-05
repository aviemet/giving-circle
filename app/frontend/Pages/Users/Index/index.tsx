import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import UsersTable from '../Table'

interface UserIndexProps {
	users: Schema.UsersIndex[]
	pagination: Schema.Pagination
}

const UserIndex = ({ users, pagination }: UserIndexProps) => {
	return (
		<IndexPageTemplate
			title="Users"
			model="users"
			rows={ users }
			pagination={ pagination }
			deleteRoute={ Routes.users() }
			menuOptions={ [
				{ label: 'Invite New User', href: Routes.newUser(), icon: NewIcon },
			] }
		>
			<UsersTable />
		</IndexPageTemplate>
	)
}

export default UserIndex

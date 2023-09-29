import React from 'react'
import { Center, Container, Heading, Button, Link, Table } from '@/Components'
import { Box, Text } from '@mantine/core'
import { Routes } from '@/lib'
import { usePage } from '@inertiajs/react'
import ThemesTable from '@/Pages/Themes/Table'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'

const NoCircles = () => <>
	<Text>It looks like you&apos;re not a member of any circles yet</Text>
	<Text>
		<Button component={ Link } href={ Routes.newCircle() } size="sm" p="xs" mr="xs">
			Create a new one
		</Button>
		or request access from someone who has already created one.
	</Text>
</>

interface YesCirclesProps {
	themes: Schema.ThemesIndex
	pagination: Schema.Pagination
}
const YesCircles = ({ themes, pagination }: YesCirclesProps) => {
	return (
		<>
			<Center><Text>Dashboard</Text></Center>
			<IndexPageTemplate
				title="Themes"
				model="themes"
				rows={ themes }
				pagination={ pagination }
				deleteRoute={ Routes.themes() }
				menuOptions={ [
					{ label: 'New Theme', href: Routes.newTheme(), icon: NewIcon },
				] }
			>
				<ThemesTable />
			</IndexPageTemplate>
		</>
	)
}

interface DashboardProps {
	themes: Schema.ThemesIndex
	pagination: Schema.Pagination
}

const Dashboard = ({ themes, pagination }: DashboardProps) => {
	const { props } = usePage<SharedInertiaProps>()

	return (
		<Container>{ props.auth.user.circles.length > 0 ?
			<YesCircles />
			:
			<NoCircles />
		}</Container>
	)
}

export default Dashboard

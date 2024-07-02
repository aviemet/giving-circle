import React from 'react'
import { Heading, Page, Container, Divider, Group } from '@/Components'
import { CircleCard, ThemeCard, NewCard } from '@/Layouts/AppLayout/Components/Cards'
import { Routes } from '@/lib'

interface CircleIndexProps {
	circles: Schema.CirclesIndex[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles }: CircleIndexProps) => {

	return (
		<Page
			title="Dashboard"
			hideNavMenu
		>
			<Container>
				<Heading>Your Circles</Heading>
				<Divider />
				<Group>
					{ circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					}) }
					<NewCard href={ Routes.newCircle() } />
				</Group>

				<Heading>Recent Themes</Heading>
				<Divider />
				{ circles.map(circle => {
					return (
						<Group key={ circle.id }>
							{ circle.themes?.map(theme => (
								<ThemeCard key={ theme.id } theme={ theme } />
							)) }
							<Divider />
						</Group>
					)
				}) }
			</Container>
		</Page>
	)
}

export default CirclesIndex

import React from 'react'
import { Title, Page, Container, Divider, Group } from '@/Components'
import { CircleCard, ThemeCard, NewCard } from '@/Features/Cards'
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
				<Title>Your Circles</Title>
				<Divider />
				<Group>
					{ circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					}) }
					<NewCard href={ Routes.newCircle() } />
				</Group>

				<Title>Recent Themes</Title>
				<Divider />
				{ circles.map(circle => {
					return (
						<Group key={ circle.id }>
							{ circle.themes?.map(theme => (
								<ThemeCard key={ theme.id } theme={ theme } circle={ circle } />
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

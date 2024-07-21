import React from 'react'
import { Title, Page, Container, Divider, Group } from '@/Components'
import { NewButton } from '@/Components/Button'
import { CircleCard, ThemeCard } from '@/Features/Cards'
import { Routes } from '@/lib'

interface CircleIndexProps {
	circles: Schema.CirclesIndex[]
	pagination: Schema.Pagination
}

// @path: /circles
// @route: circles
const CirclesIndex = ({ circles }: CircleIndexProps) => {
	return (
		<Page
			title="Dashboard"
			hideNavMenu
		>
			<Container>
				<Group justify="space-between">
					<Title>Your Circles</Title>
					<NewButton href={ Routes.newCircle() } />
				</Group>
				<Divider />
				<Group>
					{ circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					}) }
					{ /* <NewCard href={ Routes.newCircle() } /> */ }
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

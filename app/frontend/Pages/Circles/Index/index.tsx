import React from 'react'
import { Heading, Page, Container, Divider, Group } from '@/Components'
import CircleCard from './CircleCard'
import ThemeCard from './ThemeCard'
import { Routes } from '@/lib'
import NewCard from './NewCard'

interface ICircleIndexProps {
	circles: Schema.CirclesIndex[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles }: ICircleIndexProps) => {
	return (
		<Page title="Dashboard">
			<Container>
				<Heading>Your Circles</Heading>
				<Divider />
				<Group>
					{ circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					})
					}
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
				})
				}
			</Container>
		</Page>
	)
}

export default CirclesIndex

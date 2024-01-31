import React from 'react'
import { Heading, Page, CircleCard, Container, Divider, Group, Paper  } from '@/Components'

interface ICircleIndexProps {
	circles: Schema.Circle[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles }: ICircleIndexProps) => {
	return (
		<Page title="Dashboard">
			<Container>
				<Heading>Your Circles</Heading>
				<Divider />
				<Group>{ circles ?
					circles.map(circle => {
						return (
							<CircleCard key={ circle.id } circle={ circle } />
						)
					})
					:
					<Paper>+ New</Paper>
				}</Group>

				<Heading>Recent Themes</Heading>
				<Divider />
				{ /* List recent themes here */ }
			</Container>
		</Page>
	)
}

export default CirclesIndex

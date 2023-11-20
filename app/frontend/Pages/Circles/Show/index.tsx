import React from 'react'
import { Box, Group, Heading, Menu, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowCircleProps {
	circle: Schema.CirclesShow
	themes: Schema.Theme[]
}

const ShowCircle = ({ circle, themes }: IShowCircleProps) => {
	const title = circle.name || 'Circle'

	return (
		<Section>
			<Group justify="apart">
				<Heading>{ title }</Heading>

				<Menu position="bottom-end">
					<Menu.Target />
					<Menu.Dropdown>
						<Menu.Link href={ Routes.editCircle(circle.slug) }>
								Edit Circle
						</Menu.Link>
					</Menu.Dropdown>
				</Menu>
			</Group>

			<Heading order={ 2 }>Upcoming Themes</Heading>
			{ themes.map(theme => (
				<Box key={ theme.id }>{ theme.title }</Box>
			)) }

		</Section>
	)
}

export default ShowCircle

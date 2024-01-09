import React from 'react'
import { Box, Container, Group, Heading, Link, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { getCircleMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface IShowCircleProps {
	circle: Schema.CirclesShow
	themes: Schema.ThemesShow[]
}

const ShowCircle = ({ circle, themes }: IShowCircleProps) => {
	const title = circle.name || 'Circle'

	return (
		<Page
			title={ circle.name }
			navMenu={ getCircleMenu({ circle }) }
		>
			<Section>
				<Container>
					<Group justify="space-between">
						<Heading>{ title }</Heading>

						<Menu position="bottom-end">
							<Menu.Target />
							<Menu.Dropdown>
								<Menu.Link href={ Routes.editAdminCircle(circle.slug) }>
								Edit Circle
								</Menu.Link>
							</Menu.Dropdown>
						</Menu>
					</Group>

					<Heading order={ 2 }>Upcoming Themes</Heading>
					{ themes.map(theme => (
						<Box key={ theme.id }>
							<Link href={ Routes.adminCircleTheme(circle.slug, theme.slug) }>{ theme.title }</Link>
						</Box>
					)) }
				</Container>
			</Section>
		</Page>
	)
}

export default ShowCircle

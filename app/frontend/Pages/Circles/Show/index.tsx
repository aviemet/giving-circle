import React from 'react'
import { Container, Group, Title, Menu, Page, Section } from '@/Components'
import { CoinsIcon, HelpingIcon, MembersIcon } from '@/Components/Icons'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { CardContainer, ThemeCard } from '@/Features/Cards'
import StatTile from './StatTile'

interface ShowCircleProps {
	circle: Schema.CirclesShow
}

// @path: /circles/:circle_slug
// @route: circle
const ShowCircle = ({ circle }: ShowCircleProps) => {
	const { params } = usePageProps<'circle'>()
	const title = circle.name || 'Circle'

	return (
		<Page
			title={ circle.name }
			siteTitle={ (
				<Group justify="space-between">
					<Title>{ circle.name }</Title>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircle(params.circle_slug) }>
								Edit Circle
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			) }
			breadcrumbs={ [
				{ title: 'Circles', href: Routes.circles() },
				{ title, href: Routes.circle(params.circle_slug) },
			] }
		>
			<Section>
				<Container>
					<Section py="md">
						<Group grow>
							<StatTile
								heading="Total Donated"
								value="$10"
								icon={ <CoinsIcon /> }
								color="purple"
							/>
							<StatTile
								heading="Orgs Helped"
								value="6"
								icon={ <HelpingIcon /> }
								color="green"
							/>
							<StatTile
								heading="Active Members"
								value="55"
								icon={ <MembersIcon /> }
								color="orange"
							/>
						</Group>
					</Section>

					<Title order={ 2 }>Upcoming Themes</Title>
					<CardContainer>
						{ circle.themes.map(theme => (
							<ThemeCard key={ theme.id } theme={ theme } circle={ circle } />
						)) }
					</CardContainer>
				</Container>
			</Section>
		</Page>
	)
}

export default ShowCircle

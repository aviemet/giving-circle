import React from 'react'
import { Group, Menu, Page, Section, Title } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { CardContainer } from '@/Features/Cards'
import OrgCard from '@/Features/Cards/OrgCard'

interface ShowThemeProps {
	theme: Schema.ThemesShow
}

// @path: /circles/:circle_slug/themes/:theme_slug
// @route: circleTheme
const ShowTheme = ({ theme }: ShowThemeProps) => {
	const { params } = usePageProps<'circleTheme'>()

	const title =  theme.name || 'Theme'

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.circleEditTheme(params.circle_slug, params.theme_slug) }>
								Edit Theme
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</> }
		>
			<Section>
				<CardContainer>
					{ theme.orgs.map(org => (
						<OrgCard key={ org.id } org={ org } />
					)) }
				</CardContainer>

			</Section>
		</Page>
	)
}

export default ShowTheme

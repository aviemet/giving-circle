import React from 'react'
import { Group, Menu, Page, Section, Title } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { CardContainer } from '@/Features/Cards'
import OrgCard from '@/Features/Cards/OrgCard'

interface ShowThemeProps {
	theme: Schema.ThemesShow
}

// @path: /:circle_slug/themes/:slug
// @route: theme
const ShowTheme = ({ theme }: ShowThemeProps) => {
	const { params } = usePageProps<'theme'>()

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
							<Menu.Link href={ Routes.editTheme(params.circle_slug, params.slug) }>
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

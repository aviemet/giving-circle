import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import { usePageProps } from '@/lib/hooks'

interface ShowThemeProps {
	theme: Schema.ThemesShow
}

// @path: /circles/:circle_slug/themes/:slug
// @route: circleTheme
const ShowTheme = ({ theme }: ShowThemeProps) => {
	const { params } = usePageProps<'circleTheme'>()

	const title =  theme.name || 'Theme'

	return (
		<Page
			title={ title }
			navMenu={ getThemeMenu({ circle: theme.circle, theme }) }
		>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleTheme(params.circle_slug, params.slug) }>
								Edit Theme
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowTheme

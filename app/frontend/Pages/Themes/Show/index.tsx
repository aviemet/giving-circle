import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface ShowThemeProps {
	theme: Schema.ThemesShow
}

const ShowTheme = ({ theme }: ShowThemeProps) => {
	const title =  theme.name || 'Theme'

	return (
		<Page
			title={ title }
			navMenu={ getThemeMenu({ circle: theme.circle, theme }) }
		>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleTheme(theme.circle_id, theme.slug) }>
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

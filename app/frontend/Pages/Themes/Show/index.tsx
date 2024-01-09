import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface IShowThemeProps {
	theme: Schema.ThemesShow
}

const ShowTheme = ({ theme }: IShowThemeProps) => {
	const title =  'Theme'

	return (
		<Page
			title={ title }
			navMenu={ getThemeMenu({ circle: theme.circle, theme }) }
		>
			<Section>
				<Group>
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editAdminCircleTheme(theme.circle.slug, theme.slug) }>
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

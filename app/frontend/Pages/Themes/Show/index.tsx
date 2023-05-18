import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowThemeProps {
	theme: Schema.ThemesShow
}

const ShowTheme = ({ theme }: IShowThemeProps) => {
	const title =  'Theme'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Theme', href: Routes.themes() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editTheme(theme.id) }>
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

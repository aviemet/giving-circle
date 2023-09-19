import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'

interface IEditThemeProps {
	theme: Schema.ThemesEdit
}

const EditTheme = ({ theme }: IEditThemeProps) => {
	const title = 'Edit Theme'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Themes', href: Routes.themes() },
			{ title: Theme, href: Routes.theme(theme.id) },
			{ title },
		] }>
			<Section>
				<Heading>{ title }</Heading>
				
				<ThemesForm
					method='put'
					to={ Routes.theme() }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

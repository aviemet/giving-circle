import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'

interface IEditThemeProps {
	theme: Schema.ThemesFormData
}

const EditTheme = ({ theme }: IEditThemeProps) => {
	const title = 'Edit Theme'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<ThemesForm
					method='put'
					to={ Routes.themes({ id: theme.slug }) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

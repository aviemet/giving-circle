import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'

interface EditThemeProps {
	theme: Schema.ThemesFormData
}

const EditTheme = ({ theme }: EditThemeProps) => {
	const title = 'Edit Theme'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<ThemesForm
					method='put'
					to={ Routes.circleTheme(theme.circle_id, theme.slug!) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

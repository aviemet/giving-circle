import React from 'react'
import { Heading, Page, Section } from '@/Components'
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
				<Heading>{ title }</Heading>

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

import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemeForm from '../Form'

interface NewThemeProps {
	theme: Schema.ThemesFormData
	circle: Schema.CirclesShare
}

const NewTheme = ({ circle, ...data }: NewThemeProps) => {

	const title = 'New Theme'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<ThemeForm
					to={ Routes.circleThemes(circle.slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

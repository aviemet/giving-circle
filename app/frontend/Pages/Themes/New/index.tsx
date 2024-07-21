import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemeForm from '../Form'

interface NewThemeProps {
	theme: Schema.ThemesFormData
	circle: Schema.CirclesInertiaShare
}

// @path: /circles/:circle_slug/themes/new
// @route: newCircleTheme
const NewTheme = ({ circle, ...data }: NewThemeProps) => {

	const title = 'New Theme'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<ThemeForm
					to={ Routes.circleThemes(circle.slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

import React from 'react'
import { Title, Page, Section } from '@/components'
import { Routes } from '@/lib'
import ThemeForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewThemeProps {
	theme: Schema.ThemesFormData
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes/new
// @route: newCircleTheme
const NewTheme = ({ circle, ...data }: NewThemeProps) => {
	const { params } = usePageProps<'newCircleTheme'>()

	const title = 'New Theme'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<ThemeForm
					to={ Routes.circleThemes(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

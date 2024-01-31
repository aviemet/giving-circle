import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemeForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface INewThemeProps {
	theme: Schema.ThemesFormData
}

const NewTheme = ({ ...data }: INewThemeProps) => {
	const { params } = usePageProps()

	const title = 'New Theme'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<ThemeForm
					to={ Routes.circleThemes(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

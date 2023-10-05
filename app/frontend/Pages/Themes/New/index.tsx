import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemeForm from '../Form'

interface INewThemeProps {
	theme: Schema.ThemesFormData
}

const NewTheme = ({ ...data }: INewThemeProps) => {
	const title = 'New Theme'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<ThemeForm
					to={ Routes.themes() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewTheme

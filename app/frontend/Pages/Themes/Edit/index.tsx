import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditThemeProps {
	theme: Schema.ThemesFormData
}

// @path: /circles/:circle_slug/themes/:theme_slug/edit
// @route: circleEditTheme
const EditTheme = ({ theme }: EditThemeProps) => {
	const { params } = usePageProps<'circleEditTheme'>()
	const title = 'Edit Theme'

	return (
		<Page title={ title }>
			<Section>

				<ThemesForm
					method='put'
					to={ Routes.circleTheme(params.circle_slug, params.theme_slug) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

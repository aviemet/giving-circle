import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditThemeProps {
	theme: Schema.ThemesFormData
}

// @path: /circles/:circle_slug/themes/:slug/edit
// @route: editCircleTheme
const EditTheme = ({ theme }: EditThemeProps) => {
	const { params } = usePageProps<'editCircleTheme'>()
	const title = 'Edit Theme'

	return (
		<Page title={ title }>
			<Section>

				<ThemesForm
					method='put'
					to={ Routes.circleTheme(params.circle_slug, params.slug) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

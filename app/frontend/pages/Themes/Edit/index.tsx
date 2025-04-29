import React from 'react'
import { Page, Section } from '@/components'
import { Routes } from '@/lib'
import ThemesForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditThemeProps {
	theme: Schema.ThemesEdit
}

// @path: /:circle_slug/themes/:theme_slug/edit
// @route: editTheme
const EditTheme = ({ theme }: EditThemeProps) => {
	const { params } = usePageProps<'editTheme'>()
	const title = 'Edit Theme'

	return (
		<Page title={ title }>
			<Section>

				<ThemesForm
					method='put'
					to={ Routes.theme(params.circle_slug, params.theme_slug) }
					theme={ theme }
				/>
			</Section>
		</Page>
	)
}

export default EditTheme

import React from 'react'
import { Page, Section } from '@/components'
import { Routes } from '@/lib'
import PresentationsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditPresentationProps {
	presentation: Schema.PresentationsEdit
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/edit
// @route: editThemePresentation
const EditPresentation = ({ presentation }: EditPresentationProps) => {
	const { params } = usePageProps<'editThemePresentation'>()

	const title = 'Edit Presentation'

	return (
		<Page
			title={ title }
		>
			<Section>
				<PresentationsForm
					method='put'
					to={ Routes.editThemePresentation(params.circle_slug, params.theme_slug, presentation.slug) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation

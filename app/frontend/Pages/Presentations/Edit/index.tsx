import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditPresentationProps {
	presentation: Schema.PresentationsEdit
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/edit
// @route: circleThemeEditPresentation
const EditPresentation = ({ presentation }: EditPresentationProps) => {
	const { params } = usePageProps<'circleThemeEditPresentation'>()

	const title = 'Edit Presentation'

	return (
		<Page
			title={ title }
		>
			<Section>
				<PresentationsForm
					method='put'
					to={ Routes.circleThemeEditPresentation(params.circle_slug, params.theme_slug, params.presentation_slug) }
					presentation={ presentation }
				/>
			</Section>
		</Page>
	)
}

export default EditPresentation

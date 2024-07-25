import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import PresentationForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewPresentationProps {
	presentation: Schema.PresentationsFormData
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/new
// @route: newCircleThemePresentation
const NewPresentation = ({ presentation }: NewPresentationProps) => {
	const { params } = usePageProps<'newCircleThemePresentation'>()

	const title = 'New Presentation'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<PresentationForm
					to={ Routes.circleThemePresentations(params.circle_slug, params.theme_slug) }
					presentation={ presentation }
				/>
			</Section>

		</Page>
	)
}

export default NewPresentation

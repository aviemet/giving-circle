import { Page } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import React from 'react'

interface ActivePresentationProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_presentation_slug/active
// @route: themePresentationActive
const ActivePresentation = ({ presentation }: ActivePresentationProps) => {
	const { params } = usePageProps<'themePresentationActive'>()

	return (
		<Page
			title={ presentation.name }
		>
			Active
		</Page>
	)
}

export default ActivePresentation

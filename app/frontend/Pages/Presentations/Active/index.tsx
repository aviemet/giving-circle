import { Page } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import React from 'react'

interface ActivePresentationProps {
	presentation: Schema.PresentationsShow
}

// @path: /:circle_slug/presentations/:presentation_slug/active
// @route: presentationActive
const ActivePresentation = ({ presentation }: ActivePresentationProps) => {
	const { params } = usePageProps<'circleThemePresentationActive'>()

	return (
		<Page
			title={ presentation.name }
		>
			Active
		</Page>
	)
}

export default ActivePresentation

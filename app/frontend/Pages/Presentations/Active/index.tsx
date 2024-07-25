import { Page } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import React from 'react'

interface ActivePresentationProps {
	presentation: Schema.PresentationsShow
}

// @path: /circles/:circle_slug/themes/:theme_slug/presentations/:presentation_slug/active
// @route: circleThemePresentationActive
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

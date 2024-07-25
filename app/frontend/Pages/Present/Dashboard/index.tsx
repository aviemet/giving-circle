import { Page } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import React from 'react'

interface PresentationProps {
	presentation: Schema.PresentationsShow
}

// @path: /presentations/:presentation_slug/show
// @route: activePresentationShow
const PresentationDashboard = ({ presentation }: PresentationProps) => {
	const { params } = usePageProps<'activePresentationShow'>()

	return (
		<Page
			title={ presentation.name }
		>
			Dashboard
		</Page>
	)
}

export default PresentationDashboard

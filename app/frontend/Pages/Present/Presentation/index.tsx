import { usePageProps } from '@/lib/hooks'
import React from 'react'

// @path: /presentation/:id
// @route: runPresentation
const Presentation = () => {
	const { params } = usePageProps<'runPresentation'>()

	return (
		<div>Presentation</div>
	)
}

export default Presentation

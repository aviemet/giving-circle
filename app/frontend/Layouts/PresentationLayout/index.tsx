import React from 'react'

interface PresentationLayoutProps {
	children: React.ReactNode
}

const PresentationLayout = ({ children }: PresentationLayoutProps) => {
	return (
		<div>{ children }</div>
	)
}

export default PresentationLayout

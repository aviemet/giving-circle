import React from 'react'

interface PublicLayoutProps {
	children: any
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	return (
		<>
			{ children }
		</>
	)
}

export default PublicLayout

import React from 'react'

interface PublicLayoutProps {
	children: any
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {

	return (
		<div id="auth">
			<div>
				<main id="content">
					<div>{ children }</div>
				</main>
			</div>
		</div>
	)
}

export default PublicLayout

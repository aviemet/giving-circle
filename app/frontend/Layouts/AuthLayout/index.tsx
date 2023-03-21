import React from 'react'

interface IAuthLayoutProps {
	children: any
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {

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

export default AuthLayout

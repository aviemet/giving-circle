import React from 'react'

interface ShowUserProps {
	user: Schema.User
}

// @path: /users/:id
// @route: user
const ShowUser = ({ user }: ShowUserProps) => {
	return (
		<div>
			User
		</div>
	)
}

export default ShowUser

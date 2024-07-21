import React from 'react'

interface AboutCircleProps {
	circle: Schema.CirclesShow
}

const AboutCircle = ({ circle }: AboutCircleProps) => {
	return (
		<div>About { circle.name }</div>
	)
}

export default AboutCircle

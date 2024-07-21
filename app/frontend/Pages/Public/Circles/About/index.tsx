import React from 'react'

interface AboutCircleProps {
	circle: Schema.CirclesShow
}

// @path: /circles/:circle_slug/about
// @route: circleAbout
const AboutCircle = ({ circle }: AboutCircleProps) => {
	return (
		<div>About { circle.name }</div>
	)
}

export default AboutCircle

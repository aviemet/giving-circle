import React from 'react'
import { NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface CircleMenuProps {
	circle: Schema.CirclesInertiaShare
}

const CircleMenu = ({ circle }: CircleMenuProps) => {
	return (
		<>
			<NavLink
				href={ Routes.circle(circle.slug) }
				label="Overview"
			/>
			<NavLink
				href={ Routes.circleThemes(circle.slug) }
				label="Themes"
			/>
			<NavLink
				href={ Routes.circleMembers(circle.slug) }
				label="Members"
			/>
			<NavLink
				href={ Routes.circlePresentationTemplates(circle.slug) }
				label="Presentation Templates"
			/>
		</>
	)
}

export default CircleMenu

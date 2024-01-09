import React from 'react'
import { NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface CircleMenuProps {
	circle: Schema.Circle
}

const CircleMenu = ({ circle }: CircleMenuProps) => {
	return (
		<>
			<NavLink
				href={ Routes.adminCircle(circle.slug) }
				label="Overview"
			/>
			<NavLink
				href={ Routes.adminCircleThemes(circle.slug) }
				label="Themes"
			/>
			<NavLink
				href={ Routes.adminCircleMembers(circle.slug) }
				label="Members"
			/>
		</>
	)
}

export default CircleMenu

import React from 'react'
import { NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface CircleMenuProps {
	circle: Schema.Circle
}

const CircleMenu = ({ circle }: CircleMenuProps) => {
	return (
		<>
			<NavLink href={ Routes.adminCircle(circle.slug) }>Overview</NavLink>
			<NavLink href={ Routes.adminCircleThemes(circle.slug) }>Themes</NavLink>
			<NavLink href={ Routes.adminCircleMembers(circle.slug) }>Members</NavLink>
		</>
	)
}

export default CircleMenu

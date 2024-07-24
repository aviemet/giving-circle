import React from 'react'
import { Accordion, NavLink } from '@/Components'
import { Routes } from '@/lib'
import { useInit } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'

export interface CircleMenuProps {
	circle: Schema.CirclesInertiaShare
}

const menuKey = 'circle_menu'

const CircleMenu = ({ circle }: CircleMenuProps) => {
	const { openMenus, toggleOpenMenu } = useLayoutStore()

	useInit(() => {
		toggleOpenMenu(menuKey, true)
	})

	const handleAccordionChange = () => {
		toggleOpenMenu(menuKey)
	}

	return (
		<Accordion
			multiple
			value={ Array.from(openMenus) }
			onChange={ handleAccordionChange }
		>
			<Accordion.Item key={ menuKey } value={ menuKey }>
				<Accordion.Control>{ circle.name }</Accordion.Control>
				<Accordion.Panel>
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
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	)
}

export default CircleMenu

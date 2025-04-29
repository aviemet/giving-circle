import React from 'react'
import { Accordion, NavLink } from '@/components'
import { Routes } from '@/lib'
import { useInit, usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/store'
import { isEmpty } from 'lodash'

const CircleMenu = () => {
	const { active_circle } = usePageProps()
	const { menuKeys, toggleOpenMenu } = useLayoutStore()

	useInit(() => {
		toggleOpenMenu('circle', true)
		toggleOpenMenu('theme', false)
		toggleOpenMenu('presentation', false)
	})

	if(isEmpty(active_circle)) return <></>

	return (
		<Accordion.Item key={ menuKeys.circle } value={ menuKeys.circle }>
			<Accordion.Control>{ active_circle.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.circleMemberships(active_circle.slug) }
					label="Members"
				/>
				{ /* <NavLink
					href={ Routes.circlePresentationTemplates(active_circle.slug) }
					label="Presentation Templates"
				/> */ }
				<NavLink
					href={ Routes.circleThemes(active_circle.slug) }
					label="Themes"
				/>
				<NavLink
					href={ Routes.circleOrgs(active_circle.slug) }
					label="Orgs"
				/>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default CircleMenu

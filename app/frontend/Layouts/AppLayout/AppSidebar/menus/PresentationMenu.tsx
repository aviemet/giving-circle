import React from 'react'
import { Accordion, NavLink } from '@/Components'
import { Routes } from '@/lib'
import { useInit, usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { isEmpty } from 'lodash'

const PresentationMenu = () => {
	const { menu } = usePageProps()
	const { menuKeys, toggleOpenMenu } = useLayoutStore()

	useInit(() => {
		toggleOpenMenu('circle', false)
		toggleOpenMenu('theme', false)
		toggleOpenMenu('presentation', true)
	})

	if(isEmpty(menu.active_circle) || isEmpty(menu.active_theme) || isEmpty(menu.active_presentation)) return <></>

	return (
		<Accordion.Item key={ menuKeys.presentation } value={ menuKeys.presentation }>
			<Accordion.Control>{ menu.active_presentation.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.circleThemePresentation(menu.active_circle.slug, menu.active_theme.slug, menu.active_presentation.slug) }
					label="Overview"
				/>
				<NavLink
					href={ Routes.circleThemeEditPresentation(menu.active_circle.slug, menu.active_theme.slug, menu.active_presentation.slug) }
					label="Setup"
				/>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default PresentationMenu

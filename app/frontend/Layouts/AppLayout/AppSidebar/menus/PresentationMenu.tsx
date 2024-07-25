import React from 'react'
import { Accordion, NavLink } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { isEmpty } from 'lodash'

const PresentationMenu = () => {
	const { menu } = usePageProps()
	const { menuKeys } = useLayoutStore()

	if(isEmpty(menu.active_presentation)) return <></>

	return (
		<Accordion.Item key={ menuKeys.presentation } value={ menuKeys.presentation }>
			<Accordion.Control>{ menu.active_presentation.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.home() }
					label="Temp"
				/>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default PresentationMenu

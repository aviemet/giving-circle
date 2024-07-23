import React from 'react'
import {
	Link,
	Menu,
	Avatar,
	Group,
	Text,
	Box,
	Button,
} from '@/Components'
import { initials, Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { DownArrowIcon } from '@/Components/Icons'

import cx from 'clsx'
import * as classes from '../AppLayout.css'

const CircleDropdownLink = () => {
	const { auth, menu } = usePageProps()

	if(menu.active_circle === undefined) {
		return <Box>Giving Circles</Box>
	}

	if(auth.user.circles.length === 1) {
		return (
			<Link href={ Routes.circle(menu.active_circle.slug) } underline="never">
				<Group justify='space-between'>
					<Avatar size="sm">{ initials(menu.active_circle.name) }</Avatar>
					<Text style={ { flex: 1 } }>{ menu.active_circle.name }</Text>
				</Group>
			</Link>
		)
	}

	return (
		<>
			<Group
				justify='space-between'
				className={ cx(classes.circleMenuGroup) }
			>
				<Link href={ Routes.circle(menu.active_circle.slug) } underline="never">
					<Group justify='space-between'>
						<Avatar size="sm">{ initials(menu.active_circle.name) }</Avatar>
					</Group>
				</Link>
				<Menu offset={ 9 } position="bottom-end" withArrow>
					<Menu.Target>
						<Button
							p={ 0 }
							variant="transparent"
							className={ cx(classes.circleMenuButton) }
							rightSection={ <DownArrowIcon /> }
						>
							{ menu.active_circle.name }
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						{ auth.user.circles.map(circle => (
							<Menu.Item
								key={ circle.id }
								component={ Link }
								href={ Routes.circle(circle.slug) }
							>
								{ circle.name }
							</Menu.Item>
						)) }
					</Menu.Dropdown>
				</Menu>
			</Group>
		</>
	)
}

export default CircleDropdownLink

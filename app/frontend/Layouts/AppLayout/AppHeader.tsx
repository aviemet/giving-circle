import React from 'react'
import { ActionIcon, Avatar, Box, Divider, Text } from '@mantine/core'
import { PlusCircleIcon, SettingsIcon } from '@/Components/Icons'
import { Menu } from '@/Components'
import { usePage } from '@inertiajs/react'
import { Routes } from '@/lib'

const Header = () => {
	const { props } = usePage<SharedInertiaProps>()

	return (
		<>
			<Box style={ { flex: 1 } }>
				<Text>{ 'Giving Circle' }</Text>
			</Box>
			<Box>
				<Menu position="bottom-end">
					<Menu.Target>
						<Avatar radius="xl" component={ ActionIcon }></Avatar>
					</Menu.Target>

					<Menu.Dropdown>
						{ props.auth.user.circles.length > 0 && <Text>Circles</Text> }

						{ props.auth.user.circles.slice(0,4).map(circle => (
							<Menu.Item
								key={ circle.id }
								href={ Routes.circle(circle.slug) }
							>
								{ circle.name }
							</Menu.Item>
						)) }
						<Menu.Item
							href={ Routes.newCircle() }
							icon={ <PlusCircleIcon /> }
						>
							New Circle
						</Menu.Item>
						{ props.auth.user.circles.length > 4 && <Menu.Item href={ Routes.circles() }>more...</Menu.Item> }

						<Divider />

						<Menu.Item
							href={ Routes.settingsGeneralIndex() }
							icon={ <SettingsIcon /> }
						>
							Preferences
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Box>
		</>
	)
}

export default Header

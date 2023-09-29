import React from 'react'
import { ActionIcon, Avatar, Box, Divider, Menu, Text } from '@mantine/core'
import { SettingsIcon } from '@/Components/Icons'
import { Link } from '@/Components'
import { usePage } from '@inertiajs/react'
import { Routes } from '@/lib'

const Header = () => {
	const { props } = usePage<SharedInertiaProps>()
	console.log({ props })
	return (
		<>
			<Box style={ { flex: 1 } }>
				<Text>{ props?.auth?.user?.active_circle?.name || 'Giving Circle' }</Text>
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
								component={ Link }
								href={ Routes.circle(circle.slug) }
							>
								{ circle.name }
							</Menu.Item>
						)) }
						{ props.auth.user.circles.length > 4 && <Menu.Item href={ Routes.circles() }>more...</Menu.Item> }
						<Divider />
						<Menu.Item
							component={ Link }
							href={ Routes.settingsGeneralIndex() }
							icon={ <SettingsIcon /> }
						>Preferences</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Box>
		</>
	)
}

export default Header

import React from 'react'
import { ActionIcon, Avatar, Box, Divider, Flex, Menu, Text } from '@mantine/core'
import { SettingsIcon } from '@/Components/Icons'
import { Link } from '@/Components'
import { usePage } from '@inertiajs/react'
import { Routes } from '@/lib'

const Header = () => {
	const { props } = usePage<SharedInertiaProps>()

	const u = props.auth.user.circles.map
	return (
		<Flex align="center" style={ { width: '100%' } }>
			<Box style={ { flex: 1 } }>
				<Text>Giving Circle</Text>
			</Box>
			<Box>
				<Menu position="bottom-end">
					<Menu.Target>
						<Avatar radius="xl" component={ ActionIcon }></Avatar>
					</Menu.Target>

					<Menu.Dropdown>
						{ props.auth.user.circles.length > 0 && <Text>Circles</Text> }
						{ props.auth.user.circles.map(circle => (
							<Menu.Item
								key={ circle.id }
								component={ Link }
								href={ Routes.circle(circle.slug) }
							>
								{ circle.name }
							</Menu.Item>
						)) }
						<Divider />
						<Menu.Item
							component={ Link }
							href="/"
							icon={ <SettingsIcon /> }
						>Preferences</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Box>
		</Flex>
	)
}

export default Header

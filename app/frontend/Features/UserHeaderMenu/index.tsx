import React from 'react'
import { Link, Menu, ActionIcon, Avatar, Divider, Text } from '@/Components'
import { LogoutIcon, SettingsIcon } from '@/Components/Icons'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

const UserHeaderMenu = () => {
	const props = usePageProps()

	if(!props.auth.user) return <Link href={ Routes.newUserSession() }>Sign In</Link>

	return (
		<Menu position="bottom-end">
			<Menu.Target>
				<Avatar radius="xl" component={ ActionIcon }></Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				{ props.auth.user.circles.length > 0 && <Text><Link href={ Routes.circles() }>Circles</Link></Text> }

				{ props.auth.user.circles.slice(0,4).map(circle => (
					<Menu.Link
						key={ circle.id }
						href={ Routes.circle(circle.slug) }
					>
						{ circle.name }
					</Menu.Link>
				)) }

				{ props.auth.user.circles.length > 4 && <Menu.Link href={ Routes.circles() }>more...</Menu.Link> }

				<Divider />

				<Menu.Link
					href={ Routes.settingsGeneral() }
					icon={ <SettingsIcon /> }
				>
				Preferences
				</Menu.Link>

				<Divider />

				<Menu.Link
					href={ Routes.destroyUserSession() }
					icon={ <LogoutIcon /> }
				>
				Sign Out
				</Menu.Link>
			</Menu.Dropdown>
		</Menu>
	)
}

export default UserHeaderMenu

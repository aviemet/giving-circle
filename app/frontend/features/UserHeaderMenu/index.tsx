import { useMemo } from "react"

import { Link, Menu, ActionIcon, Avatar, Divider, Text } from "@/components"
import { LogoutIcon, SettingsIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

const UserHeaderMenu = () => {
	const { auth: { user }, circles, active_circle } = usePageProps()

	const themes = useMemo(() => {
		return active_circle?.themes && active_circle.themes.length > 0
			? active_circle.themes
			: undefined
	}, [active_circle?.themes])

	if(!user) return <Link href={ Routes.newUserSession() }>Sign In</Link>

	return (
		<Menu position="bottom-end">
			<Menu.Target>
				<Avatar radius="xl" component={ ActionIcon }></Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				{ circles && circles.length > 0 && <>
					<Text><Link href={ Routes.circles() }>Circles</Link></Text>

					{ circles.slice(0, 4).map(circle => (
						<Menu.Link
							key={ circle.id }
							href={ Routes.circle(circle.slug) }
							active={ circle.slug === active_circle?.slug }
						>
							{ circle.name }
						</Menu.Link>
					)) }

					{ circles.length > 4 && <Menu.Link href={ Routes.circles() }>more...</Menu.Link> }

					{ themes && <>
						<Divider />

						<Text><Link href={ Routes.circleThemes(active_circle!.slug) }>Themes</Link></Text>

						{ themes.slice(0, 4).map(theme => (
							<Menu.Link
								key={ theme.id }
								href={ Routes.theme(active_circle!.slug, theme.slug) }
							>
								{ theme.name }
							</Menu.Link>
						)) }

						{ circles.length > 4 && <Menu.Link href={ Routes.circleThemes(active_circle!.slug) }>more...</Menu.Link> }
					</> }

				</> }
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

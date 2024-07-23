import React from 'react'
import {
	AppShell,
	Divider,
	Flex,
	Link,
	Menu,
	Avatar,
	Group,
	Text,
	UnstyledButton,
} from '@/Components'
import { DownArrowIcon } from '@/Components/Icons'
import { ToggleNavbarButton } from '@/Features'
import { Routes, initials } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { ToggleColorSchemeButton } from '@/Components/Button'

const AppSidebar = () => {
	const { auth, params, menu } = usePageProps()
	const hasMultipleCircles = auth?.user?.circles?.length > 1

	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" mb="sm">

					<ToggleColorSchemeButton />
					<ToggleNavbarButton />
				</Flex>

				{ /* Circle title and avatar */ }
				<Flex>
					<Menu offset={ 9 } width={ 225 } disabled={ !hasMultipleCircles }>

						<Menu.Target>
							<UnstyledButton style={ { width: '100%' } }>
								{ menu.active_circle !== undefined
									?
									<Link href={ Routes.circle(menu.active_circle.slug) } underline="never">
										<Group justify='space-between'>
											<Avatar size="sm">{ initials(menu.active_circle.name) }</Avatar>
											<Text style={ { flex: 1 } }>{ menu.active_circle.name }</Text>
											{ hasMultipleCircles && <DownArrowIcon /> }
										</Group>
									</Link>
									:
									'Giving Circles'
								}
							</UnstyledButton>
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
				</Flex>
			</AppShell.Section>

			<Divider />

			{ /* Nav menu portal */ }
			<AppShell.Section grow id="dynamic-nav-menu">
			</AppShell.Section>

			<Divider />

			{ /* Sticky nav links */ }
			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar

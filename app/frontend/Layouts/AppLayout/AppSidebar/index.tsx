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

const AppSidebar = () => {
	const props = usePageProps()

	const hasMultipleCircles = props.auth.user.circles.length > 1

	const title = props.circle?.name || 'Giving Circles'

	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="end">
					<ToggleNavbarButton />
				</Flex>

				{ /* Circle title and avatar */ }
				<Flex>
					<Menu offset={ 9 } width={ 225 } disabled={ !hasMultipleCircles }>

						<Menu.Target>
							<UnstyledButton style={ { width: '100%' } }>
								<Group justify='space-between'>
									{ props.circle?.name &&
										<Avatar size="sm">{ initials(title) }</Avatar>
									}
									<Text style={ { flex: 1 } }>{ title }</Text>
									{ hasMultipleCircles && <DownArrowIcon /> }
								</Group>
							</UnstyledButton>
						</Menu.Target>

						<Menu.Dropdown>
							{ props.auth.user.circles.map(circle => (
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

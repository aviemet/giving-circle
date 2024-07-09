import React from 'react'
import { Box, Group, Flex, Title } from '@/Components'
import { ToggleNavbarButton, UserHeaderMenu } from '@/Features'
import { useLayoutStore } from '@/Store'

const Header = () => {
	const { sidebarOpen, siteTitle } = useLayoutStore()

	return (
		<Group h="100%" px="md">
			<Flex align="center" gap="md" style={ { flex: 1 } }>
				<ToggleNavbarButton hidden={ sidebarOpen } />
				{ typeof siteTitle === 'string' ?
					<Title>{ siteTitle }</Title>
					:
					siteTitle
				}
			</Flex>

			<Box>
				<UserHeaderMenu />
			</Box>
		</Group>
	)
}

export default Header

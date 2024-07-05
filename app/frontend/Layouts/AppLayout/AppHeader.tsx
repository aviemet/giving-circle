import React from 'react'
import { Text, Box, Group, Flex } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import { ToggleNavbarButton, UserHeaderMenu } from '@/Features'
import { useLayoutStore } from '@/lib/store'

const Header = () => {
	const props = usePageProps()
	const { sidebarOpen } = useLayoutStore()

	const title = props.circle?.name || 'Giving Circles'

	return (
		<Group h="100%" px="md">
			<Flex gap="md" style={ { flex: 1 } }>
				<ToggleNavbarButton hidden={ sidebarOpen } />
				<Text>{ title }</Text>
			</Flex>

			<Box>
				<UserHeaderMenu />
			</Box>
		</Group>
	)
}

export default Header

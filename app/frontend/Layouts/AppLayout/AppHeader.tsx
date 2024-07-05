import React from 'react'
import { Box, Text } from '@mantine/core'
import { usePageProps } from '@/lib/hooks'
import { UserHeaderMenu } from '@/Features'

const Header = () => {
	const props = usePageProps()

	const title = props.circle?.name || 'Giving Circles'

	return (
		<>
			<Box style={ { flex: 1 } }>
				<Text>{ title }</Text>
			</Box>

			<Box>
				<UserHeaderMenu />
			</Box>
		</>
	)
}

export default Header

import React from 'react'
import { Box, Center, Flex, Paper } from '@/Components'

interface LayoutProps {
	children: any
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex style={ {
			height: '100%',
		} }>
			<Center p="lg" style={ {
				flex: 1,
			} }>
				<Paper shadow="lg" radius="lg" p="xl" withBorder style={ {
					flex: 0.75,
				} }>
					{ children }
				</Paper>
			</Center>

			<Box style={ theme =>({
				flex: 1,
				backgroundColor: theme.fn.primaryColor(),
			}) }>
			</Box>
		</Flex>
	)
}

export default Layout

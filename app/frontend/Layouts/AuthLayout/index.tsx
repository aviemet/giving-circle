import React from 'react'
import { Box, Center, Flex, Paper } from '@/Components'
import classes from './AuthLayout.module.css'

interface LayoutProps {
	children: any
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex className={ classes.authLayout } style={ {
			height: '100%',
		} }>
			<Center p="lg" id="auth-layout-left" style={ {
				flex: 1,
			} }>
				<Paper shadow="lg" radius="lg" p="xl" withBorder style={ {
					flex: 0.75,
				} }>
					{ children }
				</Paper>
			</Center>

			<Box id="auth-layout-right" style={ theme =>({
				flex: 1,
				// backgroundColor: theme.fn.primaryColor(),
			}) }>
			</Box>
		</Flex>
	)
}

export default Layout

import React from 'react'
import { Box, Flex, Paper } from '@/Components'
import * as classes from './AuthLayout.css'

interface LayoutProps {
	children: any
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<Flex className={ classes.authLayout }>
			<Paper shadow="lg" radius="lg" p="xl" withBorder>
				{ children }
			</Paper>

			<Box id="auth-layout-right">
			</Box>
		</Flex>
	)
}

export default Layout

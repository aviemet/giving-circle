import React from 'react'
import { Box, Paper, SimpleGrid } from '@/Components'
import * as classes from './AuthLayout.css'

interface LayoutProps {
	children: any
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<SimpleGrid cols={ { sm: 1, md: 2 } } className={ classes.authLayout }>
			<Box id="auth-layout-left">
				<Paper shadow="lg" radius="lg" p="xl"  withBorder>
					{ children }
				</Paper>
			</Box>

			<Box id="auth-layout-right">
			</Box>
		</SimpleGrid>
	)
}

export default Layout

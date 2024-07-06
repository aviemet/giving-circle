import React from 'react'
import { Box, AppShell, Group } from '@/Components'

const FooterComponent = () => {
	return (
		<AppShell.Footer py={ 4 } px={ 8 } role="contentinfo">
			<Group>
				<div id="footer-portal" />
				<Box style={ { marginLeft: 'auto' } }>
					©{ (new Date).getFullYear() }
				</Box>
			</Group>
		</AppShell.Footer>
	)
}

export default FooterComponent

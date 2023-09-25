import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { theme } from '@/lib/theme'

const UiFrameworkProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<MantineProvider theme={ theme } defaultColorScheme="auto">
			<Notifications />
			{ children }
		</MantineProvider>
	)
}

export default UiFrameworkProvider

import React from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import breakpoints from './breakpoints.mjs'

export const theme = createTheme({
	...breakpoints,
	defaultRadius: 'xs',
})

const UiFrameworkProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<MantineProvider theme={ theme } defaultColorScheme="auto">
			<Notifications />
			{ children }
		</MantineProvider>
	)
}

export default UiFrameworkProvider

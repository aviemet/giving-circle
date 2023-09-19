import React from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export const breakpoints: Record<string, string> = {
	'hd': '120rem', // 1920px,
	'2xl': '110rem', // 1760px,
	xl: '90rem', // 1440px, default 88rem
	lg: '80rem', // 1280px, default 75rem
	md: '62rem',
	sm: '48rem',
	xs: '36rem',
	'2xs': '30rem', // 480px
}

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

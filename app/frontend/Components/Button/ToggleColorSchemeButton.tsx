import React from 'react'
import { ActionIcon, type ActionIconProps, MantineColorScheme, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { SunIcon, MoonIcon } from '@/Components/Icons'

import cx from 'clsx'
import * as classes from './Button.css'

interface ToggleColorSchemeButtonProps
	extends ActionIconProps,
	Omit<React.ComponentPropsWithoutRef<'button'>, keyof ActionIconProps> {}

const ToggleColorSchemeButton = ({ onClick, title, className, ...props }: ToggleColorSchemeButtonProps) => {
	const { colorScheme, setColorScheme } = useMantineColorScheme()
	const computedColorScheme = useComputedColorScheme('dark')

	const toggleColorScheme = (cb?: (colorScheme: MantineColorScheme) => void) => {
		setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
	}

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		toggleColorScheme()
		onClick?.(e)
	}

	return (
		<ActionIcon
			color={ colorScheme === 'dark' ? 'yellow' : 'blue' }
			onClick={ handleClick }
			title={ title || "Toggle color scheme" }
			aria-label={ `Toggle color scheme to ${colorScheme === 'dark' ? 'light' : 'dark'} mode` }
			className={ cx(classes.colorSchemeButton, className) }
			{ ...props }
		>
			{ colorScheme === 'dark' ? <SunIcon size={ 18 } /> : <MoonIcon size={ 18 } /> }
		</ActionIcon>
	)
}

export default ToggleColorSchemeButton

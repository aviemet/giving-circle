import React from 'react'
import { ActionIcon, Button, Menu } from '@/Components'
import { DotsIcon, DownArrowIcon } from '@/Components/Icons'
import { type MenuTargetProps as MantineMenuTargetProps } from '@mantine/core'

interface MenuTargetProps extends Omit<MantineMenuTargetProps, 'children'> {
	children?: React.ReactNode
	icon?: React.ReactNode
	variant?: 'gradient' | 'subtle' | 'filled' | 'outline' | 'light' | 'default' | 'transparent'
	color?: string
}

const MenuTarget = ({ children, icon, variant, color, ...props }: MenuTargetProps) => {
	if(!children) {
		return (
			<Menu.Target { ...props }>
				<ActionIcon color={ color } variant={ variant } >
					{ icon || <DotsIcon /> }
				</ActionIcon>
			</Menu.Target>
		)
	}

	if(typeof children === 'string') {
		return (
			<Menu.Target { ...props }>
				<Button
					color={ color }
					variant={ variant }
					rightSection={ icon || <DownArrowIcon /> }
				>
					{ children }
				</Button>
			</Menu.Target>
		)
	}

	return (
		<Menu.Target { ...props }>
			{ children }
		</Menu.Target>
	)
}

export default MenuTarget

import React, { forwardRef } from 'react'
import { Menu, createPolymorphicComponent, type MenuItemProps as MantineMenuItemProps } from '@mantine/core'
import cx from 'clsx'
import * as classes from './Menu.css'

interface MenuItemProps extends MantineMenuItemProps {
	disabled?: boolean
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>((
	{ children, disabled = false, className, ...props },
	ref,
) => {
	return (
		<Menu.Item
			ref={ ref }
			disabled={ disabled }
			className={ cx(classes.menuItem, className, { disabled }) }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
})

export default createPolymorphicComponent<'button', MenuItemProps>(MenuItem)

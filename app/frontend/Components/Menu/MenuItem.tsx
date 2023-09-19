import React, { forwardRef } from 'react'
import { Menu, createPolymorphicComponent, type MenuItemProps } from '@mantine/core'
import cx from 'clsx'
import classes from './MenuItem.module.css'

interface IMenuItemProps extends MenuItemProps {
	disabled?: boolean
}

const MenuItem = forwardRef<HTMLButtonElement, IMenuItemProps>((
	{ children, disabled = false, className, ...props },
	ref,
) => {
	return (
		<Menu.Item
			ref={ ref }
			disabled={ disabled }
			className={ cx(classes, className, { disabled }) }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
})

export default createPolymorphicComponent<'button', IMenuItemProps>(MenuItem)

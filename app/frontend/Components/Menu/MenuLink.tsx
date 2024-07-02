import React, { forwardRef } from 'react'
import { Menu, createPolymorphicComponent, type MenuItemProps } from '@mantine/core'
import cx from 'clsx'
import { Link } from '@/Components'
import { LinkProps } from '../Link'

interface MenuItemProps extends MenuItemProps, Omit<LinkProps, 'color'|'children'> {
	disabled?: boolean
	type?: string
}

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>((
	{ children, disabled = false, className, ...props },
	ref,
) => {
	return (
		<Menu.Item
			ref={ ref }
			disabled={ disabled }
			component={ Link }
			className={ cx(className, { disabled }) }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
})

export default createPolymorphicComponent<typeof Link, MenuItemProps>(MenuItem)

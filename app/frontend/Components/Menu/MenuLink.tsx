import React, { forwardRef } from 'react'
import { Menu, createPolymorphicComponent, type MenuItemProps as MantineItemProps } from '@mantine/core'
import cx from 'clsx'
import { Link } from '@/Components'
import { LinkProps } from '../Link'
import * as classes from './Menu.css'

type DuplicateProps = 'color'|'children'|'classNames'|'styles'|'variant'|'vars'
interface MenuItemProps extends MantineItemProps, Omit<LinkProps, DuplicateProps> {
	icon?: React.ReactNode
	disabled?: boolean
	type?: string
}

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>((
	{ children, disabled = false, className, icon, leftSection, ...props },
	ref,
) => {
	return (
		<Menu.Item
			ref={ ref }
			disabled={ disabled }
			component={ Link }
			className={ cx(classes.menuItem, className, { disabled }) }
			leftSection={ <>{ icon && icon }{ leftSection && leftSection }</> }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
})

export default createPolymorphicComponent<typeof Link, MenuItemProps>(MenuItem)

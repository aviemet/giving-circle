import { Menu, createPolymorphicComponent, type MenuItemProps as MantineMenuItemProps } from "@mantine/core"
import clsx from "clsx"
import React, { forwardRef } from "react"

import * as classes from "./Menu.css"

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
			className={ clsx(classes.menuItem, className, { disabled }) }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
})

export default createPolymorphicComponent<"button", MenuItemProps>(MenuItem)

import { Menu, createPolymorphicComponent, type MenuItemProps as MantineMenuItemProps } from "@mantine/core"
import clsx from "clsx"
import React, { type Ref } from "react"

import * as classes from "./Menu.css"

interface MenuItemProps extends MantineMenuItemProps {
	disabled?: boolean
}

type MenuItemPropsWithRef = MenuItemProps & {
	ref?: Ref<HTMLButtonElement>
}

function MenuItem({ children, disabled = false, className, ref, ...props }: MenuItemPropsWithRef) {
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
}

const MenuItemComponent = createPolymorphicComponent<"button", MenuItemProps>(MenuItem)
export { MenuItemComponent as MenuItem }

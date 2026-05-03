import { Menu, createPolymorphicComponent, type MenuItemProps as MantineItemProps } from "@mantine/core"
import clsx from "clsx"
import React, { type Ref } from "react"

import { Link } from "@/components"

import { LinkProps } from "../Link"
import * as classes from "./Menu.css"

type DuplicateProps = "color" | "children" | "classNames" | "styles" | "variant" | "vars"
interface MenuItemProps extends MantineItemProps, Omit<LinkProps, DuplicateProps> {
	icon?: React.ReactNode
	disabled?: boolean
	type?: string
	active?: boolean
}

type MenuItemPropsWithRef = MenuItemProps & {
	ref?: Ref<HTMLAnchorElement>
}

function MenuItem({
	children,
	disabled = false,
	className,
	icon,
	leftSection,
	active = false,
	ref,
	...props
}: MenuItemPropsWithRef) {
	return (
		<Menu.Item
			ref={ ref }
			disabled={ disabled }
			component={ Link }
			className={ clsx(classes.menuItem, className, { disabled }) }
			leftSection={ <>{ icon && icon }{ leftSection && leftSection }</> }
			{ ...props }
		>
			{ children }
		</Menu.Item>
	)
}

const MenuLinkComponent = createPolymorphicComponent<typeof Link, MenuItemProps>(MenuItem)
export { MenuLinkComponent as MenuLink }

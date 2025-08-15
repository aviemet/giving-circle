import { Menu, createPolymorphicComponent, type MenuItemProps as MantineItemProps } from "@mantine/core"
import clsx from "clsx"
import React, { forwardRef } from "react"

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

const MenuItem = forwardRef<HTMLAnchorElement, MenuItemProps>((
	{
		children,
		disabled = false,
		className,
		icon,
		leftSection,
		active = false,
		...props
	},
	ref,
) => {
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
})

export default createPolymorphicComponent<typeof Link, MenuItemProps>(MenuItem)

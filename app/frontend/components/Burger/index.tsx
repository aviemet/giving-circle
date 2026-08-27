import { Burger as MantineBurger, type BurgerProps } from "@mantine/core"
import clsx from "clsx"

import { SidebarCollapseIcon } from "@/components/Icons"

import * as classes from "./Burger.css"

export type { BurgerProps }

const iconSizes: Record<string, number> = {
	xs: 12,
	sm: 18,
	md: 24,
	lg: 34,
	xl: 42,
}

function iconSizeFromBurgerSize(size: BurgerProps["size"]) {
	if(typeof size === "number") {
		return size
	}

	if(typeof size === "string") {
		const mappedSize = iconSizes[size]
		if(mappedSize !== undefined) {
			return mappedSize
		}
	}

	return iconSizes.md
}

export function Burger({
	opened,
	children,
	size,
	className,
	...props
}: BurgerProps) {
	return (
		<MantineBurger
			opened={ false }
			size={ size }
			className={ clsx(className, opened === true && classes.opened) }
			{ ...props }
		>
			{ opened === true && <SidebarCollapseIcon size={ iconSizeFromBurgerSize(size) } /> }
			{ children }
		</MantineBurger>
	)
}

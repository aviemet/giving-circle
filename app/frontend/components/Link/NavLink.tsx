import { Link, type InertiaLinkProps } from "@inertiajs/react"
import {
	NavLink as MantineNavLink,
	type NavLinkProps as MantineNavLinkProps,
} from "@mantine/core"

import { useLocation } from "@/lib/hooks"

type OmittedLinkProps = "color" | "size" | "span" | "label" | "onChange" | "onClick" | "onKeyDown" | "style" | "active" | "component"
export interface NavLinkProps
	extends Omit<MantineNavLinkProps, "label">,
	Omit<InertiaLinkProps, OmittedLinkProps> {}

export const NavLink = ({
	children,
	href,
	active,
	...props
}: NavLinkProps) => {
	const { pathname } = useLocation()

	return (
		<MantineNavLink
			component={ Link }
			href={ href }
			active={ active === undefined ? pathname === href : active }
			label={ children }
			{ ...props }
		/>
	)
}


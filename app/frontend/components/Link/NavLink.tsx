import { Link } from "@inertiajs/react"
import {
	NavLink as MantineNavLink,
	type NavLinkProps as MantineNavLinkProps,
} from "@mantine/core"

import { useLocation } from "@/lib/hooks"

import { ExternalLink, isExternalLink } from "./ExternalLink"
import * as classes from "./Link.css"

export interface NavLinkProps extends Omit<MantineNavLinkProps, "label" | "component"> {
	external?: boolean
	href: string
	target?: string
}

export const NavLink = ({
	children,
	href,
	active,
	external,
	target,
	...props
}: NavLinkProps) => {
	const { pathname } = useLocation()

	if(isExternalLink(href, external)) {
		return (
			<MantineNavLink
				component={ ExternalLink }
				href={ href }
				active={ false }
				label={ children }
				className={ classes.navLinkInactiveHover }
				{ ...props }
			/>
		)
	}

	if(target === "_blank") {
		return (
			<MantineNavLink
				component="a"
				href={ href }
				target={ target }
				active={ active === undefined ? pathname === href : active }
				label={ children }
				className={ classes.navLinkInactiveHover }
				{ ...props }
			/>
		)
	}

	return (
		<MantineNavLink
			component={ Link }
			href={ href }
			active={ active === undefined ? pathname === href : active }
			label={ children }
			className={ classes.navLinkInactiveHover }
			{ ...props }
		/>
	)
}

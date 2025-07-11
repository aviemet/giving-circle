import { Link, type InertiaLinkProps } from "@inertiajs/react"
import { NavLink, type NavLinkProps } from "@mantine/core"

import { useLocation } from "@/lib/hooks"

interface NavLinkComponentProps
	extends Omit<NavLinkProps, "label">,
	Omit<InertiaLinkProps, "color" | "size" | "span" | "label" | "onChange" | "onClick" | "onKeyDown" | "style" | "active"> {}

const NavLinkComponent = ({
	children,
	href,
	...props
}: NavLinkComponentProps) => {
	const { pathname } = useLocation()

	return (
		<NavLink
			component={ Link }
			href={ href }
			active={ pathname === href }
			label={ children }
			{ ...props }
		/>
	)
}

export default NavLinkComponent

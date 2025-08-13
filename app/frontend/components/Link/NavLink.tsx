import { Link, type InertiaLinkProps } from "@inertiajs/react"
import { NavLink, type NavLinkProps } from "@mantine/core"

import { useLocation } from "@/lib/hooks"

interface NavLinkComponentProps
	extends Omit<NavLinkProps, "label">,
	Omit<InertiaLinkProps, "color" | "size" | "span" | "label" | "onChange" | "onClick" | "onKeyDown" | "style" | "active"> {}
export { type NavLinkComponentProps as NavLinkProps }

const NavLinkComponent = ({
	children,
	href,
	active,
	...props
}: NavLinkComponentProps) => {
	const { pathname } = useLocation()

	return (
		<NavLink
			component={ Link }
			href={ href }
			active={ active === undefined ? pathname === href : active }
			label={ children }
			{ ...props }
		/>
	)
}

export default NavLinkComponent

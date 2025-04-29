import { Link, type InertiaLinkProps } from "@inertiajs/react"
import { NavLink, type NavLinkProps } from "@mantine/core"
import React from "react"

import { useLocation } from "@/lib/hooks"

interface NavLinkComponentProps
	extends NavLinkProps,
	Omit<InertiaLinkProps, "color" | "size" | "span" | "label" | "onChange" | "onKeyDown" | "style" | "active"> {}

const NavLinkComponent = (props: NavLinkComponentProps) => {
	const { pathname } = useLocation()

	return (
		<NavLink component={ Link } active={ pathname === props.href } { ...props } />
	)
}

export default NavLinkComponent

import React from 'react'
import { NavLink, type NavLinkProps } from '@mantine/core'
import { Link, type InertiaLinkProps } from '@inertiajs/react'

interface NavLinkComponentProps
	extends NavLinkProps,
	Omit<InertiaLinkProps, 'color'|'size'|'span'|'label'|'onChange'|'onKeyDown'|'style'> {}

const NavLinkComponent = (props: NavLinkComponentProps) => {
	return (
		<NavLink component={ Link } { ...props } />
	)
}

export default NavLinkComponent

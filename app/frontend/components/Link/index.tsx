import { type Method, type Visit } from "@inertiajs/core"
import { type AnchorProps, type ButtonProps } from "@mantine/core"
import React from "react"

import { ExternalLink, isExternalLink } from "./ExternalLink"
import { InertiaLink } from "./InertiaLink"

export { NavLink, type NavLinkProps } from "./NavLink"
export { ButtonLink, type ButtonLinkProps } from "./ButtonLink"
export { isExternalLink } from "./ExternalLink"

export interface LinkProps
	extends
	Omit<AnchorProps, "onProgress"> {
	ref?: React.Ref<HTMLAnchorElement>
	children?: React.ReactNode
	href: string
	method?: Method
	visit?: Omit<Visit, "method">
	external?: boolean
	as?: "a" | "button"
	onProgress?: React.ReactEventHandler<Element>
	onClick?: React.ReactEventHandler<Element>
	target?: string
	rel?: string
	tabIndex?: number
	disabled?: boolean
	buttonProps?: ButtonProps
	preserveScroll?: boolean
}

export function Link({
	children,
	href,
	as = "a",
	method,
	visit,
	external,
	onProgress,
	onClick,
	preserveScroll,
	disabled = false,
	buttonProps,
	ref,
	...props
}: LinkProps) {
	const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
		if(disabled) {
			e.preventDefault()
			onClick?.(e)
			return false
		}

		return onClick?.(e)
	}

	if(isExternalLink(href, external)) {
		return (
			<ExternalLink
				href={ href }
				as={ as }
				ref={ ref }
				onClick={ handleClick }
				disabled={ disabled }
				buttonProps={ buttonProps }
				{ ...onProgress }
				{ ...props }
			>
				{ children }
			</ExternalLink>
		)
	}

	return (
		<InertiaLink
			href={ href }
			as={ as }
			method={ method }
			visit={ visit }
			ref={ ref }
			onClick={ handleClick }
			preserveScroll={ preserveScroll }
			disabled={ disabled }
			buttonProps={ buttonProps }
			{ ...onProgress }
			{ ...props }
		>
			{ children }
		</InertiaLink>
	)
}

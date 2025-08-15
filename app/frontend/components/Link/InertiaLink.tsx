import { Method, Visit } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { type ButtonProps } from "@mantine/core"
import React, { forwardRef } from "react"

import { Button } from "@/components"
import AnchorLink, { type AnchorLinkProps } from "@/components/Link/AnchorLink"
import { exclude } from "@/lib/collections"

interface LinkProps extends AnchorLinkProps {
	children?: React.ReactNode
	href: string
	as: "a" | "button"
	method?: Method
	visit?: Omit<Visit, "method">
	buttonProps?: ButtonProps
	disabled?: boolean
}

const InertiaLinkComponent = forwardRef<HTMLAnchorElement, LinkProps>((
	{ children, href, as = "a", method, visit, buttonProps, style, disabled, ...props },
	ref,
) => {
	const handleHTTP = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault()

		router.visit(href, {
			method,
			...visit,
		})
	}

	const isNonStandardMethod = (method !== undefined && method !== "get")

	const processedHref = disabled ? "#" : href

	const basicProps = {
		disabled,
		component: AnchorLink,
		href: processedHref,
		style: [{ "&:hover": { textDecoration: "none" } }, style],
		c: "bright",
	}

	const mergedButtonProps = Object.assign(
		basicProps,
		buttonProps,
		exclude(props, ["classNames", "style", "vars"]),
	)

	if(isNonStandardMethod) {
		const otherOnClick = mergedButtonProps.onClick
		mergedButtonProps.onClick = (e: any) => {
			handleHTTP(e)
			otherOnClick?.(e)
		}
	}

	if(as === "button" || isNonStandardMethod) {
		return <Button
			ref={ ref }
			{ ...mergedButtonProps }
		>
			{ children }
		</Button>
	}

	return (
		<AnchorLink href={ processedHref } ref={ ref } { ...props }>{ children }</AnchorLink>
	)
})

export default InertiaLinkComponent

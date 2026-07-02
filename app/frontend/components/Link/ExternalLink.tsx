import { Anchor, Button, type AnchorProps, type ButtonProps } from "@mantine/core"
import clsx from "clsx"
import normalizeUrl from "normalize-url"
import React from "react"

import { ExternalLinkIcon } from "@/components/Icons"

import * as classes from "./Link.css"

const externalPrefix = ["http", "www"]

export function isExternalLink(href: string, external?: boolean): boolean {
	if(external === false) return false
	if(external === true) return true

	let localExternal = false
	externalPrefix.some((prefix) => {
		if(href?.startsWith(prefix)) {
			const url = new URL(href.startsWith("http") ? href : `http://${href}`)
			localExternal = url.hostname !== window.location.hostname
		}
	})

	return localExternal
}

export interface ExternalLinkProps
	extends AnchorProps,
	Omit<React.ComponentPropsWithoutRef<"a">, keyof AnchorProps> {
	ref?: React.Ref<HTMLAnchorElement>
	href: string
	as?: "a" | "button"
	buttonProps?: ButtonProps
	disabled?: boolean
}

export function ExternalLink({
	children,
	href,
	as = "a",
	buttonProps,
	className,
	disabled = false,
	onClick,
	ref,
	...props
}: ExternalLinkProps) {
	const url = href.startsWith("http") || href.startsWith("www")
		? normalizeUrl(href.startsWith("http") ? href : `http://${href}`, { stripWWW: false })
		: href

	const processedHref = disabled ? "javascript:void(0)" : url

	const content = (
		<>
			{ children }
			<ExternalLinkIcon className="external" />
		</>
	)

	if(as === "button") {
		return (
			<Button
				component="a"
				href={ processedHref }
				target="_blank"
				rel="noreferrer"
				ref={ ref }
				onClick={ onClick }
				disabled={ disabled }
				c="bright"
				className={ clsx(classes.external, className) }
				style={ [{ "&:hover": { textDecoration: "none" } }] }
				{ ...buttonProps }
			>
				{ content }
			</Button>
		)
	}

	return (
		<Anchor
			href={ processedHref }
			target="_blank"
			rel="noreferrer"
			className={ clsx(classes.external, className) }
			ref={ ref }
			onClick={ onClick }
			{ ...props }
		>
			{ content }
		</Anchor>
	)
}

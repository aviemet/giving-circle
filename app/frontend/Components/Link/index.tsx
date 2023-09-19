import React, { forwardRef, useMemo } from 'react'
import { Link, type InertiaLinkProps } from '@inertiajs/react'
import InertiaLink from './InertiaLink'
import ExternalLink from './ExternalLink'
import { createPolymorphicComponent, Anchor, type ElementProps, type AnchorProps, type ButtonProps, Button } from '@mantine/core'
import classes from './Link.module.css'
import cx from 'clsx'
import { exclude } from '@/lib'
import { ExternalLinkIcon } from '../Icons'
import normalizeUrl from 'normalize-url'

const hasExternalPrefix = (href: string) => {
	return ['http', 'www'].some(prefix => {
		return href.startsWith(prefix) && (new URL(href)).hostname !== window.location.hostname
	})
}

interface ICustomLinkProps
	extends
	Omit<InertiaLinkProps, 'color'|'size'|'style'|'href'>
{
	external?: boolean
	href: string
}

const CustomLink = createPolymorphicComponent<'a', ICustomLinkProps>(
	forwardRef<HTMLAnchorElement, ICustomLinkProps>(({ children, href, external, className, as, ...props }, ref) => {
		const isExternal = useMemo(() => {
			if(external !== undefined) return external
			return hasExternalPrefix(href)
		}, [href, external])

		const LinkComponent = as === 'button' ? Button : Anchor

		if(isExternal) {
			return (
				<LinkComponent
					ref={ ref }
					href={ useMemo(() => normalizeUrl(href, { stripWWW: false }), [href]) }
					target="_blank"
					rel="noreferrer"
					className={ cx(classes, 'external', className) }
					{ ...exclude(props, 'onProgress') }
				>
					{ children }
					<ExternalLinkIcon />
				</LinkComponent>
			)
		}

		return <LinkComponent
			ref={ ref }
			href={ href }
			component={ Link }
			className={ cx(classes, className) }
			{ ...props }
		>
			{ children }
		</LinkComponent>
	}),
)

export interface ILinkProps extends Omit<AnchorProps, 'onClick'|'onProgress'> {
	children?: React.ReactNode
	href: string
	external?: boolean
	target?: string
	rel?: string
	tabIndex?: number
	disabled?: boolean
	buttonProps?: ButtonProps
	preserveScroll?: boolean
}


const Link2 = forwardRef<HTMLAnchorElement, ILinkProps>((
	{ children, href, as = 'a', external, preserveScroll, buttonProps, className, ...props },
	ref,
) => {
	const isExternal = useMemo(() => {
		if(external !== undefined) return external

		let localExternal = false
		externalPrefix.some(prefix => {
			if(href.startsWith(prefix)) {
				const url = new URL(href)
				localExternal = url.hostname !== window.location.hostname
			}
		})
		return localExternal
	}, [href, external])

	if(isExternal) {
		return (
			<ExternalLink
				href={ href }
				ref={ ref }
				className={ cx(classes, className) }
				{ ...props }
			>
				{ children }
			</ExternalLink>
		)
	}

	return (
		<InertiaLink
			ref={ ref }
			href={ href }
			as={ as }
			className={ cx(classes, className) }
			{ ...props }
		>
			{ children }
		</InertiaLink>
	)
})

export default CustomLink

import React, { forwardRef } from 'react'
import { Link, type InertiaLinkProps } from '@inertiajs/react'
import { Anchor, type AnchorProps, type ButtonProps } from '@mantine/core'
import { Button } from '@mantine/core'
import ButtonLink from './ButtonLink'

interface IAnchorLinkProps
	extends Omit<InertiaLinkProps, 'color'|'size'|'span'>,
	Omit<AnchorProps, 'href'|'style'> {}

const AnchorLink = forwardRef<HTMLAnchorElement, IAnchorLinkProps>((props, ref) => <Anchor ref={ ref } component={ Link } { ...props } />)

interface ILinkProps extends IAnchorLinkProps {
	children?: React.ReactNode
	href: string
	as: 'a'|'button'
	compact?: boolean
	buttonProps?: ButtonProps
	disabled?: boolean
}

const InertiaLinkComponent = forwardRef<HTMLAnchorElement, ILinkProps>((
	{ children, href, as = 'a', buttonProps, ...props },
	ref,
) => {
	if(as === 'button') {
		return <ButtonLink
			ref={ ref }
			href={ href }
			{ ...props }
		>
			{ children }
		</ButtonLink>
	}

	return (
		<AnchorLink href={ href } ref={ ref } { ...props }>{ children }</AnchorLink>

	)
})

export default InertiaLinkComponent

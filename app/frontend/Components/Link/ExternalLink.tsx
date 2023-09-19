import React, { forwardRef, useMemo } from 'react'
import normalizeUrl from 'normalize-url'
import { ExternalLinkIcon } from '@/Components/Icons'
import { Anchor, ElementProps, type AnchorProps } from '@mantine/core'
import cx from 'clsx'

interface IExternalLinkProps extends Omit<AnchorProps, 'component'>, ElementProps<'a', keyof AnchorProps> {
	href: string
	as?: 'a'|'button'
}

const ExternalLink = forwardRef<HTMLAnchorElement, IExternalLinkProps>((
	{ children, href, as, className, ...props },
	ref,
) => {
	return (
		<Anchor
			ref={ ref }
			href={ useMemo(() => normalizeUrl(href, { stripWWW: false }), [href]) }
			target="_blank"
			rel="noreferrer"
			className={ cx('external', className ) }
			{ ...props }
		>
			{ children }
			<ExternalLinkIcon className="external" />
		</Anchor>
	)
})

export default ExternalLink

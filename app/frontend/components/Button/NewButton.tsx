import React from 'react'
import { Link } from '@/components'
import { NewIcon } from '@/components/Icons'
import { LinkProps } from '../Link'

interface NewButtonProps extends Omit<LinkProps, 'children'> {
	children?: string
	label?: string
}

const NewButton = ({ children, href, label }: NewButtonProps) => {
	return (
		<Link as="button" href={ href } aria-label={ `New ${label}` }>
			<NewIcon />
			{ children && children }
		</Link>
	)
}

export default NewButton

import React from 'react'
import { Link } from '@/Components'
import { NewIcon } from '@/Components/Icons'
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

import React from 'react'
import { Link } from '@/components'
import { type LinkProps } from '../Link'
import { TrashIcon } from '@/components/Icons'

interface DeleteButtonProps extends Omit<LinkProps, 'children'> {
	label?: string
}

const DeleteButton = ({ href, label }: DeleteButtonProps) => {
	return (
		<Link as="button" href={ href } aria-label={ `Delete ${label}` }><TrashIcon /></Link>
	)
}

export default DeleteButton

import React from 'react'
import { BoxProps } from '@mantine/core'
import { Box, Link, Portal } from '@/Components'

import cx from 'clsx'
import * as classes from './Breadcrumbs.css'

export type Breadcrumb = {
	title: string
	href?: string
}

export const breadcrumbLinks = (links:Breadcrumb[]) => links.map((link, i) => link.href ?
	<Link external={ false } href={ link.href } key={ i }>{ link.title }</Link>
	:
	<React.Fragment key={ i }>{ link.title }</React.Fragment>,
)

interface BreadcrumbsProps extends Omit<BoxProps, 'children'> {
	crumbs?: Breadcrumb[]
	separator?: string
}

const Breadcrumbs = ({ crumbs, separator = '>', className, ...props }: BreadcrumbsProps) => {
	if(!crumbs) return <></>

	return (
		<Portal target="#footer-portal">
			<Box
				component="nav"
				aria-label="breadcrumbs"
				className={ cx(classes.breadcrumbs, className) }
				{ ...props }
			>
				<ol>
					{ crumbs.reduce<React.ReactNode[]>((acc, crumb, index, array) => {
						const isLastCrumb = index === array.length - 1

						acc.push(<li key={ crumb.title }>{ crumb.href ?
							<Link
								external={ false }
								href={ crumb.href }
								aria-current={ isLastCrumb ? 'location' : null }
							>
								{ crumb.title }
							</Link>
							:
							<Box>{ crumb.title }</Box>
						}{
							!isLastCrumb && <Box className={ cx(classes.separator) } aria-hidden="true">
								{ separator }
							</Box>
						}</li>)

						return acc
					}, []) }
				</ol>
			</Box>
		</Portal>
	)
}

export default Breadcrumbs

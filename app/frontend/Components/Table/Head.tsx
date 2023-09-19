import React, { forwardRef } from 'react'
import { TableSectionContextProvider } from './TableContext'
import { Box, ElementProps, type BoxProps } from '@mantine/core'

interface ITableHead extends BoxProps, ElementProps<'thead'> {}

const Head = forwardRef<HTMLTableSectionElement, ITableHead>(({ children, ...props }, ref) => {
	return (
		<TableSectionContextProvider value={ { section: 'head' } }>
			<Box component="thead" { ...props } ref={ ref } style={ { zIndex: 401 } }>
				{ children }
			</Box>
		</TableSectionContextProvider>
	)
})

export default Head

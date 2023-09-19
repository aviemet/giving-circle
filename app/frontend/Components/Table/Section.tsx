import React from 'react'
import { Section } from '@/Components'
import classes from './Table.module.css'

const TableSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<Section fullHeight={ true } className={ classes.section }>
			{ children }
		</Section>
	)
}

export default TableSection

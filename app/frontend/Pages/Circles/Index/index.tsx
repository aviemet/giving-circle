import React from 'react'
import { Routes } from '@/lib'
import { Container, Heading, Table } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import CirclesTable from '../Table'

interface ICircleIndexProps {
	circles: Schema.Circle[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles, pagination }: ICircleIndexProps) => {
	return (
		<Container>
			<Table.TableProvider
				model="circle"
				rows={ circles }
				pagination={ pagination }
			>
				<Heading>Circles</Heading>
				<CirclesTable />
			</Table.TableProvider>
		</Container>
	)
}

export default CirclesIndex

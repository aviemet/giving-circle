import React from 'react'
import { Routes } from '@/lib'
import { Container, Heading } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import CirclesTable from '../Table'

interface ICircleIndexProps {
	circles: Schema.Circle[]
	pagination: Schema.Pagination
}

const CirclesIndex = ({ circles, pagination }: ICircleIndexProps) => {
	return (
		<Container>
			<Heading>Circles</Heading>
			<CirclesTable />
		</Container>
	)
}

export default CirclesIndex

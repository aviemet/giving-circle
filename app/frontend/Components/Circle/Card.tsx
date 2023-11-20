import { Paper } from '@mantine/core'
import React from 'react'
import { Link } from '@/Components'
import { Routes } from '@/lib'

interface CircleCardProps {
	circle: Schema.Circle
}

const Card = ({ circle }: CircleCardProps) => {
	return (
		<Paper
			shadow="sm"
			p="md"
			radius="md"
			withBorder component={ Link }
			href={ Routes.circle(circle.slug) }
		>
			{ circle.name }
		</Paper>
	)
}

export default Card

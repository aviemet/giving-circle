import React from "react"

import { Box, Group, Paper, Text } from "@/components"

interface StatTileProps {
	heading: string
	value: string | number
	icon: JSX.Element
	color: string
}

const StatTile = ({ heading, value, icon, color }: StatTileProps) => {
	return (
		<Paper
			style={ {
				backgroundColor: color,
			} }
			c="white"
			p="md"
			radius="md"
			shadow="sm"
		>
			<Text>{ heading }</Text>
			<Group>
				{ icon }
				<Box>{ value }</Box>
			</Group>
		</Paper>
	)
}

export default StatTile

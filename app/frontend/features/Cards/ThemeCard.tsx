import { Link } from "@inertiajs/react"
import React from "react"

import { Badge, Button, Card, Group, Text } from "@/components"
import { Routes } from "@/lib"

interface ThemeCardProps {
	circle: Schema.CirclesInertiaShare
	theme: Schema.Theme & {
		slug: string
	}
}

const ThemeCard = ({ circle, theme }: ThemeCardProps) => {
	return (
		<Card
			shadow="sm"
			p="lg"
			my="md"
			radius="md"
			withBorder
			component={ Link }
			href={ Routes.theme(circle.slug, theme.slug) }
		>
			<Group justify="space-between" mt="md" mb="xs">
				<Text fw={ 500 }>{ theme.name }</Text>
				<Badge color="pink"></Badge>
			</Group>

			<Text size="sm" c="dimmed">

			</Text>

			<Button color="blue" fullWidth mt="md" radius="md">

			</Button>
		</Card>
	)
}

export default ThemeCard

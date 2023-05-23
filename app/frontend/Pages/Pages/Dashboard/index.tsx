import React from 'react'
import { Center, Container, Heading, Button, Link } from '@/Components'
import { Text } from '@mantine/core'
import { Routes } from '@/lib'

const Dashboard = () => {
	return (
		<Container>
			<Heading>Giving Circles</Heading>
			<Center>
				<Text>It looks like you&apos;re not a member of any circles yet</Text>
				<Text>
					<Button component={ Link } href={ Routes.newCircle() }>Create a new one</Button>
					or request access from someone who has already created one.
				</Text>
			</Center>
		</Container>
	)
}

export default Dashboard

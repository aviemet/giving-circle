import React from 'react'
import { Center, Container, Heading, Button, Link } from '@/Components'
import { Text } from '@mantine/core'
import { Routes } from '@/lib'
import { usePage } from '@inertiajs/react'

const NoCircles = () => <>
	<Text>It looks like you&apos;re not a member of any circles yet</Text>
	<Text>
		<Button component={ Link } href={ Routes.newCircle() } size="sm" p="xs" mr="xs">
			Create a new one
		</Button>
		or request access from someone who has already created one.
	</Text>
</>

const YesCircles = () => <Center>
	<Text>You have circles</Text>
</Center>

const Dashboard = () => {
	const { props } = usePage<SharedInertiaProps>()

	return (
		<Container>
			<Heading>Giving Circles</Heading>

			{
				props.auth.user.circles.length > 0 ?
					<YesCircles />
					:
					<NoCircles />
			}


		</Container>
	)
}

export default Dashboard

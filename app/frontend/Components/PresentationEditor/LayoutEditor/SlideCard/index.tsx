import React from 'react'
import { Badge, Box, Button, Card, Group, Image, Text } from '@/Components'

import cx from 'clsx'
import * as classes from './SlideCard.css'

const SlideCard = () => {
	return (
		<Card shadow="sm" padding="md" radius="md" withBorder className={ cx(classes.slideCard) }>
			<Card.Section mb="sm">
				<Image
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
					height={ 160 }
					alt="Norway"
				/>
			</Card.Section>

			<Text fw={ 500 }>Norway Fjord Adventures</Text>
		</Card>
	)
}

export default SlideCard

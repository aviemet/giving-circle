import React from 'react'
import { Divider, Flex, Image, Title } from '@/Components'
import SlideCard from './SlideCard'
import { useInit } from '@/lib/hooks'
import { useScreenshot } from 'use-react-screenshot'

const LayoutEditor = () => {
	const [image, takeScreenshot] = useScreenshot()

	useInit(() => {
		takeScreenshot(document.getElementById('app'))
	})

	return (
		<>
			<Title order={ 3 }>Slides</Title>
			<Divider my="sm" />
			<Flex>
				<SlideCard />
			</Flex>
			<Image src={ image } />
		</>
	)
}

export default LayoutEditor

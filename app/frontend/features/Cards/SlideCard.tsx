import React from 'react'
import { rem, Routes } from '@/lib'
import { ActionIcon, Button, Card, Group, Image, Link, Menu, Text } from '@/components'
import { DotsIcon, EditIcon, TrashIcon } from '@/components/Icons'

interface SlideCardProps {
	slide: Schema.PresentationSlide
}

const SlideCard = ({ slide }: SlideCardProps) => {
	if(!slide.id) return <></>

	return (
		<Card withBorder shadow="sm" radius="md" >
			<Card.Section withBorder inheritPadding py="xs">

				<Group justify="space-between" wrap="nowrap">
					<Text fw={ 500 }>{ slide.name }</Text>

					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle" color="gray">
								<DotsIcon style={ { width: rem(16), height: rem(16) } } />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item leftSection={ <EditIcon style={ { width: rem(14), height: rem(14) } } /> }>
								Edit Slide
							</Menu.Item>
							<Menu.Item
								leftSection={ <TrashIcon style={ { width: rem(14), height: rem(14) } } /> }
								color="red"
							>
								Delete Slide
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Card.Section>

			<Card.Section>
				<Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
			</Card.Section>

		</Card>
	)
}

export default SlideCard

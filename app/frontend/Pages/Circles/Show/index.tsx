import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowCircleProps {
	circle: Schema.CirclesShow
}

const ShowCircle = ({ circle }: IShowCircleProps) => {
	const title =  'Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circle', href: Routes.circles() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircle(circle.id) }>
								Edit Circle
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowCircle

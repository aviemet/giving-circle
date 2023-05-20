import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CirclesForm from '../Form'

interface IEditCircleProps {
	circle: Schema.CirclesEdit
}

const EditCircle = ({ circle }: IEditCircleProps) => {
	const title = 'Edit Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: Circle, href: Routes.circle(circle.id) },
			{ title },
		] }>
			<Section>
				<Heading>{ title }</Heading>
				
				<CirclesForm
					method='put'
					to={ Routes.circle() }
					circle={ circle }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

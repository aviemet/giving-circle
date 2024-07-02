import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CirclesForm from '../Form'

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

const EditCircle = ({ circle }: EditCircleProps) => {
	const title = 'Edit Circle'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<CirclesForm
					method='put'
					to={ Routes.circle(circle.slug) }
					circle={ circle }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

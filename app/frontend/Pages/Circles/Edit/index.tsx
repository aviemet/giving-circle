import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CirclesForm from '../Form'

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

const EditCircle = ({ circle }: EditCircleProps) => {
	const title = 'Edit Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(circle.slug) },
			{ title, href: Routes.editCircle(circle.slug) },
		] }>
			<Section>
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

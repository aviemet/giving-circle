import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CirclesForm from '../Form'

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

// @path: /circles/:slug/edit
// @route: editCircle
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
					filter={ ['circle.id', 'circle.slug'] }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

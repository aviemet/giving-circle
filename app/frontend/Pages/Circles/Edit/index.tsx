import React from 'react'
import { Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CirclesForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditCircleProps {
	circle: Schema.CirclesEdit
}

// @path: /circles/:circle_slug/edit
// @route: editCircle
const EditCircle = ({ circle }: EditCircleProps) => {
	const { params } = usePageProps<'editCircle'>()
	const title = 'Edit Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title, href: Routes.editCircle(params.circle_slug) },
		] }>
			<Section>
				<CirclesForm
					method='put'
					to={ Routes.circle(params.circle_slug) }
					circle={ circle }
					filter={ ['circle.id', 'circle.slug'] }
				/>
			</Section>
		</Page>
	)
}

export default EditCircle

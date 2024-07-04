import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CircleForm from '../Form'

interface NewCircleProps {
	circle: Schema.CirclesFormData
}

const NewCircle = (data: NewCircleProps) => {
	const title = 'New Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: 'New Circle', href: Routes.newCircle() },
		] }>

			<Section>
				<Heading>{ title }</Heading>

				<CircleForm
					to={ Routes.circles() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewCircle

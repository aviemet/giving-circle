import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import CircleForm from '../Form'

interface INewCircleProps {
	circle: Schema.CirclesFormData
}

const NewCircle = ({ ...data }: INewCircleProps) => {
	const title = 'New Circle'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: 'New Circle' },
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

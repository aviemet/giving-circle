import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import GroupForm from '../Form'

interface NewGroupProps {
	group: Schema.GroupsFormData
	circle: Schema.CirclesOptions
}

const NewGroup = ({ circle, ...data }: NewGroupProps) => {
	const title = 'New Group'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				<GroupForm
					to={ Routes.circleGroups(circle.slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewGroup

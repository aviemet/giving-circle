import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import GroupForm from '../Form'

interface NewGroupProps {
	group: Schema.GroupsFormData
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/groups/new
// @route: newCircleGroup
const NewGroup = ({ circle, ...data }: NewGroupProps) => {
	const title = 'New Group'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<GroupForm
					to={ Routes.circleGroups(circle.slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewGroup

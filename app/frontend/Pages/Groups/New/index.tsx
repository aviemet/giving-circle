import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import GroupForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewGroupProps {
	group: Schema.GroupsFormData
	circle: Schema.CirclesOptions
}

// @path: /circles/:circle_slug/groups/new
// @route: newCircleGroup
const NewGroup = ({ circle, ...data }: NewGroupProps) => {
	const { params } = usePageProps<'newCircleGroup'>()
	const title = 'New Group'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				<GroupForm
					to={ Routes.circleGroups(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewGroup

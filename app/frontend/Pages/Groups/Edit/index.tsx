import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import GroupsForm from '../Form'

interface EditGroupProps {
	group: Schema.GroupsEdit
}

const EditGroup = ({ group }: EditGroupProps) => {
	const title = 'Edit Group'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<GroupsForm
					method='put'
					to={ Routes.group(group.slug) }
					group={ group }
				/>
			</Section>
		</Page>
	)
}

export default EditGroup
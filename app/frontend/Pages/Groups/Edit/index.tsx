import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import GroupsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditGroupProps {
	group: Schema.GroupsEdit
}

// @path: /groups/:slug/edit
// @route: editGroup
const EditGroup = ({ group }: EditGroupProps) => {
	const { params } = usePageProps<'editGroup'>()
	const title = 'Edit Group'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<GroupsForm
					method='put'
					to={ Routes.group(params.slug) }
					group={ group }
				/>
			</Section>
		</Page>
	)
}

export default EditGroup

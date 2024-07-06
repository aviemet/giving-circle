import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MemberForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewMemberProps {
	member: Schema.MembersFormData
}

const NewMember = ({ ...data }: NewMemberProps) => {
	const { params } = usePageProps()
	const title = 'New Member'

	return (
		<Page title={ title }>

			<Section>
				<Title>{ title }</Title>

				{ /* <MemberForm
					to={ Routes.circleMembers(params.circle_slug) }
					{ ...data }
				/> */ }
			</Section>

		</Page>
	)
}

export default NewMember

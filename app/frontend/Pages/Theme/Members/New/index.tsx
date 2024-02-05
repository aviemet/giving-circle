import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import MemberForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface INewMemberProps {
	member: Schema.MembersFormData
}

const NewMember = ({ ...data }: INewMemberProps) => {
	const { params } = usePageProps()
	const title = 'New Member'

	return (
		<Page title={ title }>

			<Section>
				<Heading>{ title }</Heading>

				{ /* <MemberForm
					to={ Routes.circleMembers(params.circle_slug) }
					{ ...data }
				/> */ }
			</Section>

		</Page>
	)
}

export default NewMember

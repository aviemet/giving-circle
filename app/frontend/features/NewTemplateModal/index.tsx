import React from 'react'
import { modals } from '@mantine/modals'
import { Form } from '@/components/Form'
import { Routes } from '@/lib'
import NewPresentationTemplateForm, { NewTemplateFormData } from './NewPresentationTemplateForm'

interface ClickableElementProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface NewTemplateModalProps {
	circle: Schema.CirclesInertiaShare
	children: React.ReactElement<ClickableElementProps>
}

const NewTemplateModal = ({ children, circle }: NewTemplateModalProps) => {
	const handleOpenModal = (originalOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void) => (event: React.MouseEvent<HTMLButtonElement>) => {

		modals.open({
			title: 'Create New Presentation Template',
			children:
			<Form<NewTemplateFormData>
				model="presentation_template"
				to={ Routes.circlePresentationTemplates(circle.slug) }
			>
				<NewPresentationTemplateForm />
			</Form>,
		})

		originalOnClick?.(event)
	}

	return React.isValidElement(children)
		? React.cloneElement(children, {
			onClick: handleOpenModal(children.props.onClick),
		})
		: children
}

export default NewTemplateModal

import { modals } from "@mantine/modals"
import React from "react"

import { Form } from "@/components/Form"
import { Routes } from "@/lib"

import NewTemplateForm, { NewTemplateFormData } from "./NewTemplateForm"

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
			title: "Create New Presentation Template",
			children:
			<Form<NewTemplateFormData>
				model="presentation_template"
				to={ Routes.circleTemplates(circle.slug) }
			>
				<NewTemplateForm />
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

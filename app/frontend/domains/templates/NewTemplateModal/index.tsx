import { modals } from "@mantine/modals"
import React from "react"

import { Form } from "@/components/Form"
import { Routes } from "@/lib"

import { NewTemplateForm, NewTemplateFormData } from "./NewTemplateForm"

interface ClickableElementProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface NewTemplateModalProps {
	circle: Schema.CirclesInertiaShare
	children: React.ReactElement<ClickableElementProps>
}

export const NewTemplateModal = ({ children, circle }: NewTemplateModalProps) => {
	const handleOpenModal = (originalOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void) => (event: React.MouseEvent<HTMLButtonElement>) => {

		modals.open({
			title: "Create New Presentation Template",
			children:
			<Form<NewTemplateFormData>
				action={ Routes.circleTemplates(circle.slug) }
				method="post"
				initialData={ {
					presentation_template: {
						orgs_vote_round: false,
						num_top_orgs: 0,
						allocation_vote_round: false,
					},
				} }
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

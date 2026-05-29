import { modals } from "@mantine/modals"
import React from "react"

import { Form } from "@/components/Form"
import { Routes } from "@/lib"

import { NewTemplateForm, NewTemplateFormData } from "./NewTemplateForm"

interface ClickableElementProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface NewTemplateModalProps {
	circle: Schema.CirclesOptions & { slug: string }
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
					template: {
						name: "",
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

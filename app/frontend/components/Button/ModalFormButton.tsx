import { useMantineTheme, type ModalProps, type ButtonProps } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import axios from "axios"
import React from "react"
import { type UseFormProps } from "use-inertia-form"

import { Modal } from "@/components"

import Button from "./index"

interface ModalFormButtonProps {
	children?: string | React.ReactElement
	form: React.ReactElement
	title: string
	buttonProps?: ButtonProps
	modalProps?: Partial<ModalProps>
	onSubmit?: (form: UseFormProps) => boolean | void
	onSuccess?: (data: { id: string | number }) => void
}

const ModalFormButton = ({
	children = "New",
	form,
	title,
	buttonProps = {},
	modalProps = {},
	onSubmit,
	onSuccess,
}: ModalFormButtonProps) => {
	const [opened, { open, close }] = useDisclosure(false)

	const theme = useMantineTheme()

	const handleSubmit = ({ data, method, to, setError }: UseFormProps) => {
		if(!to) return false

		axios[method](to, { ...data, redirect: false })
			.then(response => {
				if(response.statusText === "OK" || response.statusText === "Created") {
					close()
					if(onSuccess) onSuccess(response.data)
				}
			})
			.catch(error => {
				if(error.response.data?.errors) {
					setError(error.response.data.errors)
				}
			})

		return false // Returning false prevents the default form action
	}

	return (
		<>
			<Button onClick={ open } { ...buttonProps }>{ children }</Button>
			<Modal
				opened={ opened }
				onClose={ close }
				title={ title }
				size={ theme.breakpoints.md }
				{ ...modalProps }
			>
				{ React.cloneElement(form, {
					onSubmit: onSubmit ? onSubmit : handleSubmit,
				}) }
			</Modal>
		</>
	)
}

export default ModalFormButton

import { useMantineTheme, type ModalProps, type ButtonProps } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import axios from "axios"
import React from "react"

import { Modal } from "@/components"
import { type FormProps } from "@/components/Form"

import { Button } from "./index"

interface ModalFormButtonProps {
	children?: string | React.ReactElement
	form: React.ReactElement<FormProps>
	title: string
	buttonProps?: ButtonProps
	modalProps?: Partial<ModalProps>
	onSuccess?: (data: { id: string | number }) => void
}

const ModalFormButton = ({
	children = "New",
	form,
	title,
	buttonProps = {},
	modalProps = {},
	onSuccess,
}: ModalFormButtonProps) => {
	const [opened, { open, close }] = useDisclosure(false)

	const theme = useMantineTheme()

	const handleSubmit = async(data: Record<string, unknown>) => {
		const action = form.props.action
		const method = form.props.method ?? "post"
		if(!action) return

		const response = await axios.request({
			url: action,
			method,
			data: { ...data, redirect: false },
		})

		if(response.statusText === "OK" || response.statusText === "Created") {
			close()
			onSuccess?.(response.data)
		}
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
					submitWith: handleSubmit,
				}) }
			</Modal>
		</>
	)
}

export { ModalFormButton }

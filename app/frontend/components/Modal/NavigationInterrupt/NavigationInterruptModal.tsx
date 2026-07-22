import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Button, Group, Modal, Stack, Text } from "@/components"

export interface NavigationInterruptModalProps {
	opened: boolean
	title?: string
	message?: string
	discardLabel?: string
	saveAndLeaveLabel?: string
	stayLabel?: string
	onStay: () => void
	onDiscard: () => void | Promise<void>
	onSaveAndLeave?: () => Promise<boolean>
}

export function NavigationInterruptModal({
	opened,
	title,
	message,
	discardLabel,
	saveAndLeaveLabel,
	stayLabel,
	onStay,
	onDiscard,
	onSaveAndLeave,
}: NavigationInterruptModalProps) {
	const { t } = useTranslation()
	const [isSaving, setIsSaving] = useState(false)

	return (
		<Modal
			opened={ opened }
			onClose={ onStay }
			title={ title ?? t("navigation_interrupt.modal.title") }
			closeOnClickOutside={ false }
			withCloseButton={ false }
		>
			<Stack gap="md">
				<Text size="sm">{ message ?? t("navigation_interrupt.modal.message") }</Text>
				<Group justify="flex-end">
					<Button variant="default" disabled={ isSaving } onClick={ onStay }>
						{ stayLabel ?? t("navigation_interrupt.modal.stay") }
					</Button>
					<Button
						variant="outline"
						color="red"
						disabled={ isSaving }
						onClick={ () => {
							void onDiscard()
						} }
					>
						{ discardLabel ?? t("navigation_interrupt.modal.discard") }
					</Button>
					{ onSaveAndLeave && (
						<Button
							loading={ isSaving }
							onClick={ async () => {
								setIsSaving(true)
								try {
									const saved = await onSaveAndLeave()
									if(!saved) {
										setIsSaving(false)
									}
								} catch{
									setIsSaving(false)
								}
							} }
						>
							{ saveAndLeaveLabel ?? t("navigation_interrupt.modal.save_and_leave") }
						</Button>
					) }
				</Group>
			</Stack>
		</Modal>
	)
}

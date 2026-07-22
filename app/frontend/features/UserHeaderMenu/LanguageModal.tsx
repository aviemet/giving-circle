import clsx from "clsx"

import { Modal } from "@/components"
import { useLocaleStore } from "@/store"

import * as classes from "./LanguageModal.css"
import { LanguageModalCurrentLocale, LanguagePicker } from "./LanguagePicker"

interface LanguageModalProps {
	opened: boolean
	onClose: () => void
	title: string
}

export function LanguageModal({ opened, onClose, title }: LanguageModalProps) {
	const locale = useLocaleStore(state => state.locale)

	return (
		<Modal opened={ opened } onClose={ onClose } title={ title } size="md">
			<LanguageModalCurrentLocale locale={ locale } />
			<div className={ clsx(classes.pickerSection) }>
				<LanguagePicker onSelect={ onClose } />
			</div>
		</Modal>
	)
}

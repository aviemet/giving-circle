import { useTranslation } from "react-i18next"

import { Badge, Box, Button, Divider, Menu } from "@/components"
import { createContext } from "@/lib/hooks"

import { EditorSaveStatus, type PuckSlideData } from "./editorPersistence"
import { useEditorPuck } from "./useEditorPuck"
import { ArrowLeftSquareIcon, DownArrowIcon, SaveIcon } from "../Icons"

const [useVisualEditorUi, VisualEditorUiProvider] = createContext<{
	saveStatus: EditorSaveStatus
	isSaving: boolean
	handleSave: (data: PuckSlideData) => void | Promise<void>
	handleSaveAndClose: (data: PuckSlideData) => void | Promise<void>
	handleRevert: () => void
	sendToPreview: (payload: { type: "update", data: PuckSlideData }) => void
	handleCloseWithoutSaving: () => void
}>()
export { VisualEditorUiProvider }

const saveStatusColors = {
	saved: "green",
	unsaved: "yellow",
	recovered: "orange",
} satisfies Record<EditorSaveStatus, string>

export function HeaderActions() {
	const { t } = useTranslation()
	const ui = useVisualEditorUi()

	const appState = useEditorPuck((s) => s.appState)
	const isDirty = ui.saveStatus !== "saved"
	const badgeStatus = ui.isSaving ? "unsaved" : ui.saveStatus
	const badgeColor = ui.isSaving ? "blue" : saveStatusColors[badgeStatus]
	const badgeLabel = ui.isSaving
		? t("slides.editor.header.saving")
		: t(`slides.editor.header.save_status.${badgeStatus}`)

	return (
		<Box style={ { display: "flex", alignItems: "center", gap: 8 } }>
			<Badge variant="light" color={ badgeColor } size="sm">
				{ badgeLabel }
			</Badge>
			<Button.Group>
				<Button
					variant="default"
					onClick={ () => {
						window.sessionStorage.setItem("puck-preview-data", JSON.stringify(appState.data))
						ui.sendToPreview({ type: "update", data: appState.data })
						window.open("/preview/slide", "_blank")
					} }
				>
					{ t("slides.editor.header.open_preview") }
				</Button>
				<Button
					onClick={ () => ui.handleSave(appState.data) }
					leftSection={ <SaveIcon /> }
					disabled={ !isDirty || ui.isSaving }
					loading={ ui.isSaving }
					style={ { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }
				>
					{ t("slides.editor.header.save") }
				</Button>
				<Menu position="bottom-end">
					<Menu.Target>
						<Button p="xs">
							<DownArrowIcon />
						</Button>
					</Menu.Target>
					<Menu.Dropdown>
						{ isDirty && (
							<>
								<Menu.Item
									disabled={ ui.isSaving }
									leftSection={ <SaveIcon /> }
									onClick={ () => ui.handleSaveAndClose(appState.data) }
								>
									{ t("slides.editor.header.save_and_close") }
								</Menu.Item>
								<Menu.Item
									disabled={ ui.isSaving }
									leftSection={ <ArrowLeftSquareIcon /> }
									onClick={ ui.handleRevert }
								>
									{ t("slides.editor.header.revert") }
								</Menu.Item>
								<Divider />
							</>
						) }
						<Menu.Item
							disabled={ ui.isSaving }
							onClick={ ui.handleCloseWithoutSaving }
						>
							{ isDirty ? t("slides.editor.header.close_without_saving") : t("slides.editor.header.close") }
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Button.Group>
		</Box>
	)
}

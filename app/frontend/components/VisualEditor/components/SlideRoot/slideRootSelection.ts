export const PUCK_ROOT_DROPZONE_ID = "root:default-zone"

export function isSlideRootClickTarget(target: EventTarget | null): boolean {
	if(!(target instanceof HTMLElement)) return false
	if(target.closest("[data-puck-component]")) return false

	const dropzone = target.closest("[data-puck-dropzone]")
	if(!dropzone) return true

	return dropzone.getAttribute("data-puck-dropzone") === PUCK_ROOT_DROPZONE_ID
}

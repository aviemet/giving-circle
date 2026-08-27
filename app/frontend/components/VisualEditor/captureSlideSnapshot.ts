import { toBlob } from "html-to-image"

import { uploadFileAsPromise } from "@/lib/files"

export const SLIDE_SNAPSHOT_ROOT_ATTR = "data-slide-snapshot-root"
export const SLIDE_SNAPSHOT_HOST_ATTR = "data-slide-snapshot-host"
export const SLIDE_SNAPSHOT_CAPTURING_ATTR = "data-slide-snapshot-capturing"

export interface SlideSaveExtras {
	thumbnail?: string
}

function isSnapshotIncluded(node: Node) {
	if(!(node instanceof Element)) {
		return true
	}

	const className = node.getAttribute("class")
	if(className === null) {
		return true
	}

	if(className.includes("ActionBar")) {
		return false
	}

	if(className.includes("DropZone-hitbox")) {
		return false
	}

	return true
}

function snapshotBackgroundColor(root: HTMLElement) {
	const backgroundColor = window.getComputedStyle(root).backgroundColor
	if(backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)") {
		return "#000"
	}

	return backgroundColor
}

async function waitForFonts() {
	if(typeof document === "undefined") {
		return
	}

	if(!("fonts" in document)) {
		return
	}

	await document.fonts.ready
}

export async function captureSlideSnapshot() {
	const root = document.querySelector(`[${ SLIDE_SNAPSHOT_ROOT_ATTR }]`)
	if(!(root instanceof HTMLElement)) {
		return undefined
	}

	const host = root.closest(`[${ SLIDE_SNAPSHOT_HOST_ATTR }]`)
	const capturingTarget = host instanceof HTMLElement ? host : root

	capturingTarget.setAttribute(SLIDE_SNAPSHOT_CAPTURING_ATTR, "")

	try {
		await waitForFonts()
		const blob = await toBlob(root, {
			backgroundColor: snapshotBackgroundColor(root),
			cacheBust: true,
			filter: isSnapshotIncluded,
			pixelRatio: 2,
			quality: 0.82,
			type: "image/jpeg",
		})
		if(blob === null) {
			return undefined
		}

		return new File([blob], "slide-thumbnail.jpg", { type: "image/jpeg" })
	} finally {
		capturingTarget.removeAttribute(SLIDE_SNAPSHOT_CAPTURING_ATTR)
	}
}

export async function slideSnapshotSignedId() {
	try {
		const file = await captureSlideSnapshot()
		if(file === undefined) {
			return undefined
		}

		return await uploadFileAsPromise(file)
	} catch{
		return undefined
	}
}

export async function slideSaveExtras() {
	const thumbnail = await slideSnapshotSignedId()
	if(thumbnail === undefined) {
		return undefined
	}

	return { thumbnail }
}

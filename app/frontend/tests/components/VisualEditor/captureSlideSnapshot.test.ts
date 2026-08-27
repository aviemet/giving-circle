import { toBlob } from "html-to-image"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

import {
	captureSlideSnapshot,
	SLIDE_SNAPSHOT_CAPTURING_ATTR,
	SLIDE_SNAPSHOT_HOST_ATTR,
	SLIDE_SNAPSHOT_ROOT_ATTR,
	slideSaveExtras,
	slideSnapshotSignedId,
} from "@/components/VisualEditor/captureSlideSnapshot"
import { uploadFileAsPromise } from "@/lib/files"

vi.mock("html-to-image", () => ({
	toBlob: vi.fn(),
}))

vi.mock("@/lib/files", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/lib/files")>()
	return {
		...actual,
		uploadFileAsPromise: vi.fn(),
	}
})

function mockedToBlob() {
	return vi.mocked(toBlob)
}

function mockedUpload() {
	return vi.mocked(uploadFileAsPromise)
}

describe("captureSlideSnapshot", () => {
	beforeEach(() => {
		mockedToBlob().mockReset()
		mockedUpload().mockReset()
	})

	afterEach(() => {
		document.body.replaceChildren()
	})

	test("returns undefined when the slide root is missing", async () => {
		expect(await captureSlideSnapshot()).toBeUndefined()
		expect(mockedToBlob()).not.toHaveBeenCalled()
	})

	test("captures the slide root as a jpeg file and clears capturing chrome", async () => {
		const host = document.createElement("div")
		host.setAttribute(SLIDE_SNAPSHOT_HOST_ATTR, "")
		const root = document.createElement("div")
		root.setAttribute(SLIDE_SNAPSHOT_ROOT_ATTR, "")
		host.append(root)
		document.body.append(host)

		mockedToBlob().mockImplementation(async () => {
			expect(host.hasAttribute(SLIDE_SNAPSHOT_CAPTURING_ATTR)).toBe(true)
			return new Blob(["jpeg-bytes"], { type: "image/jpeg" })
		})

		const file = await captureSlideSnapshot()

		expect(file).toBeInstanceOf(File)
		expect(file?.name).toBe("slide-thumbnail.jpg")
		expect(file?.type).toBe("image/jpeg")
		expect(host.hasAttribute(SLIDE_SNAPSHOT_CAPTURING_ATTR)).toBe(false)
		expect(mockedToBlob()).toHaveBeenCalledTimes(1)
	})

	test("returns undefined when toBlob yields null", async () => {
		const root = document.createElement("div")
		root.setAttribute(SLIDE_SNAPSHOT_ROOT_ATTR, "")
		document.body.append(root)
		mockedToBlob().mockResolvedValue(null)

		expect(await captureSlideSnapshot()).toBeUndefined()
	})

	test("slideSnapshotSignedId uploads a captured file", async () => {
		const root = document.createElement("div")
		root.setAttribute(SLIDE_SNAPSHOT_ROOT_ATTR, "")
		document.body.append(root)
		mockedToBlob().mockResolvedValue(new Blob(["jpeg-bytes"], { type: "image/jpeg" }))
		mockedUpload().mockResolvedValue("signed-thumb")

		expect(await slideSnapshotSignedId()).toBe("signed-thumb")
		expect(mockedUpload()).toHaveBeenCalledTimes(1)
	})

	test("slideSaveExtras includes thumbnail on successful capture", async () => {
		const root = document.createElement("div")
		root.setAttribute(SLIDE_SNAPSHOT_ROOT_ATTR, "")
		document.body.append(root)
		mockedToBlob().mockResolvedValue(new Blob(["jpeg-bytes"], { type: "image/jpeg" }))
		mockedUpload().mockResolvedValue("signed-thumb")

		expect(await slideSaveExtras()).toEqual({ thumbnail: "signed-thumb" })
	})

	test("slideSaveExtras is undefined when capture fails so save can still proceed", async () => {
		mockedToBlob().mockRejectedValue(new Error("paint failed"))

		const root = document.createElement("div")
		root.setAttribute(SLIDE_SNAPSHOT_ROOT_ATTR, "")
		document.body.append(root)

		expect(await slideSaveExtras()).toBeUndefined()
		expect(await slideSnapshotSignedId()).toBeUndefined()
	})
})

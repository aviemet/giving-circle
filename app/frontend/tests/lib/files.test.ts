import { describe, expect, test } from "vitest"

import {
	activeStorageBlobRedirectUrl,
	FONT_MIME_TYPE,
	IMAGE_MIME_TYPE,
} from "@/lib/files"

describe("lib/files", () => {
	test("builds active storage blob redirect url", () => {
		expect(activeStorageBlobRedirectUrl("signed-1", "photo.png")).toBe(
			"/rails/active_storage/blobs/redirect/signed-1/photo.png",
		)
		expect(activeStorageBlobRedirectUrl("signed-2")).toBe(
			"/rails/active_storage/blobs/redirect/signed-2/image",
		)
	})

	test("exports mime type lists", () => {
		expect(FONT_MIME_TYPE.length).toBeGreaterThan(0)
		expect(IMAGE_MIME_TYPE.length).toBeGreaterThan(0)
	})
})

import { describe, expect, test } from "vitest"

import {
	buildBackgroundImageStyle,
	defaultBackgroundImageValue,
	isBackgroundImageAttachment,
	isBackgroundImageRepeat,
	isBackgroundImageSize,
	normalizeBackgroundImageValue,
} from "@/components/VisualEditor/fields/backgroundImage"
import { activeStorageBlobRedirectUrl } from "@/lib/files"

describe("components/VisualEditor/fields/backgroundImage", () => {
	test("buildBackgroundImageStyle returns empty object when url is missing", () => {
		expect(buildBackgroundImageStyle(defaultBackgroundImageValue())).toEqual({})
	})

	test("buildBackgroundImageStyle maps preset size and offsets", () => {
		expect(buildBackgroundImageStyle({
			url: activeStorageBlobRedirectUrl("signed-id"),
			size: "cover",
			offsetX: "left",
			offsetY: "top",
			repeat: "no-repeat",
			attachment: "fixed",
		})).toEqual({
			backgroundImage: `url("${activeStorageBlobRedirectUrl("signed-id")}")`,
			backgroundSize: "cover",
			backgroundPosition: "left top",
			backgroundRepeat: "no-repeat",
			backgroundAttachment: "fixed",
		})
	})

	test("buildBackgroundImageStyle uses custom size when size is custom", () => {
		expect(buildBackgroundImageStyle({
			url: "/example.jpg",
			size: "custom",
			customSize: "50% auto",
		})).toMatchObject({
			backgroundSize: "50% auto",
		})
	})

	test("normalizeBackgroundImageValue fills missing fields", () => {
		expect(normalizeBackgroundImageValue({ url: "/example.jpg" })).toEqual({
			...defaultBackgroundImageValue(),
			url: "/example.jpg",
		})
	})

	test("type guards accept valid enum values", () => {
		expect(isBackgroundImageSize("cover")).toBe(true)
		expect(isBackgroundImageSize("stretch")).toBe(false)
		expect(isBackgroundImageRepeat("repeat-x")).toBe(true)
		expect(isBackgroundImageAttachment("fixed")).toBe(true)
	})
})

describe("lib/files activeStorageBlobRedirectUrl", () => {
	test("builds the rails redirect path", () => {
		expect(activeStorageBlobRedirectUrl("abc123")).toBe("/rails/active_storage/blobs/redirect/abc123/image")
	})
})

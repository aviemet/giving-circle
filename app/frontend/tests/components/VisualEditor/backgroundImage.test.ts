import { describe, expect, test } from "vitest"

import { config } from "@/components/VisualEditor/config"
import {
	backgroundField,
	buildBackgroundImageStyle,
	defaultBackgroundImageValue,
	defaultBackgroundValue,
	hasBackgroundColor,
	isBackgroundImageAttachment,
	isBackgroundImageRepeat,
	isBackgroundImageSize,
	normalizeBackgroundImageValue,
	normalizeBackgroundValue,
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

	test("normalizeBackgroundValue uses the current grouped value", () => {
		expect(normalizeBackgroundValue({
			color: "#112233",
			image: { url: "/new.jpg", size: "contain" },
		})).toEqual({
			color: "#112233",
			image: {
				...defaultBackgroundImageValue(),
				url: "/new.jpg",
				size: "contain",
			},
		})
	})

	test("normalizeBackgroundValue keeps explicit empty color unset", () => {
		expect(normalizeBackgroundValue({
			color: "",
			image: defaultBackgroundImageValue(),
		}).color).toBe("")

		expect(normalizeBackgroundValue(undefined).color).toBe("#000000")
	})

	test("hasBackgroundColor treats empty as unset", () => {
		expect(hasBackgroundColor("#000000")).toBe(true)
		expect(hasBackgroundColor("")).toBe(false)
		expect(hasBackgroundColor(undefined)).toBe(false)
	})

	test("backgroundField is a custom Background panel", () => {
		expect(backgroundField()).toMatchObject({ type: "custom", label: "Background" })
	})

	test("type guards accept valid enum values", () => {
		expect(isBackgroundImageSize("cover")).toBe(true)
		expect(isBackgroundImageSize("stretch")).toBe(false)
		expect(isBackgroundImageRepeat("repeat-x")).toBe(true)
		expect(isBackgroundImageAttachment("fixed")).toBe(true)
	})
})

describe("components/VisualEditor/config root background", () => {
	test("root exposes combined background field and default", () => {
		expect(config.root?.fields?.background).toMatchObject({ type: "custom", label: "Background" })
		expect(config.root?.defaultProps).toMatchObject({
			background: defaultBackgroundValue("#000000"),
		})
		expect(config.root?.fields).not.toHaveProperty("backgroundColor")
		expect(config.root?.fields).not.toHaveProperty("backgroundImage")
	})
})

describe("lib/files activeStorageBlobRedirectUrl", () => {
	test("builds the rails redirect path", () => {
		expect(activeStorageBlobRedirectUrl("abc123")).toBe("/rails/active_storage/blobs/redirect/abc123/image")
	})
})

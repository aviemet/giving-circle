import { describe, expect, test } from "vitest"

import { imageConfig } from "@/components/VisualEditor/components/Image/imageConfig"
import { defaultBorderValue } from "@/components/VisualEditor/fields/border"
import {
	buildImageSizeStyle,
	defaultImageSize,
	normalizeImageSize,
	resolveImageSize,
} from "@/components/VisualEditor/fields/imageSize"

describe("components/VisualEditor/fields/imageSize", () => {
	test("default image size is width-only with max-width cap", () => {
		expect(defaultImageSize()).toEqual({
			mode: "width",
			width: { amount: 640, unit: "px" },
			height: { unit: "auto" },
			maxWidth: { amount: 100, unit: "%" },
			maxHeight: { unit: "auto" },
			aspectRatio: "auto",
			customAspectRatio: "16 / 9",
			objectFit: "cover",
			objectPositionX: "50%",
			objectPositionY: "50%",
		})
	})

	test("buildImageSizeStyle width-only keeps height auto and omits object-fit", () => {
		expect(buildImageSizeStyle({
			mode: "width",
			width: { amount: 320, unit: "px" },
			height: { unit: "auto" },
			maxWidth: { amount: 100, unit: "%" },
			maxHeight: { unit: "auto" },
			aspectRatio: "auto",
			customAspectRatio: "16 / 9",
			objectFit: "cover",
			objectPositionX: "50%",
			objectPositionY: "50%",
		})).toEqual({
			display: "block",
			width: "320px",
			height: "auto",
			maxWidth: "100%",
		})
	})

	test("buildImageSizeStyle height-only keeps width auto", () => {
		expect(buildImageSizeStyle({
			mode: "height",
			width: { unit: "auto" },
			height: { amount: 200, unit: "px" },
			maxWidth: { unit: "auto" },
			maxHeight: { unit: "auto" },
			aspectRatio: "auto",
			customAspectRatio: "16 / 9",
			objectFit: "cover",
			objectPositionX: "50%",
			objectPositionY: "50%",
		})).toEqual({
			display: "block",
			width: "auto",
			height: "200px",
		})
	})

	test("buildImageSizeStyle box mode applies fit and position", () => {
		expect(buildImageSizeStyle({
			mode: "box",
			width: { amount: 320, unit: "px" },
			height: { amount: 180, unit: "px" },
			maxWidth: { amount: 100, unit: "%" },
			maxHeight: { unit: "auto" },
			aspectRatio: "16 / 9",
			customAspectRatio: "16 / 9",
			objectFit: "contain",
			objectPositionX: "0%",
			objectPositionY: "100%",
		})).toMatchObject({
			width: "320px",
			height: "180px",
			aspectRatio: "16 / 9",
			objectFit: "contain",
			objectPosition: "0% 100%",
			display: "block",
			maxWidth: "100%",
		})
	})

	test("resolveImageSize hydrates legacy width height and fixed sizing", () => {
		expect(resolveImageSize({
			width: 320,
			height: 240,
		})).toMatchObject({
			mode: "box",
			width: { amount: 320, unit: "px" },
			height: { amount: 240, unit: "px" },
		})

		expect(resolveImageSize({
			sizing: {
				mode: "fixed",
				width: { amount: 640, unit: "px" },
			},
		})).toMatchObject({
			mode: "width",
			width: { amount: 640, unit: "px" },
			height: { unit: "auto" },
		})

		expect(normalizeImageSize({
			width: { amount: 100, unit: "%" },
			aspectRatio: "1 / 1",
			objectFit: "cover",
		})).toMatchObject({
			mode: "width",
			width: { amount: 100, unit: "%" },
			height: { unit: "auto" },
			aspectRatio: "1 / 1",
			objectFit: "cover",
		})
	})
})

describe("components/VisualEditor/imageConfig", () => {
	test("exposes image-specific size controls instead of flex sizing", () => {
		expect(imageConfig.inline).toBe(true)
		expect(imageConfig.fields).toMatchObject({
			src: { type: "custom", label: "Image" },
			size: { type: "custom", label: "Size" },
			spacing: { type: "custom", label: "Spacing" },
			border: { type: "custom", label: "Border" },
			alignment: { type: "custom", label: "Alignment" },
		})
		expect(imageConfig.fields).not.toHaveProperty("sizing")
		expect(imageConfig.fields).not.toHaveProperty("margin")
		expect(imageConfig.fields).not.toHaveProperty("padding")
		expect(imageConfig.fields).not.toHaveProperty("width")
		expect(imageConfig.fields).not.toHaveProperty("height")
	})

	test("defaultProps use image size width height aspect and fit", () => {
		expect(imageConfig.defaultProps).toMatchObject({
			alignment: "left",
			size: defaultImageSize(),
			spacing: {
				margin: { top: 4, right: 4, bottom: 4, left: 4, unit: "px" },
				padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			},
			border: defaultBorderValue(),
		})
	})

	test("resolveData hydrates legacy flat margin padding width height and border", async () => {
		const resolveData = imageConfig.resolveData
		expect(resolveData).toBeTypeOf("function")
		if(!resolveData) {
			return
		}

		const resolved = await resolveData({
			props: {
				id: "image-legacy",
				title: "Legacy",
				src: "",
				alignment: "left",
				margin: 8,
				padding: 2,
				width: 320,
				height: 240,
				borderWidth: 1,
				borderColor: "#ff0000",
			},
		}, {
			changed: {},
			lastData: null,
			trigger: "load",
			metadata: {},
			parent: null,
			root: { props: {} },
		})

		expect(resolved.props).toMatchObject({
			spacing: {
				margin: { top: 8, right: 8, bottom: 8, left: 8, unit: "px" },
				padding: { top: 2, right: 2, bottom: 2, left: 2, unit: "px" },
			},
			size: {
				mode: "box",
				width: { amount: 320, unit: "px" },
				height: { amount: 240, unit: "px" },
				aspectRatio: "auto",
				objectFit: "cover",
			},
			border: {
				borderWidth: 1,
				borderColor: "#ff0000",
			},
		})
	})
})

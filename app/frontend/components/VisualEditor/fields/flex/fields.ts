import { type TFunction } from "i18next"

import { i18n } from "@/lib/i18n"

function flexText(t: TFunction, key: string) {
	return t(`slides.editor.fields.flex.${key}`)
}

function flexObjectFields(t: TFunction) {
	return {
		display: {
			type: "select" as const,
			label: flexText(t, "labels.display"),
			options: [
				{ label: flexText(t, "display.block"), value: "block" },
				{ label: flexText(t, "display.flex"), value: "flex" },
			],
		},
		flexDirection: {
			type: "select" as const,
			label: flexText(t, "labels.direction"),
			options: [
				{ label: flexText(t, "direction.row"), value: "row" },
				{ label: flexText(t, "direction.column"), value: "column" },
			],
		},
		flexWrap: {
			type: "select" as const,
			label: flexText(t, "labels.wrap"),
			options: [
				{ label: flexText(t, "wrap.nowrap"), value: "nowrap" },
				{ label: flexText(t, "wrap.wrap"), value: "wrap" },
			],
		},
		justifyContent: {
			type: "select" as const,
			label: flexText(t, "labels.justify"),
			options: [
				{ label: flexText(t, "justify.start"), value: "flex-start" },
				{ label: flexText(t, "justify.center"), value: "center" },
				{ label: flexText(t, "justify.end"), value: "flex-end" },
				{ label: flexText(t, "justify.space_between"), value: "space-between" },
				{ label: flexText(t, "justify.space_around"), value: "space-around" },
			],
		},
		alignItems: {
			type: "select" as const,
			label: flexText(t, "labels.align"),
			options: [
				{ label: flexText(t, "align.start"), value: "flex-start" },
				{ label: flexText(t, "align.center"), value: "center" },
				{ label: flexText(t, "align.end"), value: "flex-end" },
				{ label: flexText(t, "align.stretch"), value: "stretch" },
			],
		},
		gap: { type: "number" as const, label: flexText(t, "labels.gap") },
		overflow: {
			type: "select" as const,
			label: flexText(t, "labels.overflow"),
			options: [
				{ label: flexText(t, "overflow.visible"), value: "visible" },
				{ label: flexText(t, "overflow.auto_scroll"), value: "auto" },
				{ label: flexText(t, "overflow.hidden"), value: "hidden" },
			],
		},
	}
}

export function flexField(t: TFunction = i18n.t.bind(i18n)) {
	return {
		type: "object" as const,
		label: flexText(t, "label"),
		objectFields: flexObjectFields(t),
	}
}

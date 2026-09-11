import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { Grid, type GridProps } from "./Grid"
import {
	backgroundField,
	borderField,
	boxModelField,
	defaultBackgroundValue,
	defaultBorderValue,
	defaultGridLayoutValue,
	flexItemSizingField,
	gridField,
	iterateField,
	ITERATE_NONE,
	normalizeBackgroundValue,
	normalizeBorderValue,
	normalizeGridLayoutValue,
	normalizeIterateValue,
} from "../../fields"

export const gridConfig: ComponentConfig<GridProps> = {
	label: i18n.t("slides.editor.components.grid.label"),
	inline: true,
	fields: {
		iterate: iterateField(),
		sizing: flexItemSizingField(),
		spacing: boxModelField(),
		background: backgroundField(),
		border: borderField(),
		grid: gridField(),
		content: { type: "slot" },
	},
	defaultProps: {
		content: [],
		iterate: ITERATE_NONE,
		sizing: { mode: "fill" },
		spacing: {
			margin: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
			padding: { top: 0, right: 0, bottom: 0, left: 0, unit: "px" },
		},
		background: defaultBackgroundValue(""),
		border: defaultBorderValue(),
		grid: defaultGridLayoutValue(),
	},

	resolveData: ({ props }) => {
		return {
			props: {
				...props,
				iterate: normalizeIterateValue(props.iterate),
				grid: normalizeGridLayoutValue(props.grid),
				background: normalizeBackgroundValue(props.background),
				border: normalizeBorderValue(props.border),
			},
		}
	},

	render: (props) => <Grid { ...props } />,
}

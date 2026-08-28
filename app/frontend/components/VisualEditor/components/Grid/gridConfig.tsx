import { Slot, type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { GridDisplay } from "./Grid"
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
	type BackgroundValue,
	type BorderProps,
	type BoxModelValue,
	type DimensionStyleProps,
	type FlexItemSizing,
	type GridLayoutValue,
	type IterateValue,
	type SpacingProps,
} from "../../fields"

export type GridProps = SpacingProps & DimensionStyleProps & BorderProps & {
	background?: BackgroundValue
	backgroundColor?: string
	border?: BorderProps
	content: Slot
	columns?: number
	grid?: GridLayoutValue
	sizing?: FlexItemSizing
	spacing?: BoxModelValue
	iterate?: IterateValue
}

const t = i18n.t.bind(i18n)

export const gridConfig: ComponentConfig<GridProps> = {
	label: t("slides.editor.components.grid.label"),
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
				grid: normalizeGridLayoutValue(props.grid, {
					columns: props.columns,
				}),
				background: normalizeBackgroundValue(props.background, {
					color: props.backgroundColor,
				}),
				border: normalizeBorderValue(props.border, {
					borderWidth: props.borderWidth,
					borderRadius: props.borderRadius,
					borderColor: props.borderColor,
				}),
			},
		}
	},
	render: (props) => <GridDisplay { ...props } />,
}

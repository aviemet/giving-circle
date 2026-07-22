import { Slot, type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { ContainerDisplay } from "./Container"
import {
	alignmentField,
	backgroundColorField,
	borderColorField,
	borderRadiusField,
	borderWidthField,
	flexField,
	flexItemSizingField,
	marginField,
	minHeightField,
	minWidthField,
	paddingField,
	widthField,
	type AlignmentValue,
	type BorderProps,
	type DimensionStyleProps,
	type FlexItemSizing,
	type FlexStyleInput,
	type SpacingProps,
} from "../../fields"

export type ContainerProps = SpacingProps & BorderProps & DimensionStyleProps & FlexStyleInput & {
	backgroundColor?: string
	content: Slot
	alignment: AlignmentValue
	sizing?: FlexItemSizing
}

const t = i18n.t.bind(i18n)

export const containerConfig: ComponentConfig<ContainerProps> = {
	label: t("slides.editor.components.container.label"),
	fields: {
		sizing: flexItemSizingField(),
		margin: marginField(),
		padding: paddingField(),
		backgroundColor: backgroundColorField(),
		borderWidth: borderWidthField(),
		borderRadius: borderRadiusField(),
		borderColor: borderColorField(),
		width: widthField(),
		minWidth: minWidthField(),
		minHeight: minHeightField(),
		flex: flexField(),
		content: { type: "slot" },
		alignment: alignmentField({
			label: t("slides.editor.components.container.alignment"),
		}),
	},
	defaultProps: {
		content: [],
		alignment: "left",
		sizing: { mode: "fill" },
		flex: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "nowrap",
			alignItems: "stretch",
			justifyContent: "flex-start",
			overflow: "hidden",
			gap: 0,
		},
	},
	render: (props) => <ContainerDisplay { ...props } />,
}

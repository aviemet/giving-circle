import { Slot, type ComponentConfig } from "@measured/puck"

import { ContainerDisplay } from "./Container"
import {
	alignmentField,
	backgroundColorField,
	borderColorField,
	borderRadiusField,
	borderWidthField,
	flexField,
	marginField,
	minHeightField,
	minWidthField,
	paddingField,
	widthField,
	type AlignmentValue,
	type BorderProps,
	type DimensionStyleProps,
	type FlexStyleInput,
	type SpacingProps,
} from "../../fields"

export type ContainerProps = SpacingProps & BorderProps & DimensionStyleProps & FlexStyleInput & {
	backgroundColor?: string
	content: Slot
	alignment: AlignmentValue
}

export const containerConfig: ComponentConfig<ContainerProps> = {
	label: "Container",
	fields: {
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
			label: "Alignment",
		}),
	},
	defaultProps: {
		content: [],
		alignment: "left",
		flex: {
			display: "flex",
			flexDirection: "column",
			flexWrap: "nowrap",
			overflow: "visible",
		},
	},
	render: (props) => <ContainerDisplay { ...props } />,
}

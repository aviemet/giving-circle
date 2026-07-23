import { type BackgroundImageValue, type BackgroundValue } from "../../fields/backgroundImage"
import { type FlexProps } from "../../fields/flex"
import { type FontValue } from "../../fields/font"
import { type SpacingProps } from "../../fields/spacing"

export type SlideRootProps = SpacingProps & {
	title: string
	background?: BackgroundValue
	backgroundColor?: string
	backgroundImage?: BackgroundImageValue
	flex: FlexProps
	font: FontValue
}

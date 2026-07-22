import { type BackgroundImageValue } from "../../fields/backgroundImage"
import { type FlexProps } from "../../fields/flex"
import { type FontValue } from "../../fields/font"

export type SlideRootProps = {
	title: string
	backgroundColor: string
	backgroundImage: BackgroundImageValue
	flex: FlexProps
	font: FontValue
}

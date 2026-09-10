import { PuckComponent } from "@puckeditor/core"

import { ImageDisplay } from "./ImageDisplay"
import { ImageEditor } from "./ImageEditor"
import {
	type AlignmentValue,
	type BorderProps,
	type BoxModelValue,
	type ImageSizeValue,
} from "../../fields"

export type ImageProps = {
	title: string
	src: string
	alignment: AlignmentValue
	size?: ImageSizeValue
	spacing?: BoxModelValue
	border?: BorderProps
}

export type ImageComponentProps = Parameters<PuckComponent<ImageProps>>[0]

export function Image(props: ImageComponentProps) {
	return props.puck.isEditing
		? <ImageEditor { ...props } />
		: <ImageDisplay { ...props } />
}

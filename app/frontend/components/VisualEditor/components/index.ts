import { type CardProps } from "./Card/cardConfig"
import { type ContainerProps } from "./Container/containerConfig"
import { type GridProps } from "./Grid/gridConfig"
import { type HeadingProps } from "./Heading/headingConfig"
import { type ImageProps } from "./Image/imageConfig"
import { type OrgsIteratorProps } from "./OrgsIterator/orgsIteratorConfig"

export type PuckComponentProps = {
	Grid: GridProps
	Container: ContainerProps
	Heading: HeadingProps
	Card: CardProps
	Image: ImageProps
	OrgsIterator: OrgsIteratorProps
}

export * from "./Card"
export * from "./Container"
export * from "./Grid"
export * from "./Heading"
export * from "./Image"
export * from "./OrgsIterator"
export * from "./SlideRoot"

import { type BarGraphAllocatedTotalsProps } from "./BarGraphAllocatedTotals/barGraphAllocatedTotalsConfig"
import { type CardProps } from "./Card/cardConfig"
import { type ContainerProps } from "./Container/containerConfig"
import { type GridProps } from "./Grid/gridConfig"
import { type HeadingProps } from "./Heading/headingConfig"
import { type ImageProps } from "./Image/imageConfig"
import { type OrgsIteratorProps } from "./OrgsIterator/orgsIteratorConfig"
import { type TextComponentProps } from "./Text/textConfig"

export type PuckComponentProps = {
	Grid: GridProps
	Container: ContainerProps
	Heading: HeadingProps
	Text: TextComponentProps
	Card: CardProps
	Image: ImageProps
	OrgsIterator: OrgsIteratorProps
	BarGraphAllocatedTotals: BarGraphAllocatedTotalsProps
}

export * from "./Card"
export * from "./Container"
export * from "./Grid"
export * from "./Heading"
export * from "./Image"
export * from "./OrgsIterator"
export * from "./BarGraphAllocatedTotals"
export * from "./SlideRoot"
export * from "./Text"

import { type BarGraphAllocatedTotalsProps } from "./BarGraphAllocatedTotals"
import { type CardProps } from "./Card"
import { type ContainerProps } from "./Container"
import { type GridProps } from "./Grid"
import { type HeadingProps } from "./Heading"
import { type ImageProps } from "./Image"
import { type LeverageBarProps } from "./LeverageBar"
import { type TextProps } from "./Text"
import { type TimerProps } from "./Timer"

export type PuckComponentProps = {
	Grid: GridProps
	Container: ContainerProps
	Heading: HeadingProps
	Text: TextProps
	Card: CardProps
	Image: ImageProps
	BarGraphAllocatedTotals: BarGraphAllocatedTotalsProps
	LeverageBar: LeverageBarProps
	Timer: TimerProps
}

export * from "./Card"
export * from "./Container"
export * from "./Grid"
export * from "./Heading"
export * from "./Image"
export * from "./BarGraphAllocatedTotals"
export * from "./LeverageBar"
export * from "./Timer"
export * from "./Text"

import clsx from "clsx"

import { SimpleGrid, type SimpleGridProps } from "@/components"

const defaultCols: SimpleGridProps["cols"] = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }

export interface CardContainerProps {
	children: React.ReactNode
	className?: string
	cols?: SimpleGridProps["cols"]
}

export function CardContainer({ children, className, cols = defaultCols }: CardContainerProps) {
	return (
		<SimpleGrid cols={ cols } className={ clsx(className) }>
			{ children }
		</SimpleGrid>
	)
}

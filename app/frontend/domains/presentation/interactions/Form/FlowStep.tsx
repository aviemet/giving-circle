import clsx from "clsx"
import { type ReactNode } from "react"

import { Box } from "@/components"

import * as classes from "./flowLane.css"

interface FlowStepProps {
	marker?: string
	children: ReactNode
}

export function FlowStep({ marker, children }: FlowStepProps) {
	return (
		<Box className={ clsx(classes.step) }>
			{ marker !== undefined && (
				<Box className={ clsx(classes.railNode) } aria-hidden>
					{ marker }
				</Box>
			) }
			<Box className={ clsx(classes.stepContent) }>
				{ children }
			</Box>
		</Box>
	)
}

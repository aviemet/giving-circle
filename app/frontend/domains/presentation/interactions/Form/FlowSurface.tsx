import clsx from "clsx"
import type { ReactNode } from "react"

import { Box, Text } from "@/components"

import * as classes from "./flowLane.css"

interface FlowSurfaceProps {
	title: string
	actions?: ReactNode
	children: ReactNode
}

export function FlowSurface({ title, actions, children }: FlowSurfaceProps) {
	return (
		<Box className={ clsx(classes.surface) }>
			<Box className={ clsx(classes.surfaceHeader) }>
				<Text className={ clsx(classes.surfaceTitle) }>{ title }</Text>
				{ actions }
			</Box>
			<Box className={ clsx(classes.surfaceBody) }>
				{ children }
			</Box>
		</Box>
	)
}

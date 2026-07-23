import { type ReactNode } from "react"

import { Tooltip } from "@/components"

import * as classes from "./IconControlTooltip.css"

interface IconControlTooltipProps {
	label: string
	children: ReactNode
	className?: string
}

export function IconControlTooltip({ label, children, className }: IconControlTooltipProps) {
	return (
		<Tooltip label={ label } withArrow position="top" openDelay={ 300 }>
			<span className={ className ?? classes.tooltipTarget }>{ children }</span>
		</Tooltip>
	)
}

import clsx from "clsx"

import { Box, Text } from "@/components"

import * as classes from "./flowLane.css"

interface FlowConnectorProps {
	label: string
}

export function FlowConnector({ label }: FlowConnectorProps) {
	return (
		<Box className={ clsx(classes.connector) } aria-hidden={ false }>
			<svg
				className={ clsx(classes.connectorPath) }
				viewBox="0 0 40 44"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden
			>
				<path
					d="M20 0 V18 C20 26 20 26 28 26 H36"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M32 22 L36 26 L32 30"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<Text className={ clsx(classes.connectorLabel) }>{ label }</Text>
		</Box>
	)
}

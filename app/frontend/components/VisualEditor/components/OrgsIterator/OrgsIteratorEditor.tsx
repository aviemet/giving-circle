import { Box } from "@/components"

import { type OrgsIteratorComponentProps } from "./orgsIteratorConfig"
import { presentationSlot } from "../../Puck.css"
import { slotDropZoneProps } from "../../slotEditor"

export function OrgsIteratorEditor({ content: Content }: OrgsIteratorComponentProps) {
	return (
		<Box
			className={ presentationSlot }
			style={ { position: "relative", minWidth: "100%", padding: 16 } }
		>
			<Content
				className={ presentationSlot }
				{ ...slotDropZoneProps() }
			/>
			<Box
				component="span"
				style={ {
					position: "absolute",
					bottom: 0,
					left: 0,
					fontSize: "0.75rem",
					opacity: 0.7,
				} }
			>
				Repeats for each organization
			</Box>
		</Box>
	)
}

import clsx from "clsx"

import { Container } from "@/components"
import { usePresentationDataContext } from "@/features/presentation/PresentationDataProvider"

import { buildContainerStyle } from "./buildContainerStyle"
import { type ContainerComponentProps } from "./Container"
import * as classes from "./Container.css"
import {
	getIterateItems,
	getIteratePathPrefix,
	isIterateOn,
	RepeatedSlot,
} from "../../fields/iterate"

export function ContainerDisplay({
	content: Content,
	alignment,
	sizing,
	puck,
	iterate,
	...styleProps
}: ContainerComponentProps) {
	const { dragRef } = puck
	const contextData = usePresentationDataContext()
	const iterating = isIterateOn(iterate)
	const items = getIterateItems(contextData, iterate)

	const containerProps = {
		ref: dragRef,
		style: buildContainerStyle(styleProps, sizing),
		ta: alignment,
		fluid: true,
		w: "100%",
		className: clsx(classes.container),
	}

	if(iterating) {
		return (
			<Container { ...containerProps }>
				<RepeatedSlot
					content={ Content }
					items={ items }
					pathPrefix={ getIteratePathPrefix(iterate) }
				/>
			</Container>
		)
	}

	return (
		<Container
			component={ Content }
			{ ...containerProps }
		/>
	)
}

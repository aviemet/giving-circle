import { type SlotComponent } from "@puckeditor/core"
import clsx from "clsx"

import { type ContextOrg } from "../../dynamicData/getOrgsFromContext"
import { IteratorItemProvider } from "../../dynamicData/IteratorItemContext"
import * as classes from "./iterate.css"

export function RepeatedSlot({
	content: Content,
	items,
	pathPrefix,
	className,
}: {
	content: SlotComponent
	items: ContextOrg[]
	pathPrefix: string
	className?: string
}) {
	if(items.length === 0) {
		return <></>
	}

	return (
		<>
			{ items.map((item, index) => (
				<IteratorItemProvider
					key={ item.id }
					value={ {
						pathPrefix,
						currentItem: item,
						index,
					} }
				>
					<Content className={ clsx(className ?? classes.iterateItem) } />
				</IteratorItemProvider>
			) ) }
		</>
	)
}

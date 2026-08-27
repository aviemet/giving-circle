import clsx from "clsx"

import { usePresentationDataContext } from "@/features/presentation"

import * as classes from "./OrgsIterator.css"
import { type OrgsIteratorComponentProps } from "./orgsIteratorConfig"
import { getOrgsFromContext } from "../../dynamicData/getOrgsFromContext"
import { IteratorItemProvider } from "../../dynamicData/IteratorItemContext"

const PATH_PREFIX = "presentation.org"

export function OrgsIteratorDisplay({ content: Content }: OrgsIteratorComponentProps) {
	const contextData = usePresentationDataContext()
	const orgs = getOrgsFromContext(contextData)

	if(orgs.length === 0) {
		return <></>
	}

	return (
		<>
			{ orgs.map((org, index) => (
				<IteratorItemProvider<Schema.OrgsPersisted>
					key={ org.id }
					value={ {
						pathPrefix: PATH_PREFIX,
						currentItem: org,
						index,
					} }
				>
					<Content className={ clsx(classes.orgIteratorItem) } />
				</IteratorItemProvider>
			) ) }
		</>
	)
}

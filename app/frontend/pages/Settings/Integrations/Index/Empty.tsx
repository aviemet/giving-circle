import React from "react"

import { Link, Text } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

const Empty = () => {
	const { auth: { user } } = usePageProps()

	return (<></>
	// <Text>There are no SMTP servers set up for { user.active_circle.name },
	// 	<Link href={ Routes.newSettingsSmtp() } as="button" size="sm" p="xs">Add one now</Link>
	// </Text>
	)
}

export default Empty

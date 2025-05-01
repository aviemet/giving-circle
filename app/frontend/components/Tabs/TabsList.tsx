import { TabsListProps, Tabs } from "@mantine/core"
import clsx from "clsx"

import * as classes from "./Tabs.css"

interface TabsListComponentProps extends TabsListProps {
	scrollOverflow?: boolean
}

const TabsList = ({ scrollOverflow = true, className, ...props }: TabsListComponentProps) => {
	return (
		<Tabs.List
			className={ clsx(className, { [classes.scrollTabsList]: scrollOverflow }) }
			{ ...props }
		/>
	)
}

export default TabsList

import clsx from "clsx"
import { isEmpty } from "lodash"

import {
	Link,
	Menu,
	Avatar,
	Group,
	Box,
	Button,
} from "@/components"
import { DownArrowIcon } from "@/components/Icons"
import { initials, Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import * as classes from "../AppLayout.css"

const CircleDropdownLink = () => {
	const { auth, active_circle } = usePageProps()

	if(isEmpty(active_circle)) {
		return <Box>Giving Circles</Box>
	}

	const hasMultipleCircles = auth.user.circles.length > 1

	return (
		<>
			<Group
				justify="space-between"
				className={ clsx(classes.circleMenuGroup) }
			>
				<Link href={ Routes.circle(active_circle.slug) } underline="never">
					<Group justify="space-between">
						<Avatar size="sm">{ initials(active_circle.name) }</Avatar>
					</Group>
				</Link>
				<Menu offset={ 9 } position="bottom-end" withArrow disabled={ !hasMultipleCircles }>
					<Menu.Target>
						<Button
							p={ 0 }
							variant="transparent"
							className={ clsx(classes.circleMenuButton) }
							rightSection={ hasMultipleCircles && <DownArrowIcon /> }
						>
							{ active_circle.name }
						</Button>
					</Menu.Target>

					<Menu.Dropdown>
						{ auth.user.circles.map(circle => (
							<Menu.Item
								key={ circle.id }
								component={ Link }
								href={ Routes.circle(circle.slug) }
							>
								{ circle.name }
							</Menu.Item>
						)) }
					</Menu.Dropdown>
				</Menu>
			</Group>
		</>
	)
}

export default CircleDropdownLink

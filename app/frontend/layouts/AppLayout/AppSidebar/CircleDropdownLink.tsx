import clsx from "clsx"
import { useTranslation } from "react-i18next"

import {
	Link,
	Menu,
	Avatar,
	Group,
	ActionIcon,
} from "@/components"
import { DownArrowIcon } from "@/components/Icons"
import { initials, Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import * as classes from "../AppLayout.css"

export function CircleDropdownLink() {
	const { t } = useTranslation()
	const { auth, active_circle, circles } = usePageProps()
	const circle = active_circle ?? circles?.[0]

	if(!circle) {
		return (
			<Link href={ Routes.circles() } underline="never">
				{ t("navigation.givingCircles") }
			</Link>
		)
	}

	const hasMultipleCircles = auth.user.circles.length > 1

	return (
		<Group
			justify="space-between"
			className={ clsx(classes.circleMenuGroup) }
		>
			<Link
				href={ Routes.circle(circle.slug) }
				underline="never"
				className={ clsx(classes.circleMenuLink) }
			>
				<Group gap="xs" wrap="nowrap">
					<Avatar size="sm">{ initials(circle.name) }</Avatar>
					{ circle.name }
				</Group>
			</Link>
			{ hasMultipleCircles && (
				<Menu offset={ 9 } position="bottom-end" withArrow>
					<Menu.Target>
						<ActionIcon variant="transparent">
							<DownArrowIcon />
						</ActionIcon>
					</Menu.Target>

					<Menu.Dropdown>
						{ auth.user.circles.map(circleOption => (
							<Menu.Item
								key={ circleOption.id }
								component={ Link }
								href={ Routes.circle(circleOption.slug) }
							>
								{ circleOption.name }
							</Menu.Item>
						)) }
					</Menu.Dropdown>
				</Menu>
			) }
		</Group>
	)
}

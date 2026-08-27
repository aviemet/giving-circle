import { modals } from "@mantine/modals"

import { ActionIcon, Card, Group, Link, Menu, Text } from "@/components"
import { DotsIcon, EditIcon, TrashIcon } from "@/components/Icons"
import { rem } from "@/lib"

import { SlideThumbnail } from "../SlideThumbnail"

interface SlideCardProps {
	slide: Schema.SlidesShow
	editHref: string
	onDelete?: () => void
}

export function SlideCard({ slide, editHref, onDelete }: SlideCardProps) {
	if(!slide.id) return null

	const handleDelete = () => {
		if(!onDelete) return

		modals.openConfirmModal({
			title: "Remove this slide?",
			children: (
				<Text>Click confirm to remove this slide from the presentation.</Text>
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			onConfirm: onDelete,
		})
	}

	return (
		<Card withBorder shadow="sm" radius="md" component={ Link } href={ editHref }>
			<Card.Section withBorder inheritPadding py="xs">
				<Group justify="space-between" wrap="nowrap">
					<Text fw={ 500 }>{ slide.title ?? slide.slug }</Text>

					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon
								variant="subtle"
								color="gray"
								onClick={ (event) => event.preventDefault() }
							>
								<DotsIcon style={ { width: rem(16), height: rem(16) } } />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Link href={ editHref } leftSection={ <EditIcon style={ { width: rem(14), height: rem(14) } } /> }>
								Edit Slide
							</Menu.Link>
							{ onDelete && (
								<Menu.Item
									leftSection={ <TrashIcon style={ { width: rem(14), height: rem(14) } } /> }
									color="red"
									onClick={ (event) => {
										event.preventDefault()
										handleDelete()
									} }
								>
									Delete Slide
								</Menu.Item>
							) }
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section>

			<Card.Section>
				<SlideThumbnail
					src={ slide.thumbnail_url }
					alt=""
				/>
			</Card.Section>
		</Card>
	)
}

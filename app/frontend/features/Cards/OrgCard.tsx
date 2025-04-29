import React from 'react'
import { rem } from '@/lib'
import { ActionIcon, Card, Group, Image, Menu, Money, Text } from '@/components'
import { DotsIcon, EditIcon, TrashIcon } from '@/components/Icons'

interface OrgCardProps {
	org: Schema.OrgsPersisted | Schema.ThemesOrgsShow
}

const OrgCard = ({ org }: OrgCardProps) => {
	if(!org.id) return <></>

	return (
		<Card withBorder shadow="sm" radius="md" >
			<Card.Section withBorder inheritPadding py="xs">

				<Text fw={ 500 } truncate="end">{ org.name }</Text>

			</Card.Section>

			<Card.Section>
				<Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png" />
			</Card.Section>

			{ isThemesOrgsShow(org) && org?.ask && <Card.Section withBorder inheritPadding py="xs">
				<Group justify="space-between" wrap="nowrap">
					<Text>Ask: <Money>{ org.ask }</Money></Text>

					<Menu withinPortal position="bottom-end" shadow="sm">
						<Menu.Target>
							<ActionIcon variant="subtle" color="gray">
								<DotsIcon style={ { width: rem(16), height: rem(16) } } />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item leftSection={ <EditIcon style={ { width: rem(14), height: rem(14) } } /> }>
								Edit Org
							</Menu.Item>
							<Menu.Item
								leftSection={ <TrashIcon style={ { width: rem(14), height: rem(14) } } /> }
								color="red"
							>
								Delete Org
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			</Card.Section> }

		</Card>
	)
}

export default OrgCard

function isThemesOrgsShow(org: Schema.OrgsPersisted | Schema.ThemesOrgsShow): org is Schema.ThemesOrgsShow {
	return 'ask' in org
}

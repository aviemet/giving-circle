import { useDisclosure } from "@mantine/hooks"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Link, Menu, ActionIcon, Avatar, Divider, Text } from "@/components"
import { LogoutIcon, SettingsIcon, LanguageIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import { LanguageModal } from "./LanguageModal"

const UserHeaderMenu = () => {
	const { t } = useTranslation()
	const { auth: { user }, circles, active_circle } = usePageProps()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isLanguageModalOpen, { open: openLanguageModal, close: closeLanguageModal }] = useDisclosure(false)

	const themes = useMemo(() => {
		return active_circle?.themes && active_circle.themes.length > 0
			? active_circle.themes
			: undefined
	}, [active_circle?.themes])

	const handleOpenLanguageModal = useCallback(() => {
		setIsMenuOpen(false)
		openLanguageModal()
	}, [openLanguageModal])

	if(!user) return <Link href={ Routes.newUserSession() }>{ t("navigation.signIn") }</Link>

	return (
		<>
			<Menu position="bottom-end" opened={ isMenuOpen } onChange={ setIsMenuOpen }>
				<Menu.Target>
					<Avatar radius="xl" component={ ActionIcon }></Avatar>
				</Menu.Target>

				<Menu.Dropdown>
					{ circles && circles.length > 0 && <>
						<Text><Link href={ Routes.circles() }>{ t("navigation.circles") }</Link></Text>

						{ circles.slice(0, 4).map(circle => (
							<Menu.Link
								key={ circle.id }
								href={ Routes.circle(circle.slug) }
								active={ circle.slug === active_circle?.slug }
							>
								{ circle.name }
							</Menu.Link>
						)) }

						{ circles.length > 4 && <Menu.Link href={ Routes.circles() }>{ t("navigation.more") }</Menu.Link> }

						{ themes && <>
							<Divider />

							<Text><Link href={ Routes.circleThemes(active_circle!.slug) }>{ t("navigation.themes") }</Link></Text>

							{ themes.slice(0, 4).map(theme => (
								<Menu.Link
									key={ theme.id }
									href={ Routes.theme(active_circle!.slug, theme.slug) }
								>
									{ theme.name }
								</Menu.Link>
							)) }

							{ circles.length > 4 && <Menu.Link href={ Routes.circleThemes(active_circle!.slug) }>{ t("navigation.more") }</Menu.Link> }
						</> }

					</> }
					<Divider />

					<Menu.Item
						leftSection={ <LanguageIcon /> }
						onClick={ handleOpenLanguageModal }
					>
						{ t("navigation.language") }
					</Menu.Item>

					<Menu.Link
						href={ Routes.settingsGeneral() }
						icon={ <SettingsIcon /> }
					>
						{ t("navigation.preferences") }
					</Menu.Link>

					<Divider />

					<Menu.Link
						href={ Routes.destroyUserSession() }
						icon={ <LogoutIcon /> }
					>
						{ t("navigation.signOut") }
					</Menu.Link>
				</Menu.Dropdown>
			</Menu>

			<LanguageModal
				opened={ isLanguageModalOpen }
				onClose={ closeLanguageModal }
				title={ t("navigation.language") }
			/>
		</>
	)
}

export { UserHeaderMenu }

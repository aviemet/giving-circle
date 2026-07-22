import { useTranslation } from "react-i18next"

import { Page } from "@/components"

// @path: /settings/:circle_slug/notifications
// @route: settingsNotifications
const NotificationsSettings = () => {
	const { t } = useTranslation()

	return (
		<Page title={ t("settings.notifications.index.title") } />
	)
}

export default NotificationsSettings

import { useTranslation } from "react-i18next"

import { Page } from "@/components"

// @path: /settings/:circle_slug/integrations
// @route: settingsIntegrations
const IntegrationsSettings = () => {
	const { t } = useTranslation()

	return (
		<Page title={ t("settings.integrations.index.title") } />
	)
}

export default IntegrationsSettings

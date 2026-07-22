import { useTranslation } from "react-i18next"

import { Page } from "@/components"

// @path: /settings/general
// @route: settingsGeneral
const GeneralSettings = () => {
	const { t } = useTranslation()

	return (
		<Page title={ t("settings.general.index.title") } />
	)
}

export default GeneralSettings

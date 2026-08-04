import { i18n } from "@/lib/i18n"

export function presentationMessageMediumLabel(medium: string) {
	switch(medium) {
		case "sms":
			return i18n.t("messaging.form.medium_sms")
		case "email":
			return i18n.t("messaging.form.medium_email")
		default:
			return i18n.t("messaging.form.medium_email")
	}
}

export function presentationMessageStatusLabel(status: string) {
	switch(status) {
		case "sending":
			return i18n.t("presentation_messages.active.statuses.sending")
		case "finished":
			return i18n.t("presentation_messages.active.statuses.finished")
		case "ready":
			return i18n.t("presentation_messages.active.statuses.ready")
		default:
			return i18n.t("presentation_messages.active.statuses.ready")
	}
}

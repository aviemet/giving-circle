import { router } from "@inertiajs/react"

export const navigateBack = () => {
	const currentUrl = window.location.pathname + window.location.search
	router.visit(currentUrl, { replace: true })
	setTimeout(() => window.history.back(), 0)
}

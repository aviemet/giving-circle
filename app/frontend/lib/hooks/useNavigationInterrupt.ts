import { type VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { useMachine } from "@xstate/react"
import { useCallback, useEffect } from "react"

import {
	navigationInterruptMachine,
	parseInertiaVisitUrl,
} from "@/components/Modal/NavigationInterrupt/navigationInterruptMachine"

export interface UseNavigationInterruptOptions {
	enabled: boolean
	historyGuardKey: string
	onNavigationBlocked?: () => void
}

export function useNavigationInterrupt({
	enabled,
	historyGuardKey,
	onNavigationBlocked,
}: UseNavigationInterruptOptions) {
	const [snapshot, send, actorRef] = useMachine(navigationInterruptMachine)

	const stayOnPage = useCallback(() => {
		send({ type: "STAY" })
	}, [send])

	const leaveAfterAction = useCallback(() => {
		send({ type: "PREPARE_LEAVE" })
	}, [send])

	const visitWithBypass = useCallback((url: string, options?: VisitOptions) => {
		send({ type: "VISIT_WITH_BYPASS", url, options })
	}, [send])

	const navigateBackWithBypass = useCallback(() => {
		send({ type: "BACK_WITH_BYPASS" })
	}, [send])

	useEffect(() => {
		if(!enabled) {
			return
		}

		window.history.pushState({ navigationInterrupt: historyGuardKey }, "")

		const removeBeforeListener = router.on("before", (event) => {
			const { context } = actorRef.getSnapshot()

			if(context.bypass) {
				send({ type: "CONSUME_BYPASS" })
				return
			}

			event.preventDefault()
			send({
				type: "REQUEST_INTERRUPT",
				pending: {
					type: "visit",
					url: parseInertiaVisitUrl(event.detail.visit.url),
				},
			})
			onNavigationBlocked?.()
		})

		const handlePopState = () => {
			const { context } = actorRef.getSnapshot()

			if(context.bypass) {
				send({ type: "CONSUME_BYPASS" })
				return
			}

			window.history.pushState({ navigationInterrupt: historyGuardKey }, "")
			send({ type: "REQUEST_INTERRUPT", pending: { type: "historyBack" } })
			onNavigationBlocked?.()
		}

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault()
		}

		window.addEventListener("popstate", handlePopState)
		window.addEventListener("beforeunload", handleBeforeUnload)

		return () => {
			removeBeforeListener()
			window.removeEventListener("popstate", handlePopState)
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [actorRef, enabled, historyGuardKey, onNavigationBlocked, send])

	return {
		promptOpen: snapshot.matches("prompting"),
		stayOnPage,
		leaveAfterAction,
		visitWithBypass,
		navigateBackWithBypass,
	}
}


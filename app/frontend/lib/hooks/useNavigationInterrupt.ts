import { type VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { useMachine } from "@xstate/react"
import { useCallback, useEffect, useRef } from "react"

import {
	navigationInterruptMachine,
	parseInertiaVisitUrl,
} from "@/components/Modal/NavigationInterrupt/navigationInterruptMachine"

export interface UseNavigationInterruptOptions {
	enabled: boolean
	historyGuardKey: string
	onNavigationBlocked?: () => void
}

function isNavigationInterruptState(state: object | null, historyGuardKey: string) {
	if(state === null || typeof state !== "object") {
		return false
	}

	if(!("navigationInterrupt" in state)) {
		return false
	}

	return state.navigationInterrupt === historyGuardKey
}

export function useNavigationInterrupt({
	enabled,
	historyGuardKey,
	onNavigationBlocked,
}: UseNavigationInterruptOptions) {
	const [snapshot, send, actorRef] = useMachine(navigationInterruptMachine)
	const allowNextNavigationRef = useRef(false)

	const stayOnPage = useCallback(() => {
		send({ type: "STAY" })
	}, [send])

	const leaveAfterAction = useCallback(() => {
		allowNextNavigationRef.current = true
		send({ type: "PREPARE_LEAVE" })
	}, [send])

	const visitWithBypass = useCallback((url: string, options?: VisitOptions) => {
		allowNextNavigationRef.current = true
		send({ type: "VISIT_WITH_BYPASS", url, options })
	}, [send])

	const navigateBackWithBypass = useCallback(() => {
		allowNextNavigationRef.current = true
		send({ type: "BACK_WITH_BYPASS" })
	}, [send])

	useEffect(() => {
		if(!enabled) {
			return
		}

		const guardState = { navigationInterrupt: historyGuardKey }

		if(!isNavigationInterruptState(window.history.state, historyGuardKey)) {
			window.history.pushState(guardState, "")
		}

		const removeBeforeListener = router.on("before", (event) => {
			const { context } = actorRef.getSnapshot()

			if(allowNextNavigationRef.current || context.bypass) {
				allowNextNavigationRef.current = false
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

			if(allowNextNavigationRef.current || context.bypass) {
				allowNextNavigationRef.current = false
				send({ type: "CONSUME_BYPASS" })
				return
			}

			if(!isNavigationInterruptState(window.history.state, historyGuardKey)) {
				window.history.pushState(guardState, "")
			}

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

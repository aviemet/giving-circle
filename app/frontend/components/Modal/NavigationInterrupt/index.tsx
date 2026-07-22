import { type VisitOptions } from "@inertiajs/core"
import { type ReactNode, useCallback } from "react"

import { createContext } from "@/lib/hooks/createContext"
import { useNavigationInterrupt } from "@/lib/hooks/useNavigationInterrupt"

import { NavigationInterruptModal, type NavigationInterruptModalProps } from "./NavigationInterruptModal"

interface NavigationInterruptContextValue {
	visitWithBypass: (url: string, options?: VisitOptions) => void
	navigateBackWithBypass: () => void
}

const [useNavigationInterruptContext, NavigationInterruptContextProvider] = createContext<NavigationInterruptContextValue>()

export interface NavigationInterruptProps extends Omit<NavigationInterruptModalProps, "opened" | "onStay" | "onDiscard" | "onSaveAndLeave"> {
	enabled: boolean
	historyGuardKey: string
	onDiscard: () => void | Promise<void>
	onSaveAndLeave?: () => Promise<boolean>
	children: ReactNode
}

export function NavigationInterrupt({
	enabled,
	historyGuardKey,
	onDiscard,
	onSaveAndLeave,
	children,
	...modalProps
}: NavigationInterruptProps) {
	const {
		promptOpen,
		stayOnPage,
		leaveAfterAction,
		visitWithBypass,
		navigateBackWithBypass,
	} = useNavigationInterrupt({
		enabled,
		historyGuardKey,
	})

	const handleStay = useCallback(() => {
		stayOnPage()
	}, [stayOnPage])

	const handleDiscard = useCallback(async () => {
		await onDiscard()
		leaveAfterAction()
	}, [leaveAfterAction, onDiscard])

	const handleSaveAndLeave = useCallback(async () => {
		if(!onSaveAndLeave) {
			return false
		}

		const saved = await onSaveAndLeave()

		if(saved) {
			leaveAfterAction()
		}

		return saved
	}, [leaveAfterAction, onSaveAndLeave])

	return (
		<NavigationInterruptContextProvider value={ { visitWithBypass, navigateBackWithBypass } }>
			{ children }
			<NavigationInterruptModal
				{ ...modalProps }
				opened={ promptOpen }
				onStay={ handleStay }
				onDiscard={ handleDiscard }
				onSaveAndLeave={ onSaveAndLeave ? handleSaveAndLeave : undefined }
			/>
		</NavigationInterruptContextProvider>
	)
}

export { useNavigationInterruptContext }
export { NavigationInterruptModal }
export { type NavigationInterruptModalProps }

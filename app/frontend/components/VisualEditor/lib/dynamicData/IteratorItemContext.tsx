import React from "react"

import { createContext } from "@/lib/hooks"

import { type ContextOrg } from "./tagSchema"

export interface IteratorItemContextValue {
	pathPrefix: string
	currentItem: ContextOrg
	index: number
}

const [useIteratorItemContextBase, ContextProvider] = createContext<IteratorItemContextValue>()

export function useIteratorItemContext(error: true): IteratorItemContextValue
export function useIteratorItemContext(error: false): IteratorItemContextValue | null
export function useIteratorItemContext(error = true): IteratorItemContextValue | null {
	return useIteratorItemContextBase(error)
}

export function IteratorItemProvider(props: {
	value: IteratorItemContextValue
	children: React.ReactNode
}) {
	return <ContextProvider value={ props.value }>{ props.children }</ContextProvider>
}

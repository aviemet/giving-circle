import React from "react"

import { createContext } from "@/lib/hooks"

export interface IteratorItemContextValue<TData = unknown> {
	pathPrefix: string
	currentItem: TData
	index: number
}

const [useIteratorItemContextBase, ContextProvider] = createContext<IteratorItemContextValue<unknown>>()

export function useIteratorItemContext<T = unknown>(error: true): IteratorItemContextValue<T>
export function useIteratorItemContext<T = unknown>(error: false): IteratorItemContextValue<T> | null
export function useIteratorItemContext<T = unknown>(error = true): IteratorItemContextValue<T> | null {
	return useIteratorItemContextBase(error) as IteratorItemContextValue<T> | null
}

export function IteratorItemProvider<T>(props: {
	value: IteratorItemContextValue<T>
	children: React.ReactNode
}) {
	return <ContextProvider value={ props.value }>{ props.children }</ContextProvider>
}

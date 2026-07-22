import { Transition } from "@mantine/core"
import React, { useLayoutEffect, useRef } from "react"

interface FadeMenuProps<T> {
	mounted: boolean
	value: T | undefined
	children: (styles: React.CSSProperties, value: T) => React.ReactElement
}

export function FadeMenu<T>({ mounted, value, children }: FadeMenuProps<T>) {
	const retainedValueRef = useRef<T | undefined>(undefined)

	useLayoutEffect(() => {
		if(value !== undefined) {
			retainedValueRef.current = value
		}
	}, [value])

	return (
		<Transition mounted={ mounted } transition="fade" duration={ 150 } timingFunction="linear">
			{ (styles) => {
				const displayValue = value ?? retainedValueRef.current

				if(displayValue === undefined) {
					return <></>
				}

				return children(styles, displayValue)
			} }
		</Transition>
	)
}

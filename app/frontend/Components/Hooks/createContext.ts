import React from 'react'

const createContext = <T extends {} | null>() => {
	const context = React.createContext<T | null>(null)

	const useContext = () => {
		const c = React.useContext(context)
		if(c === null) {
			throw new Error('useContext must be inside a Provider with a value')
		}
		return c
	}

	return [useContext, context.Provider] as const
}

export default createContext

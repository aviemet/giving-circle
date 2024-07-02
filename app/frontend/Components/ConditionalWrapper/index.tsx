import React from 'react'

interface ConditionalWrapperProps {
	children: JSX.Element
	condition: boolean
	wrapper: (children: React.ReactNode) => JSX.Element
}

const ConditionalWrapper = ({ children, condition, wrapper }: ConditionalWrapperProps) => condition ? wrapper(children) : children

export default ConditionalWrapper

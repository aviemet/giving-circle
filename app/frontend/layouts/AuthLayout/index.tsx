import React from "react"

interface LayoutProps {
	children: any
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>{ children }</>
	)
}

export default Layout

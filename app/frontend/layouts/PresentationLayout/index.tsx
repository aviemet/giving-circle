interface PresentationLayoutProps {
	children: any
}

const PresentationLayout = ({ children }: PresentationLayoutProps) => {
	return (
		<div>{ children }</div>
	)
}

export default PresentationLayout

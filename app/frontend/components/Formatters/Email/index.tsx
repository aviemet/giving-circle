import { Anchor, ConditionalWrapper } from "@/components"

interface EmailFormatterProps {
	children: string
	link?: boolean
}

export const EmailFormatter = ({ children, link = true }: EmailFormatterProps) => {
	return (
		<ConditionalWrapper
			condition={ link }
			wrapper={ content => <Anchor href={ `mailto:${children}` }>{ content }</Anchor> }
		>
			<address>{ children }</address>
		</ConditionalWrapper>
	)
}

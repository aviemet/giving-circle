import cx from "clsx"
import React from "react"

import { Group, GroupProps, SimpleGrid } from "@/components"
import { exclude } from "@/lib"

import * as classes from "./Cards.css"

interface FlexProps {
	flexBasis?: number | string
	flexGrow?: number | string
	flexShrink?: number | string
}

interface SingleFlexProp {
	flex: string
}

interface CardGroupProps extends Omit<GroupProps, "flex"> {
	children: React.ReactNode
}

type CardContainerProps = CardGroupProps & (FlexProps | SingleFlexProp);

const CardContainer = ({ children, className, ...props }: CardContainerProps) => {
	let flex: string

	if("flex" in props) {
		flex = props.flex
	} else {
		let { flexGrow, flexShrink, flexBasis } = props
		flexGrow ||= "0"
		flexShrink ||= "0"
		flexBasis ||= "25%"

		const parse = (str: string | number) => typeof str === "number" ? `${str}px` : str
		flex = `${parse(flexGrow)} ${parse(flexShrink)} ${parse(flexBasis)}`
	}

	return (
		<SimpleGrid
			cols={ { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }
			// data-child-flex
			// style={ { '--child-flex': flex } }
			className={ cx(className, classes.cardContainer) }
			// { ...exclude(props, ['flexGrow', 'flexShrink', 'flexBasis', 'flex']) }
		>
			{ children }
		</SimpleGrid>
	)
}

export default CardContainer

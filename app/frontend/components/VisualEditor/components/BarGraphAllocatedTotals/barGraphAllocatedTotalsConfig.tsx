import { type ComponentConfig } from "@measured/puck"
import clsx from "clsx"

import { Box } from "@/components"
import { i18n } from "@/lib/i18n"

import { BarGraphAllocatedTotals, useAllocatedTotals } from "../../elements/BarGraphAllocatedTotals"
import * as classes from "../../elements/BarGraphAllocatedTotals/BarGraphAllocatedTotals.css"
import { colorField, flexItemSizingField, imageField, type FlexItemSizing } from "../../fields"
import { buildFlexItemSizingStyle } from "../../fields/flexItemSizing"

export type BarGraphAllocatedTotalsProps = {
	barColor: string
	fundedBarColor: string
	textColor: string
	needColor: string
	gridColor: string
	awardImageSrc: string
	sizing?: FlexItemSizing
}

function BarGraphAllocatedTotalsDisplay({
	barColor,
	fundedBarColor,
	textColor,
	needColor,
	gridColor,
	awardImageSrc,
	sizing,
}: BarGraphAllocatedTotalsProps) {
	const totals = useAllocatedTotals()

	return (
		<Box
			className={ clsx(classes.host) }
			style={ buildFlexItemSizingStyle(sizing ?? { mode: "fill" }) }
		>
			<BarGraphAllocatedTotals
				totals={ totals }
				colors={ {
					barColor,
					fundedBarColor,
					textColor,
					needColor,
					gridColor,
				} }
				awardImageSrc={ awardImageSrc || undefined }
			/>
		</Box>
	)
}

const t = i18n.t.bind(i18n)

export const barGraphAllocatedTotalsConfig: ComponentConfig<BarGraphAllocatedTotalsProps> = {
	label: t("slides.editor.components.bar_graph.label"),
	fields: {
		sizing: flexItemSizingField(),
		barColor: colorField({ label: t("slides.editor.components.bar_graph.bar_color") }),
		fundedBarColor: colorField({ label: t("slides.editor.components.bar_graph.funded_bar_color") }),
		textColor: colorField({ label: t("slides.editor.components.bar_graph.text_color") }),
		needColor: colorField({ label: t("slides.editor.components.bar_graph.need_color") }),
		gridColor: colorField({ label: t("slides.editor.components.bar_graph.grid_color") }),
		awardImageSrc: imageField({ label: t("slides.editor.components.bar_graph.award_image") }),
	},
	defaultProps: {
		sizing: { mode: "fill" },
		barColor: "#1B2A4A",
		fundedBarColor: "#7CFF2B",
		textColor: "#FFFFFF",
		needColor: "#7CFF2B",
		gridColor: "#FFFFFF",
		awardImageSrc: "",
	},
	render: (props) => <BarGraphAllocatedTotalsDisplay { ...props } />,
}

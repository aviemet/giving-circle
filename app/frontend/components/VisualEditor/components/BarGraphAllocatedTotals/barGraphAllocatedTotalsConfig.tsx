import { type ComponentConfig } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { BarGraphAllocatedTotals, type BarGraphAllocatedTotalsProps } from "./BarGraphAllocatedTotals"
import { colorField, flexItemSizingField, imageField } from "../../fields"

export const barGraphAllocatedTotalsConfig: ComponentConfig<BarGraphAllocatedTotalsProps> = {
	label: i18n.t("slides.editor.components.bar_graph.label"),
	fields: {
		sizing: flexItemSizingField(),
		barColor: colorField({ label: i18n.t("slides.editor.components.bar_graph.bar_color") }),
		fundedBarColor: colorField({ label: i18n.t("slides.editor.components.bar_graph.funded_bar_color") }),
		textColor: colorField({ label: i18n.t("slides.editor.components.bar_graph.text_color") }),
		needColor: colorField({ label: i18n.t("slides.editor.components.bar_graph.need_color") }),
		gridColor: colorField({ label: i18n.t("slides.editor.components.bar_graph.grid_color") }),
		awardImageSrc: imageField({ label: i18n.t("slides.editor.components.bar_graph.award_image") }),
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
	render: (props) => <BarGraphAllocatedTotals { ...props } />,
}

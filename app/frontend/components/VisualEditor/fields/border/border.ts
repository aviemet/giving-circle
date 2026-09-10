import { type BorderProps } from "./style"
import {
	BORDER_RADIUS_UNITS,
	BORDER_WIDTH_UNITS,
	normalizeOptionalLength,
} from "../shared/length"

export function defaultBorderValue(): BorderProps {
	return {}
}

export function normalizeBorderValue(
	value: Partial<BorderProps> | undefined,
): BorderProps {
	return {
		borderWidth: normalizeOptionalLength(
			value?.borderWidth,
			BORDER_WIDTH_UNITS,
			"px",
		),
		borderRadius: normalizeOptionalLength(
			value?.borderRadius,
			BORDER_RADIUS_UNITS,
			"px",
		),
		borderColor: value?.borderColor,
	}
}

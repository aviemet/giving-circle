import { type BorderProps } from "./style"

export function defaultBorderValue(): BorderProps {
	return {}
}

export function normalizeBorderValue(
	value: Partial<BorderProps> | undefined,
	legacy?: BorderProps,
): BorderProps {
	return {
		borderWidth: value?.borderWidth ?? legacy?.borderWidth,
		borderRadius: value?.borderRadius ?? legacy?.borderRadius,
		borderColor: value?.borderColor ?? legacy?.borderColor,
	}
}

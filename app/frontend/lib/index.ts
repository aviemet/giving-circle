export * as Routes from "./routes"
export * as formatter from "./formatters"
export { i18n } from "./i18n"

export * from "./uuid"
export * from "./strings"
export * from "./dates"
export * from "./collections"
export * from "./forms"
export * from "./theme"
export * from "./units"
export * from "./withLayout"

export * from "./mergeRefs"

export { rem } from "@mantine/core"

export const polymorphicRoute = (model: string, param: string | number) => {
	// @ts-ignore
	return Routes[camelize(model)](param)
}

export const isDevelopment = () => process.env.NODE_ENV && process.env.NODE_ENV === "development"

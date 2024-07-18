export * as Routes from '@/types/routes'
export * as formatter from './formatters'

export * from './uuid'
export * from './strings'
export * from './collections'
export * from './forms'
export * from './theme'
export * from './units'

export {
	rem,
	px,
} from '@mantine/core'

export const polymorphicRoute = (model: string, param: string|number) => {
	// @ts-ignore
	return Routes[camelize(model)](param)
}

export const isDevelopment = () => process.env.NODE_ENV && process.env.NODE_ENV === 'development'

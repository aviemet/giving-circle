import { type Config } from "@puckeditor/core"

export function mergePuckConfig<Base extends Config, Override extends Config>(
	base: Base,
	override: Override,
): Override {
	return {
		...base,
		...override,
		root: override.root ?? base.root,
		components: {
			...base.components,
			...override.components,
		},
		categories: override.categories ?? base.categories,
	}
}

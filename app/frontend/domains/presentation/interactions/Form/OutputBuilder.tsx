import { type InteractionFieldConfig, type InteractionFieldType } from "./FieldBuilder"

export type InteractionOutputConfig = {
	metric: string
	source_field: string
	reducer: string
}

const REDUCER_FIELD_TYPES: Record<string, InteractionFieldType[]> = {
	sum_by_org: ["org_money_map"],
	count_by_value: ["org_reference", "single_select"],
	sum_money: ["money"],
	rank_aggregate: ["org_ranked_list"],
}

export function compatibleReducers(fieldType: InteractionFieldType, reducers: string[]): string[] {
	return reducers.filter((reducer) => REDUCER_FIELD_TYPES[reducer]?.includes(fieldType))
}

export function outputSourceFields(fields: InteractionFieldConfig[]): InteractionFieldConfig[] {
	const sources: InteractionFieldConfig[] = []

	fields.forEach((field) => {
		if(field.type === "field_group") {
			if(field.fields) {
				sources.push(...outputSourceFields(field.fields))
			}
			return
		}

		if(field.key.trim() !== "") {
			sources.push(field)
		}
	})

	return sources
}

export function sanitizeOutput(
	output: InteractionOutputConfig,
	sourceFields: InteractionFieldConfig[],
	reducers: string[],
): InteractionOutputConfig {
	const field = sourceFields.find((entry) => entry.key === output.source_field)
	if(!field) {
		return { ...output, reducer: "" }
	}

	const availableReducers = compatibleReducers(field.type, reducers)
	if(!availableReducers.includes(output.reducer)) {
		return { ...output, reducer: availableReducers[0] ?? "" }
	}

	return output
}

export function sanitizeOutputs(
	outputs: InteractionOutputConfig[],
	fields: InteractionFieldConfig[],
	reducers: string[],
): InteractionOutputConfig[] {
	const sourceFields = outputSourceFields(fields)
	return outputs.map((output) => sanitizeOutput(output, sourceFields, reducers))
}

export function defaultOutputForField(
	field: InteractionFieldConfig,
	reducers: string[],
	metrics: string[],
): InteractionOutputConfig {
	const availableReducers = compatibleReducers(field.type, reducers)

	return {
		metric: metrics[0] ?? "allocated_totals",
		source_field: field.key,
		reducer: availableReducers[0] ?? "",
	}
}

export function rewriteOutputSourceFields(
	outputs: InteractionOutputConfig[],
	previousKey: string,
	nextKey: string,
): InteractionOutputConfig[] {
	if(previousKey === nextKey) return outputs
	if(previousKey.trim() === "") return outputs

	return outputs.map((output) => {
		if(output.source_field !== previousKey) return output
		return { ...output, source_field: nextKey }
	})
}

import { type FormComponentSlotProps, type FormDataConvertible } from "@inertiajs/core"

export type SubmitWith<T = Record<string, FormDataConvertible>> = (data: T) => Promise<unknown>

export type NormalizeSubmitError = (error: unknown) => Record<string, string>

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function stringErrorsFrom(value: unknown): Record<string, string> | undefined {
	if(!isRecord(value)) {
		return undefined
	}

	const errors: Record<string, string> = {}
	for(const [key, entry] of Object.entries(value)) {
		if(typeof entry === "string") {
			errors[key] = entry
		}
	}

	if(Object.keys(errors).length === 0) {
		return undefined
	}

	return errors
}

export function defaultNormalizeSubmitError(error: unknown): Record<string, string> {
	if(!isRecord(error)) {
		return {}
	}

	const response = error.response
	if(isRecord(response)) {
		const data = response.data
		if(isRecord(data)) {
			const fromResponse = stringErrorsFrom(data.errors)
			if(fromResponse !== undefined) {
				return fromResponse
			}
		}
	}

	const fromError = stringErrorsFrom(error.errors)
	if(fromError !== undefined) {
		return fromError
	}

	return {}
}

export function runSubmitWithIntercept(
	data: Record<string, FormDataConvertible>,
	submitWith: SubmitWith<Record<string, FormDataConvertible>>,
	setSlotProps: (props: FormComponentSlotProps | null) => void,
	normalizeSubmitError: NormalizeSubmitError,
	live: FormComponentSlotProps | null,
) {
	if(live !== null) {
		setSlotProps({ ...live, processing: true, errors: {}, hasErrors: false })
	}

	submitWith(data)
		.then(() => {
			if(live === null) {
				return
			}
			setSlotProps({
				...live,
				processing: false,
				wasSuccessful: true,
				recentlySuccessful: true,
				errors: {},
				hasErrors: false,
			})
		})
		.catch((caughtError: unknown) => {
			if(live === null) {
				return
			}
			const errors = normalizeSubmitError(caughtError)
			setSlotProps({
				...live,
				processing: false,
				errors,
				hasErrors: Object.keys(errors).length > 0,
			})
		})
}

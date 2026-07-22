export interface PresentationValuesAllocatedTotal {
	org_id: string
	allocated_cents: number
	currency: string
}

export interface PresentationValuesPayload {
	allocated_totals: PresentationValuesAllocatedTotal[]
}

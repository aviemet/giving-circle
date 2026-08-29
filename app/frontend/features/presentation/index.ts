export {
	isFullyFunded,
	fundedPercent,
	remainingNeed,
} from "./values/allocatedTotals"
export {
	isFinalistOrgId,
	useFinalistOrgIds,
} from "./values/finalists"
export {
	PresentationDataProvider,
	usePresentationDataContext,
	type PresentationDataContextValue,
	type PresentationDataPresentation,
	type PresentationDataValue,
} from "./PresentationDataProvider"
export { ActiveSlideProvider, useActiveSlideId } from "./ActiveSlideProvider"
export {
	scanSlideElements,
	readElementControlValue,
	useTimerDurationOverrideSeconds,
} from "./elementControls"
export {
	useLeverageTotals,
	leverageFilledPercent,
	type LeverageTotals,
} from "./values/leverageTotals"
export {
	IdleState,
	MemberInteractForm,
	type ActiveInteractionProps,
	type MemberInteractFormProps,
} from "./interactions"

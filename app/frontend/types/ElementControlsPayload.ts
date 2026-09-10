export type ElementControlValue = Record<string, string | number | boolean | null>

export type ElementInstanceControls = Record<string, Record<string, ElementControlValue>>

export type SlideElementControls = Record<string, ElementInstanceControls>

export type ElementControlsPayload = Record<string, SlideElementControls>

export type { ElementControlsPayload as default }

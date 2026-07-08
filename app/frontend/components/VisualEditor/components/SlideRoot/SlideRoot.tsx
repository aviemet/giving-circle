import { type DefaultRootRenderProps } from "@measured/puck"

import { SlideRootDisplay } from "./SlideRootDisplay"
import { type SlideRootProps } from "./slideRootProps"

export function SlideRoot(props: DefaultRootRenderProps<SlideRootProps>) {
	return <SlideRootDisplay { ...props } />
}

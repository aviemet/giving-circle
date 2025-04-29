import { css } from "@linaria/core"

import { vars } from "@/lib/theme"

export const authLayout = css`
	height: 100%;

	#auth-layout-left {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: ${ vars.spacing.md };

		.mantine-Paper-root {
			height: fit-content;
		}
	}

	#auth-layout-right {
		background-color: ${ vars.colors.primaryColors.filled };
		
		@media(max-width: ${ vars.breakpoints.md }) {
			display: none;
		}
	}
`

export const bottomLinks = css`
	justify-content: space-around;
`

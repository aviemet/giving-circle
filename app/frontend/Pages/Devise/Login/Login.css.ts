import { vars } from '@/lib/theme'
import { css } from '@linaria/core'

export const authLayout = css`
	height: 100%;

	#auth-layout-left {
		display: flex;
		justify-content: center;
		align-items: center;

		.mantine-Paper-root {
			flex: 0.75;
			height: fit-content;
		}
	}

	#auth-layout-right {
		background-color: ${vars.colors.primaryColors.filled};
		
		@media(max-width: ${vars.breakpoints.md}) {
			display: none;
		}
	}
`

export const bottomLinks = css`
	justify-content: space-around;
`

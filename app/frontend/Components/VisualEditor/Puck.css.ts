import { vars, theme } from '@/lib'
import { css } from '@linaria/core'

export const puckRoot = css`
	--puck-font-family: inherit;
	--puck-color-white: ${vars.colors.white};

	position: relative;
	height: calc(100dvh - ${theme.other.header.height}px - ${theme.other.footer.height}px);

	& .Puck {
		--puck-space-px: ${vars.spacing.sm};

		& > div {
			--puck-space-px: ${vars.spacing.sm};
			position: unset;

			/* Left sidebar is hidden */
			&:not([class*="PuckLayout--leftSideBarVisible"]) {
				[class*="PuckLayout-leftSideBar"]:not([class*="Toggle"]) {
					display: none;
				}
			}

			/* Right sidebar is hidden */
			&:not([class*="PuckLayout--rightSideBarVisible"]) {
				[class*="PuckLayout-rightSideBar"]:not([class*="Toggle"]) {
					display: none;
				}
			}
		}

		input, select {
			color: ${vars.colors.black};
		}
	} 

	& [class*="PuckLayout-inner"] {
		height: calc(100dvh - ${theme.other.header.height}px - ${theme.other.footer.height}px);
	}
`

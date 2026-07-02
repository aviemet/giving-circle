import { css } from "@linaria/core"

export const ORG_ITERATOR_ITEM_MIN_WIDTH = 120
export const ORG_ITERATOR_ITEM_MIN_HEIGHT = 120

export const orgIteratorItem = css`
  --org-iterator-item-min-width: ${ ORG_ITERATOR_ITEM_MIN_WIDTH };
  --org-iterator-item-min-height: ${ ORG_ITERATOR_ITEM_MIN_HEIGHT };

	flex: 0 1 auto;
	min-width: var(--org-iterator-item-min-width)px;
	min-height: var(--org-iterator-item-min-height)px;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	& > div {
		width: 100%;
		min-height: 100%;
		flex: 1 1 auto;
	}
`

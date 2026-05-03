import { type SlideData } from "@/types/SlideData"

export function createCirclePersisted(overrides?: Partial<Schema.CirclesPersisted>): Schema.CirclesPersisted {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		...overrides,
	}
}

export function createThemePersisted(overrides?: Partial<Schema.ThemesPersisted>): Schema.ThemesPersisted {
	return {
		id: "theme-1",
		name: "Theme 1",
		slug: "theme-1",
		status: "current",
		...overrides,
	}
}

export function createThemeInertiaShare(overrides?: Partial<Schema.ThemesInertiaShare>): Schema.ThemesInertiaShare {
	return {
		id: "theme-1",
		name: "Theme 1",
		slug: "theme-1",
		status: "current",
		...overrides,
	}
}

export function createCircleInertiaShare(overrides?: Partial<Schema.CirclesInertiaShare>): Schema.CirclesInertiaShare {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		themes: [createThemeInertiaShare()],
		...overrides,
	}
}

export function createMembershipPersisted(overrides?: Partial<Schema.MembershipsPersisted>): Schema.MembershipsPersisted {
	return {
		id: "membership-1",
		active: true,
		funds: { amount: 10, cents: 1000, currency_iso: "USD" },
		name: "Member 1",
		slug: "membership-1",
		number: "1",
		...overrides,
	}
}

export function createCircleShow(overrides?: Partial<Schema.CirclesShow>): Schema.CirclesShow {
	return {
		id: "circle-1",
		name: "Circle 1",
		slug: "circle-1",
		themes: [createThemePersisted()],
		memberships: [createMembershipPersisted()],
		...overrides,
	}
}

export function createOrgPersisted(overrides?: Partial<Schema.OrgsPersisted>): Schema.OrgsPersisted {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		...overrides,
	}
}

export function createSlideData(overrides?: Partial<SlideData>): SlideData {
	return {
		content: [],
		root: {
			type: "root",
			props: {},
		},
		...overrides,
	}
}

export function createSlidePresentation(overrides?: Partial<Schema.SlidesPresentation>): Schema.SlidesPresentation {
	return {
		id: "slide-1",
		slug: "slide-1",
		title: "Slide 1",
		data: createSlideData(),
		...overrides,
	}
}

export function createPresentationPresentation(overrides?: Partial<Schema.PresentationsPresentation>): Schema.PresentationsPresentation {
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		slug: "presentation-1",
		theme_id: "theme-1",
		orgs: [createOrgPersisted()],
		slides: [createSlidePresentation()],
		active_slide_id: "slide-1",
		...overrides,
	}
}

export function createTemplatePersisted(overrides?: Partial<Schema.TemplatesPersisted>): Schema.TemplatesPersisted {
	return {
		id: "template-1",
		slug: "template-1",
		name: "Template 1",
		settings: {},
		circle: createCirclePersisted(),
		...overrides,
	}
}

export function createPresentationElementPersisted(overrides?: Partial<Schema.PresentationElementsPersisted>): Schema.PresentationElementsPersisted {
	return {
		id: "element-1",
		name: "Element 1",
		slug: "element-1",
		template: false,
		data: {},
		...overrides,
	}
}

export function createUserPersisted(overrides?: Partial<Schema.UsersPersisted>): Schema.UsersPersisted {
	return {
		id: "user-1",
		active: true,
		email: "user@example.com",
		slug: "user-1",
		person_id: undefined,
		...overrides,
	}
}

export function createPagination(overrides?: Partial<Schema.Pagination>): Schema.Pagination {
	return {
		count: 0,
		pages: 1,
		limit: 25,
		current_page: 1,
		next_page: 1,
		prev_page: 1,
		is_first_page: true,
		is_last_page: true,
		...overrides,
	}
}

export function createMembershipsIndex(overrides?: Partial<Schema.MembershipsIndex>): Schema.MembershipsIndex {
	return {
		id: "membership-1",
		active: true,
		funds: { amount: 0, cents: 0, currency_iso: "USD" },
		name: "Member 1",
		slug: "membership-1",
		person: {
			id: "person-1",
			active: true,
			name: "Person One",
			slug: "person-1",
		},
		...overrides,
	}
}

export function createOrgsIndex(overrides?: Partial<Schema.OrgsIndex>): Schema.OrgsIndex {
	return {
		id: "org-1",
		name: "Org 1",
		slug: "org-1",
		...overrides,
	}
}

export function createThemesShow(overrides?: Partial<Schema.ThemesShow>): Schema.ThemesShow {
	return {
		id: "theme-1",
		name: "Theme 1",
		slug: "theme-1",
		status: "current",
		circle: createCirclePersisted(),
		orgs: [],
		...overrides,
	}
}

export function createPresentationsIndex(overrides?: Partial<Schema.PresentationsIndex>): Schema.PresentationsIndex {
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		slug: "presentation-1",
		theme_id: "theme-1",
		theme: createThemesShow(),
		...overrides,
	}
}

export function createSlidesIndex(overrides?: Partial<Schema.SlidesIndex>): Schema.SlidesIndex {
	return {
		id: "slide-1",
		slug: "slide-1",
		data: createSlideData(),
		title: "Slide 1",
		...overrides,
	}
}

export function createPresentationsEdit(overrides?: Partial<Schema.PresentationsEdit>): Schema.PresentationsEdit {
	const slide = createSlidePresentation()
	const slideEdit: Schema.SlidesEdit = {
		id: slide.id,
		slug: slide.slug,
		data: slide.data,
		title: slide.title,
	}
	return {
		id: "presentation-1",
		active: true,
		name: "Presentation 1",
		slug: "presentation-1",
		theme_id: "theme-1",
		slides: [slideEdit],
		...overrides,
	}
}


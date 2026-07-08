const CIRCLE_RESOURCE_TYPE = "Circle"

function userIsSuperAdmin(roles: Schema.Role[]) {
	return roles.some((role) => role.name === "super_admin" && !role.resource_id)
}

function userIsCircleAdmin(roles: Schema.Role[], circleId: string) {
	return roles.some((role) => (
		role.name === "admin" &&
		role.resource_type === CIRCLE_RESOURCE_TYPE &&
		role.resource_id === circleId
	))
}

export function administrableCircles(
	roles: Schema.Role[],
	circles: Schema.CirclesInertiaShare[] | undefined,
) {
	if(!circles) return []

	if(userIsSuperAdmin(roles)) return circles

	return circles.filter((circle) => userIsCircleAdmin(roles, circle.id))
}

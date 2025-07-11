import { withLayout } from "@/lib"

interface AboutCircleProps {
	circle: Schema.CirclesShow
}

// @path: /:circle_slug/about
// @route: aboutCircle
const AboutCircle = ({ circle }: AboutCircleProps) => {
	return (
		<div>About { circle.name }</div>
	)
}

export default withLayout(AboutCircle, "public")

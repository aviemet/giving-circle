import { Config, PuckComponent } from "@measured/puck"

type Components = {
	HeadingBlock: {}
};

// Create Puck component config
export const config: Config<Components> = {
	components: {
		HeadingBlock: {
			fields: {
				children: {
					type: "text",
				},
			},
			render: ({ children }: PuckComponent<{}>) => {
				return <h1>{ children }</h1>
			},
		},
	},
}

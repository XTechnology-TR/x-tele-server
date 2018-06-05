// Async function for handling front-end get, post and patch calls
export default {
	async execute(path, options) {
		const route = `${path}`;
		options.headers = Object.assign(
			{
				Accept: "application/json",
				"Content-Type": "application/json",
				Pragma: "no-cache"
			},
			options.headers || {}
		);

		// Perform fetch on the endpoint
		const response = await fetch(route, options);

		// Valid response if status 200
		if (response.status === 200) {
			return;
		}

		// Throw error if any other response from server
		throw new Error(response);
	},

	perform(path, options = {}) {
		return this.execute(path, options);
	}
};

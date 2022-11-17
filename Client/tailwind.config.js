/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			height: {
				cardHeight: "28rem",
				imageHeight: "13rem",
			},
			fontSize: {
				baseMid: "0.9rem",
			},
		},
	},
};

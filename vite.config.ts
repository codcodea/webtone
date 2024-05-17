import { defineConfig } from "vite";
import solid from "vite-plugin-solid";


export default defineConfig({
	base: "/",
	root: "./src",
	server: {
		host: "0.0.0.0",
		port: 3334,
	},
	plugins: [solid()],

	build: {
		outDir: "../dist",
	},
    resolve: {
        alias: {
            "~": "/src",
        },
    },
});


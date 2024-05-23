import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

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
            "~": path.resolve(__dirname, "./src")
        },
    },
});


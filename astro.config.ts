// @ts-check

import { existsSync, readdirSync, readFileSync } from "node:fs";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/consts";

function findHttpsCerts(dir: string) {
	if (!existsSync(dir)) return null;

	const files = readdirSync(dir);
	const certFile = files.find((f) => /^localhost(\+\d+)?\.pem$/.test(f));
	const keyFile = files.find((f) => /^localhost(\+\d+)?-key\.pem$/.test(f));

	if (certFile && keyFile) {
		return {
			cert: readFileSync(`${dir}/${certFile}`),
			key: readFileSync(`${dir}/${keyFile}`),
		};
	}

	return null;
}

const httpsCerts = findHttpsCerts(".certs");
const viteServerConfig = httpsCerts ? { https: httpsCerts } : {};

// biome-ignore lint/complexity/useLiteralKeys: SENTRY_ORG is a dynamic/environment variable
const sentryOrg = process.env["SENTRY_ORG"];
// biome-ignore lint/complexity/useLiteralKeys: SENTRY_PROJECT is a dynamic/environment variable
const sentryProject = process.env["SENTRY_PROJECT"];
// biome-ignore lint/complexity/useLiteralKeys: SENTRY_AUTH_TOKEN is a dynamic/environment variable
const sentryAuthToken = process.env["SENTRY_AUTH_TOKEN"];
const hasSentryConfig = !!(sentryOrg && sentryProject && sentryAuthToken);

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: "static",
	integrations: [
		...(hasSentryConfig
			? [
					sentry({
						org: sentryOrg,
						project: sentryProject,
						authToken: sentryAuthToken,
						tracesSampleRate: 1.0,
						replaysSessionSampleRate: 0.1,
						replaysOnErrorSampleRate: 1.0,
						enableLogs: true,
					}),
				]
			: []),
	],
	vite: {
		// https://github.com/withastro/astro/issues/14030
		// @ts-expect-error
		plugins: [tailwindcss()],
		server: viteServerConfig,
	},
	experimental: {
		csp: {
			directives: [
				"default-src 'self'",
				"base-uri 'self'",
				"connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
				"font-src 'self'",
				"form-action 'self'",
				"frame-ancestors 'self'",
				"frame-src 'none'",
				"img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
				"manifest-src 'self'",
				"media-src 'self'",
				"object-src 'none'",
				"worker-src 'self'",
				"require-trusted-types-for 'script'",
				"trusted-types default gtag",
			],
			scriptDirective: {
				resources: ["'self'", "https://*.googletagmanager.com"],
				strictDynamic: true,
			},
		},
		// chromeDevtoolsWorkspace: true,
		// failOnPrerenderConflict: true,
		headingIdCompat: true, // Default in future
		preserveScriptOrder: true, // Default in future
		staticImportMetaEnv: true, // Default as of Astro 6.0
		// svgo: true
	},
});

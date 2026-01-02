import type { APIRoute } from "astro";
import {
	BACKGROUND_COLOR,
	SITE_DESCRIPTION,
	SITE_SHORT_TITLE,
	SITE_TITLE,
	THEME_COLOR,
} from "../consts";

const manifest = {
	short_name: SITE_SHORT_TITLE,
	name: SITE_TITLE,
	icons: [
		{
			src: "/web-app-manifest-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "/web-app-manifest-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
	start_url: ".",
	display: "standalone",
	theme_color: THEME_COLOR,
	background_color: BACKGROUND_COLOR,
	description: SITE_DESCRIPTION,
	orientation: "any",
};

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(manifest, null, "\t"), {
		headers: { "Content-Type": "application/manifest+json" },
	});
};

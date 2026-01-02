import type { APIRoute } from "astro";
import { FULL_NAME, LOCATION_CITY, SITE_URL } from "../consts";

const today = new Date();
const lastUpdate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

const humansTxt = `/* TEAM */

Me: ${FULL_NAME}.
Site: ${SITE_URL}
Location: ${LOCATION_CITY}, The Netherlands

/* THANKS */

/* SITE */

Last update: ${lastUpdate}
Standards: HTML5, CSS3
Components: Astro, Tailwind CSS, Tailwind Plus
Software: Biome, Bun, Claude Code, ESLint, Git, GitHub, markdownlint, Prettier, RealFaviconGenerator, TypeScript, Vite, Vitest, Zed
`;

export const GET: APIRoute = () => {
	return new Response(humansTxt, {
		headers: { "Content-Type": "text/plain" },
	});
};

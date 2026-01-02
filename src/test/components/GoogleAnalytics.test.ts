import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import GoogleAnalytics from "@components/GoogleAnalytics.astro";

describe("GoogleAnalytics", () => {
	it("renders without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(GoogleAnalytics);

		// In dev mode (which vitest runs in), scripts are not rendered
		// This test verifies the component can be rendered without errors
		expect(result).toBeDefined();
	});

	it("returns a defined result", async () => {
		const container = await AstroContainer.create();

		await expect(
			container.renderToString(GoogleAnalytics),
		).resolves.toBeDefined();
	});
});

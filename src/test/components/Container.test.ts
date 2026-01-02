import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Container from "@components/Container.astro";

describe("Container", () => {
	it("renders without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Container, {
			slots: { default: "Container content" },
		});

		expect(result).toBeDefined();
	});

	it("renders with custom class without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(Container, {
			props: { class: "custom-class" },
			slots: { default: "Content" },
		});

		expect(result).toBeDefined();
	});
});

import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ContainerInner from "@components/ContainerInner.astro";

describe("ContainerInner", () => {
	it("renders without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContainerInner, {
			slots: { default: "Inner content" },
		});

		expect(result).toBeDefined();
	});

	it("renders with custom class without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContainerInner, {
			props: { class: "custom-class" },
			slots: { default: "Content" },
		});

		expect(result).toBeDefined();
	});
});

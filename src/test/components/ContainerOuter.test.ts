import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import ContainerOuter from "@components/ContainerOuter.astro";

describe("ContainerOuter", () => {
	it("renders without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContainerOuter, {
			slots: { default: "Outer content" },
		});

		expect(result).toBeDefined();
	});

	it("renders with custom class without errors", async () => {
		const container = await AstroContainer.create();
		const result = await container.renderToString(ContainerOuter, {
			props: { class: "custom-class" },
			slots: { default: "Content" },
		});

		expect(result).toBeDefined();
	});
});

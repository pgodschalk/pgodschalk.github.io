import eslint from "@eslint/js";
import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import { importX } from "eslint-plugin-import-x";
import eslintPluginSecurity from "eslint-plugin-security";
import tseslint from "typescript-eslint";

const tseslintRules = [
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
].reduce((acc, config) => {
	Object.assign(acc, config.rules);
	return acc;
}, {} as Linter.RulesRecord);

export default defineConfig(
	{
		ignores: ["**/*.ts", "**/*.js", "**/*.mjs", "**/*.cjs"],
	},
	eslint.configs.recommended,
	eslintPluginSecurity.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	importX.flatConfigs.recommended as Linter.Config,
	importX.flatConfigs.typescript as Linter.Config,
	...eslintPluginAstro.configs["flat/recommended"],
	...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
	{
		files: ["**/*.astro"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			...tseslintRules,
			"import-x/no-unresolved": ["error", { ignore: ["^astro:"] }],
		},
	},
	eslintConfigPrettier,
);

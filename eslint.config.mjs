import tseslint from "typescript-eslint"
import next from "@next/eslint-plugin-next"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import js from "@eslint/js"
import spellcheck from "eslint-plugin-spellcheck"
import stylistic from "@stylistic/eslint-plugin"
import preferFunctionComponent from "eslint-plugin-react-prefer-function-component/config"
import skipWords from "./spellcheck-skip-words.mjs"

export default tseslint.config(
	{
		ignores: [".contentlayer", ".next", ".yarn"]
	},
	js.configs.recommended,
	tseslint.configs.eslintRecommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	stylistic.configs.recommended,
	preferFunctionComponent.configs.recommended,
	react.configs.flat.recommended,
	react.configs.flat["jsx-runtime"],
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.amd,
				...globals.node
			},

			parser: tsParser,
			ecmaVersion: 5,
			sourceType: "commonjs",
			parserOptions: {
				project: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			"@next/next": next,
			react,
			spellcheck
		},
		settings: {
			react: {
				version: "detect"
			}
		},
		rules: {
			...next.configs["core-web-vitals"].rules,
			"spaced-comment": ["error", "always", { markers: ["/"] }],
			"no-unneeded-ternary": "error",
			"prefer-const": "error",
			"max-params": ["error", 5],
			"no-duplicate-imports": "error",
			"no-self-compare": "error",
			"no-template-curly-in-string": "error",
			"no-useless-assignment": "error",
			"no-useless-rename": "error",
			"no-nested-ternary": "error",
			"curly": "error",
			"default-case-last": "error",
			"default-param-last": "error",
			"eqeqeq": "error",
			"prefer-template": "error",
			"react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
			"react/jsx-fragments": ["error", "syntax"],
			"react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
			"react/jsx-newline": ["error", { prevent: true }],
			"react/self-closing-comp": "error",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			],
			"spellcheck/spell-checker": [
				"error",
				{
					lang: "en_AU",
					minLength: 4,
					skipIfMatch: [
						// Ordinals, m (meters) and CSS (vw, vh)
						"(?<=[0-9])(?:st|nd|rd|th|m|vw|vh)"
					],
					skipWords
				}
			],
			// contentlayer's typing makes it hard to use these rules
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-non-null-assertion": "off"
		}
	}
)

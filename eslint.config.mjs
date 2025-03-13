import typescriptEslint from "@typescript-eslint/eslint-plugin"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import spellcheck from "eslint-plugin-spellcheck"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname
})

const config = [
	{
		ignores: [".contentlayer", ".next", ".yarn"]
	},
	js.configs.recommended,
	...compat.extends(
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended",
		"next",
		"next/core-web-vitals"
	),
	{
		plugins: {
			"@typescript-eslint": typescriptEslint,
			"spellcheck": spellcheck
		},

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
				tsconfigRootDir: __dirname
			}
		},

		rules: {
			"prettier/prettier": "error",
			"react/react-in-jsx-scope": "off",
			"jsx-a11y/anchor-is-valid": [
				"error",
				{
					components: ["Link"],
					specialLink: ["hrefLeft", "hrefRight"],
					aspects: ["invalidHref", "preferButton"]
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
					skipWords: [
						"lang",
						"gray",
						"blog",
						"blogs",
						"lastmod",
						"grotesk",
						"center",
						"uppercase",
						"nowrap",
						"whitespace",
						"repo",
						"extrabold",
						"inline",
						"linkedin",
						"bluesky",
						"mailto",
						"href",
						"noopener",
						"noreferrer",
						"instagram",
						"youtube",
						"facebook",
						"color",
						"evenodd",
						"algolia",
						"kbar",
						"dialog",
						"semibold",
						"sitemap",
						"colors",
						"favicon",
						"favicons",
						"latin",
						"google",
						"webmanifest",
						"msapplication",
						"calc",
						"antialiased",
						"spellcheck"
					]
				}
			]
		}
	}
]

export default config

import { writeFileSync, mkdirSync } from "fs"
import path from "path"
import { slug } from "github-slugger"
import { escape as escapeHtml } from "pliny/utils/htmlEscaper.js"
import siteMetadata from "../data/siteMetadata.js"
import tagData from "../app/tag-data.json" with { type: "json" }
import { allBlogs } from "../.contentlayer/generated/index.mjs"
import { sortPosts } from "pliny/utils/contentlayer.js"

const outputFolder = process.env.EXPORT ? "out" : "public"
const page = "feed.xml"

/**
 * @param {import("pliny/config").PlinyConfig} config
 * @param {import("contentlayer/generated").Blog} post
 */
const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escapeHtml(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escapeHtml(post.summary)}</description>` : ""}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags.map((t) => `<category>${t}</category>`).join("")}
  </item>
`

/**
 * Generates a full RSS feed
 * @param {import("pliny/config").PlinyConfig} config
 * @param {import("contentlayer/generated").Blog[]} posts
 */
const generateRss = (config, posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escapeHtml(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escapeHtml(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join("")}
    </channel>
  </rss>
`

/**
 * Generates RSS files for posts and tag feeds
 * @param {import("pliny/config").PlinyConfig} config
 * @param {import("contentlayer/generated").Blog[]} allBlogs
 */
function generateRSS(config, allBlogs) {
	const publishPosts = allBlogs.filter((post) => post.draft !== true)
	// RSS for blog post
	if (publishPosts.length > 0) {
		const rss = generateRss(config, sortPosts(publishPosts))
		writeFileSync(`./${outputFolder}/${page}`, rss)
	}

	if (publishPosts.length > 0) {
		for (const tag of Object.keys(tagData)) {
			const filteredPosts = allBlogs.filter((post) => post.tags.map((t) => slug(t)).includes(tag))
			const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
			const rssPath = path.join(outputFolder, "tags", tag)
			mkdirSync(rssPath, { recursive: true })
			writeFileSync(path.join(rssPath, page), rss)
		}
	}
}

const rss = () => {
	generateRSS(siteMetadata, allBlogs)
	console.log("RSS feed generated...")
}

export default rss

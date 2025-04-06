/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
	title: "Finn Nannestad",
	author: "Finn Nannestad",
	headerTitle: "Finn Nannestad",
	description: "Finn's blog",
	language: "en-au",
	theme: "system", // system, dark or light
	siteUrl: "https://finnnannestad.com",
	siteRepo: "https://github.com/fnannestad/finnnannestad",
	socialBanner: `${process.env.BASE_PATH ?? ""}/static/images/twitter-card.png`,
	// mastodon: 'https://mastodon.social/@mastodonuser',
	// email: 'address@yoursite.com',
	github: "https://github.com/fnannestad",
	// x: 'https://twitter.com/x',
	// twitter: 'https://twitter.com/Twitter',
	// facebook: 'https://facebook.com',
	// youtube: 'https://youtube.com',
	linkedin: "https://www.linkedin.com/in/finn-nannestad/",
	// threads: 'https://www.threads.net',
	instagram: "https://www.instagram.com/finn.bouldering/",
	// medium: 'https://medium.com',
	// bluesky: 'https://bsky.app/',
	goodReads: "https://goodreads.com/finnnannestad",
	locale: "en-AU",
	// set to true if you want a navbar fixed to the top
	stickyNav: false,
	search: {
		provider: "kbar", // kbar or algolia
		kbarConfig: {
			searchDocumentsPath: `${process.env.BASE_PATH ?? ""}/search.json` // path to load documents to search
		}
		// provider: 'algolia',
		// algoliaConfig: {
		//   // The application ID provided by Algolia
		//   appId: 'R2IYF7ETH7',
		//   // Public API key: it is safe to commit it
		// eslint-disable-next-line spellcheck/spell-checker
		//   apiKey: '599cec31baffa4868cae4e79f180729b',
		//   indexName: 'docsearch',
		// },
	}
}

module.exports = siteMetadata

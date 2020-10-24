const config = {
  gatsby: {
    pathPrefix: '',
    siteUrl: 'https://yoma.dev/',
    titlePrefix: '',
    titleSuffix: '',
  },
  redirects: [],
  header: {
    logoLink: 'https://yoma.dev/',
    title: 'Yoma',
    search: {
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.GATSBY_ALGOLIA_ADMIN_API_KEY,
    },
  },
  siteMetadata: {
    title: 'Yoma - title',
    description: 'Yoma - desc',
    keywords: 'Docs, yoma, 1.0',
    docsLocation: 'https://github.com/yomajs/yoma/tree/main/website/content',
    twitter: {
      site: '@yomajs',
      creator: '@yomajs',
      image: '/social/missing.png',
    },
    og: {
      site_name: 'Yoma',
      type: 'website',
      image: {
        alt: 'Yoma Framework',
        height: '630',
        type: 'image/png',
        url: '/social/missing.png', //replace social image
        width: '1200',
      },
    },
  },
  sidebar: {
    tablet_menu_split: [], // Slugs for top level folders which should appear in right pane on tablet
  },
  footer: {
    logoLink: '/',
    title: 'Yoma',
    community: [
      { name: 'GitHub', link: 'https://github.com/yoma' },
    ],
    resources: [
      { name: 'Docs', link: '/' },

      { name: 'Tutorial', link: '/getting-started/tutorial/chapter-introduction' },

      { name: 'How to GraphQL', link: 'https://www.howtographql.com/' },
    ],
    findus: {
      twitterLink: 'https://twitter.com/yomajs',
      gitLink: 'https://github.com/yoma/',
      slackLink: '',
      fbLink: '',
      youtubeLink: '',
    },
    newsletter: {
      text: '',
    },
  },
}

module.exports = config

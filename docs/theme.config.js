export default {
  repository: 'https://github.com/yomajs/yoma', // project repo
  docsRepository: 'https://github.com/yomajs/yoma', // docs repo
  branch: 'master', // branch of docs
  path: '/docs', // path of docs
  titleSuffix: ' | Yoma Docs',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: 'Made with ❤️',
  footerEditOnGitHubLink: true, // will link to the docs repo
  logo: <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: 49}}>
    <img src='/Logo.svg' alt='yoma logo' width="40" height="40" style={{marginRight: 10}} />
    <span>Yoma Docs</span>
  </div>,
  head: <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Nextra: the next docs builder" />
    <meta name="og:title" content="Nextra: the next docs builder" />
  </>
}
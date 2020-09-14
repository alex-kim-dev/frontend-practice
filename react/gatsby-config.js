module.exports = {
  siteMetadata: {},
  pathPrefix: '/frontend-practice',
  plugins: [
    { resolve: 'gatsby-plugin-react-helmet' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'fem',
    //     path: `${__dirname}/src/fem`,
    //   },
    // },
    { resolve: 'gatsby-transformer-sharp' },
    { resolve: 'gatsby-plugin-sharp' },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-linting',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    // this optional plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // { resolve: 'gatsby-plugin-offline' },
  ],
};

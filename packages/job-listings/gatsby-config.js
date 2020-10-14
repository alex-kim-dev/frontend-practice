const sass = require('sass');
const siteMetadata = require('site-settings');

module.exports = {
  siteMetadata,
  pathPrefix: siteMetadata.baseurl,

  plugins: [
    { resolve: 'gatsby-plugin-react-helmet' },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    { resolve: 'gatsby-transformer-sharp' },
    { resolve: 'gatsby-plugin-sharp' },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Job listings with filtering',
        short_name: 'job-listings',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
        precision: 4,
        useResolveUrlLoader: true,
      },
    },
    // this optional plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // { resolve: 'gatsby-plugin-offline' },
  ],
};

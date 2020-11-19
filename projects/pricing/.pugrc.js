const siteSettings = require('@frontend/site-meta');
const content = require('./src/content.json');

module.exports = {
  locals: {
    site: siteSettings,
    content,
  },
};

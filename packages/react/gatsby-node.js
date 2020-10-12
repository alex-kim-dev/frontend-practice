exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "fem" }
            relativePath: { glob: "*/*/pages/**/*.{js,jsx}" }
          }
        ) {
          edges {
            node {
              absolutePath
              relativeDirectory
              name
            }
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allFile.edges.forEach(({ node }) => {
    const { absolutePath, relativeDirectory, name } = node;
    const [, level, pageDir] = relativeDirectory.match(/^([^/]+)(.*)$/);
    const pathEnding = /index/i.test(name) ? '' : `/${name.toLowerCase()}`;
    const pagePath = pageDir.replace('/pages', '').concat(pathEnding);

    createPage({
      path: pagePath,
      component: absolutePath,
      context: { pagePath, source: 'fem', level },
    });
  });
};

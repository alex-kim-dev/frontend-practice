exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "fem" }
            relativePath: { glob: "*/*/**/index.js" }
          }
        ) {
          edges {
            node {
              absolutePath
              relativeDirectory
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
    const { absolutePath, relativeDirectory } = node;
    const [, level, pagePath] = relativeDirectory.match(/^([^/]+)(.*)$/);

    createPage({
      path: pagePath,
      component: absolutePath,
      context: { pagePath, source: 'fem', level },
    });
  });
};

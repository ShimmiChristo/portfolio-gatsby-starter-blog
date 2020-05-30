const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blog = "blog";
  const website = "website";

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const result = await graphql(
    `
      {
        ${blog}: allMarkdownRemark(
          filter: { frontmatter: { category: { eq: "${blog}" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
        ${website}: allMarkdownRemark(
          filter: { frontmatter: { category: { eq: "${website}" } } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const blogPosts = result.data[`${blog}`].edges;
  const websitePosts = result.data[`${website}`].edges;

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node;
    const next = index === 0 ? null : blogPosts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
  websitePosts.forEach((post, index) => {
    const previous =
      index === websitePosts.length - 1 ? null : websitePosts[index + 1].node;
    const next = index === 0 ? null : websitePosts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  const blog = "blog";
  const website = "website";

  if (
    node.internal.type === `MarkdownRemark` &&
    node.frontmatter.category === `${blog}`
  ) {
    // const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `/${blog}${createFilePath({
        node,
        getNode,
        basePath: `${blog}/`,
        trailingSlash: false,
      })}`,
    });
  } else if (
    node.internal.type === `MarkdownRemark` &&
    node.frontmatter.category === `${website}`
  ) {
    // const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `/${website}${createFilePath({
        node,
        getNode,
        basePath: `${website}/`,
        trailingSlash: false,
      })}`,
    });
  } else if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      name: `slug`,
      node,
      value: `${createFilePath({ node, getNode, trailingSlash: false })}`,
    });
  }
};

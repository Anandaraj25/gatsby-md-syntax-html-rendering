const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem');
const { createBlogs } = require('./src/blog-components/blog');
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    if (node.internal.content) {
        node.internal.content = createBlogs(node.internal.content);
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/md-template.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

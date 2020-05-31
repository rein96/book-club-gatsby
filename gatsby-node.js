/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path') 

exports.createPages = ({ graphql, actions }) => {
    console.log("exports.createPages -> actions", actions)
    const { createPage } = actions;

    const bookTemplate = path.resolve('src/templates/bookTemplate.js');

    return graphql(`
    {
        allBook {
          edges {
            node {
              summary
              title
              id
              author {
                name
              }
            }
          }
        }
      }
    `)
    .then((result) => {

        if(result.errors) throw result.errors;

        result.data.allBook.edges.forEach(({node}) => {
            // Action
            createPage({
                path:`/book/${node.id}`,
                component: bookTemplate,
                context: node
            })
        });

    })
}

exports.onCreateWebpackConfig = ({actions}) => {
    actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        }
    })
}
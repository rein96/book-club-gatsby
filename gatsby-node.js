/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path') 

exports.createPages = ({ graphql, actions }) => {
    console.log("exports.createPages -> actions", actions)
    const { createPage } = actions;

    const BookTemplate = path.resolve('src/templates/BookTemplate.js');

    // to solve Invalid prop 'fixed' supplied to 'Image', node cannot process ...GatsbyImageSharpFixed
    // so we only pass ID here
    return graphql(`
    {
        allBook {
          edges {
            node {
              id
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
                component: BookTemplate,
                context: {
                  bookId: node.id
                }
            })
        });

    })
}

// exports.onCreateWebpackConfig = ({actions}) => {
//     actions.setWebpackConfig({
//         resolve: {
//             modules: [path.resolve(__dirname, 'src'), 'node_modules'],
//         }
//     })
// }
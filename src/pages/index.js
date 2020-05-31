import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "components/layout"
import Image from "components/image"
import SEO from "components/seo"


const IndexPage = (props) => {
  console.log("IndexPage -> props", props)

  let allBookEdges = props.data.allBook.edges

  return (
    <Layout>
      {
        allBookEdges.map(({ node }) => (
          <div key={node.id}>
            <h2>
              {node.title} - <small>{node.author.name}</small>
            </h2>
            <div>
              {node.summary}
            </div>
            <Link Link to={`book/${node.id}`}>
              Join Conversation
            </Link>
          </div>
        ))
      }

      {/* <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}
    </Layout >
  )
}

export const query = graphql`
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
`;

export default IndexPage

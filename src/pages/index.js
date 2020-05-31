import React from "react"
import { Link, graphql } from "gatsby"

import BookItem from '../components/BookItem';
import styled from 'styled-components';

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"


const IndexPage = (props) => {

  let allBookEdges = props.data.allBook.edges
  console.log("IndexPage -> allBookEdges", allBookEdges)

  return (
    <Layout>
      {
        allBookEdges.map(({ node }) => (
          <div key={node.id}>
            <BookItem
              bookCover={node.localImage.publicURL}
              // bookCover={node.imageUrl}
              authorName={node.author.name}
              bookSummary={node.summary}
              bookTitle={node.title}
            >

              <LinkButton>
                <Link Link to={`book/${node.id}`}>
                  Join Conversation
                </Link>
              </LinkButton>
            </BookItem>

          </div>
        ))
      }
    </Layout >
  )
}

const LinkButton = styled.div`
  text-align: right;
  
  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    
    &:hover{
      background: indigo;
    }
  }
`

// imageUrl replaced -> localImage (static asset)
export const query = graphql`
{
  allBook {
    edges {
      node {
        summary
        title
        id
        localImage {
          publicURL
        }
        imageUrl
        author {
          name
        }
      }
    }
  }
}
`;

export default IndexPage

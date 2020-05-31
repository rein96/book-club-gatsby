import React from 'react'
import Layout from '../components/layout'
import BookItem from '../components/BookItem';
import {graphql} from 'gatsby'

function BookTemplate(props) {
    // OUTDATED
    // props has pageContext = state context from gatsby-node.js 
    // const { pageContext } = props;

    // props have context: bookId
    // now we access props.data from query based on with bookId
    const { data } = props
    console.log("BookTemplate -> data", data)

    return (
        <Layout>
            <BookItem
                bookCover={data.book.localImage.childImageSharp.fixed}
                authorName={data.book.author.name}
                bookSummary={data.book.summary}
                bookTitle={data.book.title} />
        </Layout>
    )
}

// because we refactor context to bookid from gatsby-node.js
// we need to include graphql here to access all field based on the id
// bookId from context gatsby-node
// ! = required | $ = variable
export const query = graphql`
    query hehe($bookId: String!) {
        book(id: {eq: $bookId}){
            summary
            title
            id
            localImage{
              childImageSharp{
                fixed(width: 200){
                  ...GatsbyImageSharpFixed
                }
              }
            }
            author {
              name
            }
            imageUrl
        }
    }
`

export default BookTemplate

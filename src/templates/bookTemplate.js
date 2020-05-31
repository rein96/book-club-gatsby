import React from 'react'
import Layout from '../components/layout'
import BookItem from '../components/BookItem';

function BookTemplate(props) {
    // props has pageContext = state context from gatsby-node.js 
    const { pageContext } = props;
    console.log("BookTemplate -> props", props)
    return (
        <Layout>
            <BookItem
                bookCover={pageContext.localImage.publicURL}
                // bookCover={pageContext.imageUrl}
                authorName={pageContext.author.name}
                bookSummary={pageContext.summary}
                bookTitle={pageContext.title} />
        </Layout>
    )
}

export default BookTemplate

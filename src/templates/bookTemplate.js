import React from 'react'
import Layout from 'components/layout'

function bookTemplate(props) {
    // props has pageContext = state context from gatsby-node.js 
    return (
        <Layout>
            A book template page
        </Layout>
    )
}

export default bookTemplate

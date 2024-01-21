import React from 'react'
import { Link, graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data

  const visualBlogInfo = (
    <div>
      <h2>Creation of Visual Blogs in MD File Rendering</h2>
      <p>
        This project utilizes regular expressions to parse the markdown files and identify blog sections.
        Based on `maxBlogsToShow`, it decides how many blogs should be rendered.
        Information inside the regex, such as image, title, and link, is utilized.
      </p>
      <p>
        The HTML structure is generated using the extracted information, replacing the blog syntax in the markdown files with the generated HTML code.
      </p>
      <p>
        Proper styling for blogs is added in the `style.css` file.
      </p>
    </div>
  );

  const clickInfo = (
    <div>
      <h4>Click a Blog to See Custom Blog Syntax</h4>
      <p>
        After clicking on any blog, you can inspect the page source or use browser developer tools to view the generated HTML code based on the custom blog syntax.
      </p>
    </div>
  );


  return (
    <div>
      
      {visualBlogInfo}
      
      <h2>List of Available Blogs:</h2>
      <ul>
        {allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields.slug} >{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
      {clickInfo}
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage

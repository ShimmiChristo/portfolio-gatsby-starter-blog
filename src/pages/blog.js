import React from "react";
import { Link, graphql } from "gatsby";
import { rhythm } from "../utils/typography";

import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;

    const Header = styled.header`
      display: flex;
      flex-direction: row;
      margin-bottom: 1em;

      > h3 {
        margin-right: 0.5em;
      }

      a::before {
        content: "";
        width: 0;
        position: absolute;
        left: 0;
        bottom: -2px;
        border-width: 0 0 2px;
        border-style: solid;
        border-color: var(--Black);
        transition: all 0.2s;
      }
      a:hover::before {
        width: 100%;
      }
    `;

    return (
      <Layout location={this.props.location}>
        <SEO title="Chris Shimmin's Blog" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <Header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </Header>
            </article>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            category
          }
        }
      }
    }
  }
`;

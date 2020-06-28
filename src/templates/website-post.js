import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

class WorkPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header style={{ marginBottom: rhythm(1) }}>
            <h1
              style={{
                marginBottom: rhythm(0.5),
              }}
            >
              {post.frontmatter.title}
            </h1>
            <h4
              class="sub-header"
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(0),
                textTransform: "capitalize",
              }}
            >
              {post.frontmatter.category} | {post.frontmatter.date}
            </h4>
            <h4
              class="sub-header"
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(0),
              }}
            >
              Technologies - {post.frontmatter.tech}
            </h4>
            <h4
              class="sub-header"
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(0),
              }}
            >
              <a
                class="purple"
                href={post.frontmatter.websiteDomain}
              >
                {post.frontmatter.websiteDomain}
              </a>
            </h4>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>{/* <Bio /> */}</footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    );
  }
}

export default WorkPostTemplate;

export const pageQuery = graphql`
  query WorkPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        description
        tech
        websiteDomain
      }
    }
  }
`;

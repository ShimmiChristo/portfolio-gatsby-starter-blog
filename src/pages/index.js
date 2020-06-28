import React from "react";
import { graphql } from "gatsby";
import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Carousel from "../components/carousel";
import "../components/global.css";


class HomeIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home Page" />
        <Bio
          heading="Chris Shimmin | New York City"
          subheading="Web Developer, YouTuber, Entrepreneur, Online Analytics-er"
        />
        <Carousel key="website" title="Websites" data={data.website.edges} />
      </Layout>
    );
  }
}

export default HomeIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    website: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "website" } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            category
            title
            description
            url {
              childImageSharp {
                fixed(width: 280) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          id
        }
      }
    }
  }
`;

import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Carousel from "../components/carousel";

const HomeIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <Carousel key="websites" title="Websites" data={data.websites.edges} />
      <Carousel key="youtube" title="YouTube" data={data.websites.edges} />
    </Layout>
  );
};

export default HomeIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    websites: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "Website" } } }
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
                fixed(width: 280, height: 200) {
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

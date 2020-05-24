import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Carousel from "../components/carousel";

const WorkPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query WorkQuery {
      site {
        siteMetadata {
          siteTitle
          author
          social {
            twitter
          }
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
  `);
  return (
    <Layout location={location} title="Work">
      <SEO title="Work Page" />
      <main>
        <p>
          I build websites using GatsbyJS, WordPress, and Shopify. I spend most
          of my time building websites, but I also create web apps, working with
          Google Analytics and Google Tag Manager.
        </p>
      </main>
      <Carousel key="websites" title="Websites" data={data.website.edges} />
      <p>
        This is a list of my most current websites. 
      </p>
    </Layout>
  )
};
export default WorkPage;
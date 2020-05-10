import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { rhythm } from "../utils/typography";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Bio from "../components/bio";

//* building a functional component
const AboutPage = ({ location, heading, subheading }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      site {
        siteMetadata {
          siteTitle
          author
          social {
            twitter
          }
        }
      }
    }
  `);
  const green = `#50fa7b`;
  const SkillsContainer = styled.section`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: ${rhythm(1)};

    @media (max-width: 767px) {
      flex-direction: column;
    }
  `;
  const Column = styled.div`
    @media (max-width: 767px) {
      &:first-child {
        border: none;
        padding-top: 0;
      }
      width: 100%;
      border-top: 2px solid ${green};
      padding: ${rhythm(0.5)};
    }
  `;
  const List = styled.ul`
    margin: 0;
  `;
  const Item = styled.li`
    padding-left: 0;
    list-style: none;
    margin-bottom: ${rhythm(0.2)};
  `;
  const AboutContainer = styled.section`
    margin: ${rhythm(1)};
  `;
  return (
    <Layout location={location} title="About Me, Skills, &amp; More">
      <SEO title="About Page" />
      <main>
        <Bio />
        <h2>Skills</h2>
        <SkillsContainer className="skills-container">
          <Column>
            <List>
              <Item>JavaScript</Item>
              <Item>GatsbyJS (React)</Item>
              <Item>CSS</Item>
              <Item>HTML</Item>
              <Item>Mobile &amp; Responsive Design</Item>
              <Item>NoSQL (MongoDB)</Item>
              <Item>AWS</Item>
            </List>
          </Column>
          <Column>
            <List>
              <Item>e-Commerce</Item>
              <Item>WordPress</Item>
              <Item>Google Analytics</Item>
              <Item>Google Tag Manager</Item>
              <Item>Site Speed Optimization</Item>
              <Item>Mac, PC, Linux</Item>
            </List>
          </Column>
          <Column>
            <List>
              <Item>Git</Item>
              <Item>Google Maps</Item>
              <Item>Facebook</Item>
              <Item>Twitter</Item>
              <Item>YouTube</Item>
            </List>
          </Column>
        </SkillsContainer>
        <h2>More About Me</h2>
        <AboutContainer>
          <p>
            I'm Chris, a web developer from New York City. I enjoy helping
            others solve their web problems. I have been a web developer since
            2016. I make videos on{" "}
            <a
              className="purple"
              target="_blank"
              href="https://youtube.com/user/shimdoggy"
            >
              YouTube
            </a>{" "}
            and I am active on{" "}
            <a
              className="green"
              target="_blank"
              href="https://twitter.com/shimmiChristo"
            >
              Twitter
            </a>
            .
          </p>
          <p>
            I'm passionate about learning new technologies. The last few years,
            I have been working in the e-commerce industry. Along with websites
            and web-apps, I have been building skills outside of development,
            such as SEO, site speed, Analytics, and Tag Manager.
          </p>
          <p>
            When I'm not working I'm spending time with Katie or running. We
            love trying all the foods New York City has to offer. 20,000+
            restaurants will keep you busy. In 2019, I ran the New York City
            marathon - I recommend adding it to your bucket list!
          </p>
        </AboutContainer>
      </main>
    </Layout>
  );
};
export default AboutPage;

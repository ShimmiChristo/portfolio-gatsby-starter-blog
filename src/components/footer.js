import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import styled from "styled-components"
import Image from "gatsby-image"

const color = {
  black: "#282a36",
  white: "#f8f8f2",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
}

const Footer = styled.footer`
  position: fixed;
  background: ${props => props.color.black};
  bottom: 0;
  left: 0;
  height: 200px;
  width: 18%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    max-width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }
`
const Navigation = styled.nav`
  padding: 10px;
  flex-direction: column;

  > a {
    font-size: 1rem
    color: #fff;
    margin: 0 0 2vw;
    display: block;
    text-decorationcolor: #fff;
    text-decoration: none;
    box-shadow: none;
    text-align: center;
  }
  @media (max-width: 768px) {
    flex-direction: row;
  }
`

const SubNav = styled(Navigation)`
  left: 0;
  flex-direction: row;
  display: inline-flex;
  text-align: center;
  width: 100%;
  text-align: center;
  justify-content: center;

  > a {
    font-size: 0.8rem;
    margin: 0 1vw;
  }
`

const Social = styled(SubNav)`
  width: 100%;
  justify-content: space-around;

  > a {
    margin: 0;
  }
`
const Span = styled.span`
  text-decoration: none;
`
const OrangeA = styled(Span)`
  color: ${props => props.color.orange};
`

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          subMenu {
            link
            name
          }
          social {
            twitter
            email
            linkedin
            github
          }
        }
      }
      twitter: file(relativePath: { eq: "sm_twitter.png" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedin: file(relativePath: { eq: "sm_linkedin.png" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      gmail: file(relativePath: { eq: "sm_gmail.png" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      github: file(relativePath: { eq: "sm_github.png" }) {
        childImageSharp {
          fixed(width: 35, height: 35) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const { social, subMenu } = data.site.siteMetadata

  return (
    <Footer color={color}>
      <Social>
        <a href={`https://twitter.com/${social.twitter}`} target="_blank">
          <Image fixed={data.twitter.childImageSharp.fixed} alt="twitter" />
        </a>
        <Link to="/about">
          <Image fixed={data.gmail.childImageSharp.fixed} alt="gmail" />
        </Link>
        <a href={`https://linkedin.com/${social.linkedin}`} target="_blank">
          <Image fixed={data.linkedin.childImageSharp.fixed} alt="linked in" />
        </a>
        <a href={`https://github.com/${social.github}`} target="_blank">
          <Image fixed={data.github.childImageSharp.fixed} alt="github" />
        </a>
      </Social>
      <SubNav>
        {subMenu.map(link => (
          <Link key={link.name} to={link.link}>
            <OrangeA color={color}>{link.name}</OrangeA>
          </Link>
        ))}
      </SubNav>
    </Footer>
  )
}

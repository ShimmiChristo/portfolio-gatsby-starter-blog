import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";


const color = {
  black: "#282a36",
  white: "#f8f8f2",
  green: "#50fa7b",
  orange: "#ffb86c",
  pink: "#ff79c6",
  purple: "#bd93f9",
};

const Container = styled.div`
  width: 200px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: relative;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.color.black};
  z-index: 1;

  * {
    text-decoration: none;
  }
  a {
    font-style: normal;
  }
  a:before {
    display: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: 150px;
    flex-direction: row;
    display: inline-flex;
    justify-content: space-around;
  }
`;
const Header = styled.h1`
  font-size: 2rem;
  color: ${props => props.color.white};
  text-transform: uppercase;
  display: inline-flex;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;
const ProfileImg = styled(Image)`
  display: none !important;

  @media (max-width: 768px) {
    height: 125px;
    width: 125px;
    min-width: 125px;
    min-height: 125px;
    border-radius: 50%;
    display: inline-flex !important;
    align-self: left;
  }
`;
const Navigation = styled.nav`
  padding: 1vw;
  flex-direction: column;

  > a {
    font-size: 1rem;
    color: #fff;
    margin: 0 10px 15px;
    display: block;
    box-shadow: none;
    text-align: center;
  }

  @media (max-width: 768px) {
    display: inline-flex;
    flex-direction: row;

    > a {
      margin: 0 10px 0;
    }
  }
`;
const GreenA = styled.span`
  color: ${props => props.color.green};
`;
const PurpleA = styled.span`
  color: ${props => props.color.purple};
`;
const PinkA = styled.span`
  color: ${props => props.color.pink};
`;
const WhiteA = styled.span`
  color: ${props => props.color.white};
`;

export default () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          siteTitle
          linkOne
          linkTwo
          linkThree
          menuLinks {
            link
            name
          }
          subMenu {
            link
            name
          }
        }
      }
      profileImage: file(relativePath: { eq: "profile-pic.jpg" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { siteTitle, linkOne, linkTwo, linkThree } = data.site.siteMetadata;

  return (
    <Container color={color}>
      <Header color={color}>
        <Link stlye="width: 100%;" to="/">
          <WhiteA color={color}>{siteTitle}</WhiteA>
        </Link>
      </Header>
      <Link stlye="width: 100%;" to="/">
        <ProfileImg fixed={data.profileImage.childImageSharp.fixed} alt="" />
      </Link>
      <Navigation color={color}>
        <Link stlye="width: 100%;" to="/about" activeClassName="active">
          <GreenA color={color}>{linkOne}</GreenA>
        </Link>
        <Link to="/work" activeClassName="active">
          <PurpleA color={color}>{linkTwo}</PurpleA>
        </Link>
        <Link to="/blog" activeClassName="active">
          <PinkA color={color}>{linkThree}</PinkA>
        </Link>
      </Navigation>
    </Container>
  );
};

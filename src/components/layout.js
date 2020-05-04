import React from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import styled from "styled-components";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;
  const LayoutContainer = styled.div`
    margin-left: 200px;
    padding: ${rhythm(2)};
    max-width: 1200px;

    @media (max-width: 768px) {
      margin: 150px auto 100px;
    }
  `;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h2
        style={{
          ...scale(1),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h2>
    );
  }
  return (
    <LayoutContainer>
      <Navigation />
      <header>{header}</header>
      <main>{children}</main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

import React from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import styled from "styled-components";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;
    const LayoutContainer = styled.div`
      margin-left: 200px;
      padding: ${rhythm(2)};
      max-width: 1200px;

      @media (max-width: 768px) {
        margin: 150px auto 100px;
        padding: ${rhythm(1)};
      }
    `;
    const Main = styled.main`
      max-width: 1000px;
    `;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            display: "none",
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
        <h1
          style={{
            ...scale(1),
            marginTop: 0,
          }}
        >
          {title}
        </h1>
      );
    }
    return (
      <LayoutContainer>
        <Navigation />
        <header>{header}</header>
        <Main>{children}</Main>
        <Footer />
      </LayoutContainer>
    );
  }
}

export default Layout;

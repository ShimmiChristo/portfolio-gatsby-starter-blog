import React from "react";
import { Link } from "gatsby";
import { rhythm, scale } from "../utils/typography";
import Image from "gatsby-image";
import styled from "styled-components";
// import "./global.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.imageCount = this.props.data.length;
    this.checkIndex = this.checkIndex.bind(this);
    this.state = {
      xVal: -900,
      index: 0,
      allowShift: true,
      active: false,
    };
    this.images = {
      count: this.imageCount,
      width: 300,
    };
  }

  componentDidUpdate() {
    if (this.state.active) {
      this.turnOffActive = setTimeout(() => {
        this.setState({ active: false, allowShift: true }, this.checkIndex);
      }, 500);
    }
  }
  componentWillMount() {
    clearTimeout(this.turnOffActive);
  }

  shiftSlide(dir) {
    this.setState({ active: true, allowShift: false });
    if (this.state.allowShift === true) {
      if (dir === 1) {
        this.next();
        this.setState({ index: this.state.index + 1 });
      } else if (dir === -1) {
        this.previous();
        this.setState({ index: this.state.index - 1 });
      }
    }
  }
  next() {
    this.setState(() => {
      return {
        xVal: this.state.xVal - this.images.width,
        index: this.state.index + 1,
      };
    });
  }
  previous() {
    this.setState({
      xVal: this.state.xVal + this.images.width,
      index: this.state.index - 1,
    });
  }
  checkIndex() {
    if (this.state.index === -1) {
      this.setState({
        xVal: -(this.images.count * this.images.width + 600),
        index: this.images.count - 1,
      });
    }

    if (this.state.index === this.images.count) {
      this.setState({ xVal: -this.images.width * 3, index: 0 });
    }
  }

  render() {
    const { title, data } = this.props;
    const first = data[0];
    const secondFirst = data[1];
    const thirdFirst = data[2];
    const last = data[data.length - 1];
    const secondLast = data[data.length - 2];
    const thirdLast = data[data.length - 3];
    
    const Item = styled.div`
      width: ${300 - 20}px;
      height: 200px;
      margin: 0 10px;
      flex-shrink: 0;

      a {
        display: initial;
      }
      a:before {
        display: none;
      }
    `;
    const CarouselBtn = styled.button`
      background: transparent;
      color: transparent;
      outline: none;
      opacity: 1;
      border: none;
      cursor: pointer;
    `;
    const NextButton = styled(CarouselBtn)`
      height: 50px;
      width: 50px;

      &:before {
        content: "";
        display: inline-block;
        border-style: solid;
        border-width: 1px 1px 0 0;
        border-color: #333;
        transform: rotate(45deg);
        width: 1.125rem;
        height: 1.125rem;
      }
    `;
    const PreviousButton = styled(CarouselBtn)`
      height: 50px;
      width: 50px;

      &:before {
        content: "";
        display: inline-block;
        border-style: solid;
        border-width: 1px 1px 0 0;
        border-color: #333;
        transform: rotate(225deg);
        width: 1.125rem;
        height: 1.125rem;
      }
    `;
    const CarouselTitle = styled.h1`
      font-size: 2em;
      margin-left: 60px;
      margin-right: 60px;
    `;
    return (
      <div className="flex flex-column" style={{ marginBottom: rhythm(1 / 4) }}>
        <CarouselTitle>{title}</CarouselTitle>
        <div className="carouselContainer">
          <PreviousButton
            onClick={() => this.shiftSlide(-1)}
            value="Previous Item"
          />
          <div className="displayWindow">
            <div
              className={`carouselList ${this.state.active ? "active" : ""} `}
              style={{
                transform: `translate3d(${this.state.xVal}px, 0px, 0px)`,
                width: `${this.images.count * this.images.width}px`,
              }}
            >
              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={thirdLast.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={secondLast.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={last.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
              {data.map(({ node }) => {
                const url = node.frontmatter.url.childImageSharp.fixed;
                const slug = node.fields.slug;
                const id = node.id;
                return (
                  <Item key={id} className="item">
                    <Link to={slug}>
                      <Image
                        style={{
                          width: `100%`,
                          height: `100%`,
                        }}
                        imgStyle={{ objectFit: "contain" }}
                        fixed={url}
                      />
                    </Link>
                  </Item>
                );
              })}

              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={first.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={secondFirst.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
              <Item className="item">
                <Image
                  style={{
                    width: `100%`,
                    height: `100%`,
                  }}
                  imgStyle={{ objectFit: "contain" }}
                  fixed={thirdFirst.node.frontmatter.url.childImageSharp.fixed}
                />
              </Item>
            </div>
          </div>
          <NextButton onClick={() => this.shiftSlide(1)} value="Next Item" />
        </div>
      </div>
    );
  }
}

export default Carousel;

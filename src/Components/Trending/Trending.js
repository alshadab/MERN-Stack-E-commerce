import React from "react";
import { Button, Card, Container, Spinner } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { ContextProvider } from "../Context/GetContext";
import Stars from "../Stars/Stars";
import "./Trending.css";
const Trending = () => {
  const { products, isLoading } = ContextProvider();
  const trendProducts = products.filter((elem) => {
    return elem.rating >= 4.6;
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 1000 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 990, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spinner animation="grow" variant="success" />
      </div>
    );
  }
  return (
    <Container>
      <div className="main-div-trend">
        <h1>Shop Our trending Items</h1>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={responsive.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          className="carousel-div"
        >
          {trendProducts.map((elem) => {
            return (
              <div className="card-bd">
                <Card style={{ width: "19rem" }}>
                  <Card.Img
                    style={{ height: "180px" }}
                    variant="top"
                    src={elem.thumbnail}
                  />
                  <Card.Body>
                    <Card.Title>{elem.category.toUpperCase()}</Card.Title>
                    <Card.Text style={{ opacity: "0.5" }}>
                      {elem.title.toUpperCase()}
                    </Card.Text>

                    <p style={{ color: "red" }}>
                      Discount: {elem.discountPercentage}%
                    </p>

                    <p>{elem.price}$ </p>
                    <Stars stars={elem.rating} />

                    <Link to="/cart">
                      <Button
                        style={{
                          backgroundColor: "#aed425",
                          border: "none",
                          color: "black",
                        }}
                      >
                        Add to cart
                      </Button>
                    </Link>
                    <Link to={`/singleProduct/${elem.id}`}>
                      <Button
                        style={{
                          backgroundColor: "#aed425",
                          border: "none",
                          color: "black",
                          marginLeft: "5px",
                        }}
                      >
                        Show Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Container>
  );
};

export default Trending;

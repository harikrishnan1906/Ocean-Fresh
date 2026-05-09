import React, { useEffect, useState } from "react";
import {
  getFavoriteProductsAPI,
  removeFromFavoriteAPI,
} from "../../services/customerService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";

function CustomerFavorite() {
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFavoriteProducts = async () => {
      try {
        const response = await getFavoriteProductsAPI();
        setFavorite(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getFavoriteProducts();
  }, []);

  const removeFromFavorite = async (fav) => {
    try {
      const id = fav._id;
      const response = await removeFromFavoriteAPI(id);
      window.location.reload();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Container fluid className="py-4 px-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">My Favorites ❤️</h4>
        </div>

        {/* Empty State */}
        {!favorite || favorite.length === 0 ? (
          <div className="text-center py-5">
            <h5>No favorite products yet</h5>
            <p className="text-muted">
              Start adding your favorite fish items 🐟
            </p>
          </div>
        ) : (
          <Row className="gx-4 gy-4">
            {favorite.map((fav) => (
              <Col key={fav._id} xs={12} sm={6} md={4} lg={3} className="p-2">
                <Card className="h-100 border-0 shadow-sm rounded-4 favorite-card">
                  {/* Image */}
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Card.Img
                      src={
                        fav.productImage
                          ? `http://localhost:5069/${fav.productImage}`
                          : "/src/assets/images/defaultImage.png"
                      }
                      style={{ height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <Card.Body className="d-flex flex-column">
                    {/* Title */}
                    <Card.Title className="fw-semibold">
                      {fav.productName}
                    </Card.Title>

                    {/* Description */}
                    <Card.Text
                      className="text-muted small"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {fav.productDescription}
                    </Card.Text>

                    {/* Price */}
                    <h5 className="text-success fw-bold">
                      ₹{fav.productPrice}
                    </h5>

                    {/* Category */}
                    <div className="mb-2">
                      <span className="badge bg-dark me-2">
                        {fav.productCategory}
                      </span>
                      <span className="badge bg-info">{fav.fishType}</span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto d-flex flex-column gap-2">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromFavorite(fav)}
                      >
                        Remove from Favorites
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Hover Effect */}
      <style>
        {`
      .favorite-card {
        transition: all 0.3s ease;
      }
      .favorite-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
    `}
      </style>
    </>
  );
}

export default CustomerFavorite;

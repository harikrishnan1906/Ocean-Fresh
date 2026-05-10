import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToFavoriteAPI,
  getFavoriteProductsAPI,
  removeFromFavoriteAPI,
  viewProductsAPI,
} from "../../services/customerService";
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
import BACKEND_URL from "../../services/uploadsBaseUrl";
import defaulImage from "../../assets/images/defaulImage.png";

function CustomerViewProduct() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const branchId = id;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState(new Set());

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoriteProductsAPI();
        const ids = response.data.map((item) => item._id);
        setFavoriteIds(new Set(ids));
      } catch (err) {
        console.log(err);
        
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const getBranchProducts = async () => {
      try {
        const response = await viewProductsAPI(id);
        setProducts(response.data);
        console.log(response.message);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        alert("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    getBranchProducts(id);
  }, [id]);

  const addToFavorite = async (product) => {
    try {
      const id = product.productId;

      const response = await addToFavoriteAPI(id);
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } catch (err) {
      console.log(err);
      alert("Failed to add favorite product");
    }
  };

  const removeFromFavorite = async (product) => {
    try {
      const id = product.productId;
      const response = await removeFromFavoriteAPI(id);
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err) {
      console.log(err);
      alert("Failed to remove favorite product");
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
          <h4 className="fw-bold">Available Products</h4>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-5">
            <h5>No Products Available</h5>
            <p className="text-muted">Please check back later</p>
          </div>
        ) : (
          <Row className="gx-4 gy-4">
            {products.map((product) => (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="p-2"
              >
                <Card className="h-100 border-0 shadow-sm rounded-4 product-card m-1">
                  {/* Image */}
                  <div
                    className="position-relative"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        product.productImage
                          ? `${BACKEND_URL}/${product.productImage}`
                          : defaulImage
                      }
                      className="img-fluid"
                      style={{ height: "100%", objectFit: "cover" }}
                    />

                    {/* Category Badge */}
                    <span className="badge bg-dark position-absolute top-0 start-0 m-2">
                      {product.productCategory}
                    </span>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    {/* Title */}
                    <Card.Title className="fw-semibold mb-2">
                      {product.productName}
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
                      {product.productDescription}
                    </Card.Text>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="fw-bold text-success fs-5">
                        ₹{product.productPrice}
                      </span>
                      <span className="text-muted small ms-1">/kg</span>
                    </div>

                    {/* Fish Type */}
                    <div className="mb-3 text-muted small">
                      <i className="fa-solid fa-fish me-2"></i>
                      {product.fishType}
                    </div>

                    {/* Buttons */}
                    <div className="mt-auto d-flex flex-column gap-2">
                      {favoriteIds.has(product.productId) ? (
                        <Button
                          onClick={() => removeFromFavorite(product)}
                          variant="outline-danger"
                          size="sm"
                        >
                          ❤️ Remove from Favorites
                        </Button>
                      ) : (
                        <Button
                          onClick={() => addToFavorite(product)}
                          variant="outline-success"
                          size="sm"
                        >
                          🤍 Add to Favorites
                        </Button>
                      )}

                      <Button
                        variant="dark"
                        className="w-100 rounded-pill"
                        onClick={() =>
                          navigate(
                            `/customerDashboard/customerOrder/${branchId}/${product.productId}`,
                          )
                        }
                      >
                        Order Now →
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
      .product-card {
        transition: all 0.3s ease;
      }
      .product-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      }
    `}
      </style>
    </>
  );
}

export default CustomerViewProduct;

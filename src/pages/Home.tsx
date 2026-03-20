import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";

const Home = () => {
  const navigate = useNavigate();

  const products = useSelector(
    (state: RootState) => state.products.items
  );

  // show only first 3 products
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="bg-dark text-white text-center p-5 rounded mb-5">
        <h1 className="display-5 fw-bold">Welcome to ShopFlow <i className="fa-solid fa-shop"></i></h1>
        <p className="lead">
          Discover amazing products with smooth shopping experience.
        </p>

        <button
          className="btn btn-warning btn-lg mt-3"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </section>

      {/* FEATURES */}
      <section className="row text-center mb-5">
        <div className="col-md-4">
          <h4><i className="fa-solid fa-truck"></i> Fast Delivery</h4>
          <p>Quick and reliable shipping experience.</p>
        </div>

        <div className="col-md-4">
          <h4><i className="fa-solid fa-lock"></i> Secure Payment</h4>
          <p>Your transactions are completely safe.</p>
        </div>

        <div className="col-md-4">
          <h4><i className="fa-solid fa-star"></i> Quality Products</h4>
          <p>Carefully selected premium products.</p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section>
        <h2 className="text-center mb-4">Featured Products</h2>

        <div className="row">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-outline-dark mb-3"
            onClick={() => navigate("/products")}
          >
            View All Products
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ProductCard from "../components/common/ProductCard";

const Products = () => {
  const products = useSelector(
    (state: RootState) => state.products.items
  );

  return (
    <div>
      <h2 className="mb-4 text-center">Our Products</h2>

      <div className="row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
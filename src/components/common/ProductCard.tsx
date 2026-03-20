import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQty,
  decrementQty,
} from "../../features/cart/cartSlice";
import { type RootState } from "../../app/store";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  title,
  price,
  image,
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)
  );

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />

        <div className="card-body text-center">
          <h5>{title}</h5>
          <p className="fw-bold">₹ {price}</p>

          {!cartItem ? (
            <button
              className="btn btn-dark"
              onClick={() =>
                dispatch(addToCart({ id, title, price, quantity: 1 }))
              }
            >
              Add To Cart
            </button>
          ) : (
            <div className="d-flex justify-content-center align-items-center gap-2">
              <button
                className="btn btn-danger"
                onClick={() => dispatch(decrementQty(id))}
              >
                -
              </button>

              <span className="fw-bold">{cartItem.quantity}</span>

              <button
                className="btn btn-success"
                onClick={() => dispatch(incrementQty(id))}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
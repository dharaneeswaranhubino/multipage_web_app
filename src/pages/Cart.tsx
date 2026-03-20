import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // const handleRemove = (id: number) => {
  //   dispatch(removeFromCart(id));
  // };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your Cart is Empty <i className="fa-solid fa-cart-arrow-down"></i></h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/products")}
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center">Your Cart</h2>

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>₹ {item.price}</td>
                <td>{item.quantity}</td>
                <td>₹ {item.price * item.quantity}</td>

                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(decrementQty(item.id))}
                    >
                      -
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => dispatch(incrementQty(item.id))}
                    >
                      +
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOTAL SECTION */}
      <div className="text-end mt-4">
        <h4>Total: ₹ {totalPrice}</h4>

        <button
          className="btn btn-success mt-2"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

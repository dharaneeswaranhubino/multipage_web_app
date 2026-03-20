import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { addOrder } from "../features/orders/orderSlice";
import type { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    if (cartItems.length === 0) return;

    const ordersWithUser = cartItems.map((item) => ({
      ...item,
      user: currentUser.email,
    }));

    dispatch(addOrder(ordersWithUser));
    dispatch(clearCart());

    alert("Order placed successfully");
    navigate("/orders");
  };

  return (
    <div className="text-center mt-5">
      <h2>Checkout</h2>

      <p className="mt-3">Click the button below to complete your purchase.</p>

      <button className="btn btn-success mt-3" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { cancelOrder } from "../features/orders/orderSlice";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state: RootState) => state.auth.user
  );

  const allOrders = useSelector(
    (state: RootState) => state.orders.orders
  );

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <h3>Please login first</h3>
        <button
          className="btn btn-dark mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // filter user orders
  const orders = allOrders.filter(
    (order) => order.user === currentUser.email
  );

  if (orders.length === 0) {
    return <h3 className="text-center mt-5">No Orders Yet</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(cancelOrder(item.id))}
                >
                  Cancel Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";
import logo from "../../assets/rushBuy_favIcon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const user = useSelector((state: RootState) => state.auth.user);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top shadow">
      <NavLink className="navbar-brand fw-bold" to="/">
        Rushbuy <img
          src={logo}
          alt="Rushbuy"
          height="40"
          className="rounded-5"
          style={{ objectFit: "contain" }}
        />
      </NavLink>

      <div className="navbar-nav ms-auto gap-3 align-items-center">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>

        <NavLink className="nav-link" to="/products">
          Products
        </NavLink>

        <NavLink className="nav-link" to="/orders">
          Order
        </NavLink>

        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>

        {/* CART */}
        <NavLink className="btn btn-warning position-relative" to="/cart">
          Cart
          {totalItems > 0 && (
            <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </span>
          )}
        </NavLink>

        {/* AUTH BUTTONS */}
        {user ? (
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <NavLink className="btn btn-outline-light" to="/login">
              Login
            </NavLink>

            <NavLink className="btn btn-success" to="/signup">
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

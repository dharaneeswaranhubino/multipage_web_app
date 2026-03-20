import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, error } = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(form));
  };

  useEffect(() => {
    if (user) {
      const from =
      (location.state as { from?: Location })?.from?.pathname || "/";
      // navigate("/");
      navigate(from, { replace: true });
      alert("Login Successful!!!")
    }
  }, [user]);

  return (
    <div className="col-md-4 mx-auto">
      <h3 className="text-center mb-3">Login</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark">Login</button>

        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

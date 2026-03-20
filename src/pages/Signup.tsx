import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, signupSuccess } = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signup(form));
  };

  useEffect(() => {
    if (signupSuccess) {
      alert("Signup Successful!!!");
      navigate("/login");
    }
  }, [signupSuccess, navigate]);

  return (
    <div className="col-md-4 mx-auto">
      <h3 className="text-center mb-3">Signup</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

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

        <button className="btn btn-success">Signup</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;

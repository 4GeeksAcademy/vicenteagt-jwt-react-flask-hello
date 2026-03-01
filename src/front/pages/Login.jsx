import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {

  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }
    );

    const data = await response.json();

    if (response.ok) {

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.name);

      dispatch({
        type: "setAuth",
        payload: {
          token: data.token,
          user: data.name
        }
      });

      navigate("/private");
    } else {
      alert(data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};


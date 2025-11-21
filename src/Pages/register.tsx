import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    roleni: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/register", form);
      setMessage(res.data.message);
      if (res.data.success) setTimeout(() => navigate("/"), 1000);
      else
        setForm({
          ...form,
          fullname: "",
          username: "",
          password: "",
        });
    } catch (err) {
      console.error(err);
      setMessage("Registration failed. Try again.");
    }
  };


  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="register-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <div>
            <label className="register-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <div>
            <label className="register-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {message && <p className="message2">{message}</p>}

        <p className="footer">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

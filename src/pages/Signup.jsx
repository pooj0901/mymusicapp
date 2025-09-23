import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://your-backend-domain.com";

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) navigate("/");
      else alert(data.message || "Signup failed");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-gray-900 rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-md text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Sign up
        </h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-4 py-2 rounded-full bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-spotifyGreen w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 rounded-full bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-spotifyGreen w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 rounded-full bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-spotifyGreen w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-spotifyGreen py-2 rounded-full font-bold text-black hover:brightness-110 transition w-full"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-center text-sm md:text-base">
          Already have an account?{" "}
          <span
            className="text-spotifyGreen cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

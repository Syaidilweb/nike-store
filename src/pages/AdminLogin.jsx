import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    // dummy admin credential
    if (email === "admin@nike.com" && password === "admin123") {
      navigate("/admin/dashboard")
    } else {
      setError("Email atau password salah")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-3 mb-6 rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80"
        >
          Login
        </button>
      </div>
    </div>
  )
}

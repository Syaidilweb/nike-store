export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="border w-full p-3 mb-4 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-6 rounded-lg"
        />

        <button className="w-full bg-black text-white py-3 rounded-lg hover:opacity-80">
          Login
        </button>
      </div>
    </div>
  )
}

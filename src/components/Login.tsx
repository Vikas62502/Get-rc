import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import client from "../utils/axiosClient";
import number from "../assets/phone.png";
import pass from "../assets/padlock.png";
import { toast } from "sonner";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleLogin = async (e: any) => {
    const toastLoader = toast.loading("Logging in...")
    setLoading(true)
    e.preventDefault();

    // Validate identifier as either email or phone number
    if (!isValidEmail(identifier) && !isValidPhone(identifier)) {
      alert("Please enter a valid email or 10-digit mobile number.");
      return;
    }

    try {
      // Call login API
      const response: any = await client.post("/api/login/user-login", {
        emailOrPhone: identifier, // Can be email or phone
        password,
      });
      toast.success("Login successful!")
      console.log(response, "res");
      // Handle response
      if (response.status === 200) {
        const { role } = response?.data?.user; // Assuming the API response contains a `role` field

        if (role === "User") {
          navigate("/agentdashboard");
        } else if (role === "Admin") {
          navigate("/admindashboard");
        } else {
          alert("Unknown role. Please contact support.");
        }
      } else {
        alert("Invalid credentials");
      }
    } catch (error: any) {
      // Handle API errors
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      toast.dismiss(toastLoader)
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white">
      <div className="w-96 p-6 mx-5 lg:mx-0 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-semibold mb-4">Log in</h3>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex justify-center items-center gap-3">
            <img src={number} alt="Identifier icon" className="w-7 h-7" />
            <input
              type="text"
              id="identifier"
              placeholder="Enter Email or Mobile Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <img src={pass} alt="Password icon" className="w-7 h-7" />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Not a member?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

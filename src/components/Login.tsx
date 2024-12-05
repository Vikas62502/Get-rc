import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import number from "../assets/phone.png";
import pass from "../assets/padlock.png";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    // Validate phone number length
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    // Example validation
    if (phone === "9560611324" && password === "mohit") {
      navigate("/agentdashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white">
      <div className="w-96 p-6 mx-5 lg:mx-0 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-semibold mb-4">Log in</h3>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex justify-center items-center gap-3">
            <img src={number} alt="Phone icon" className="w-7 h-7" />
            <input
              type="text"
              id="phone"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10} // Restrict input to 10 characters
              pattern="\d{10}" // Allow only 10 digits
              title="Please enter a valid 10-digit mobile number."
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
            Login
          </button>
        </form>
        <Link to="/admindashboard" className="text-blue-500 font-semibold">
          Admin Dashboard
        </Link>
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

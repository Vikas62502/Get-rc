
import { Link } from "react-router-dom";

import name from '../assets/user.png'
import number from '../assets/phone.png'
import email from '../assets/email.png'
import pass from '../assets/padlock.png'

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white">
      <div className="w-96 p-6 mx-5 lg:mx-0 bg-white rounded-lg shadow-lg">
        <h3 className="text-center text-lg font-semibold mb-4">Sign Up</h3>
        <form className="space-y-5">
          <div className="flex justify-center items-center gap-3">
            {/* <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label> */}
            <img src={name} alt="Car" className="w-7 h-7" />

            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            {/* <label htmlFor="phone" className="block text-sm font-medium">
              Mobile Number
            </label> */}
            <img src={number} alt="Car" className="w-7 h-7" />

            <input
              type="text"
              id="phone"
              placeholder="+91"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            {/* <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label> */}
            <img src={email} alt="Car" className="w-7 h-7" />

            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            {/* <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label> */}
            <img src={pass} alt="Car" className="w-7 h-7" />

            <input
              type="password"
              id="password"
              placeholder="Create Password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            {/* <label htmlFor="confirm-password" className="block text-sm font-medium">
              Confirm Password
            </label> */}
            <img src={pass} alt="Car" className="w-7 h-7" />

            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already a member?{" "}
          <Link to="/" className="text-blue-500 font-semibold">
            Log In Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

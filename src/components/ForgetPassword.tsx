import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../utils/axiosClient";
import number from "../assets/phone.png";
import pass from "../assets/padlock.png";
import { toast } from "sonner";
import LoginandSignupHeader from './LoginandSignupHeader';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Track the current step
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e:any) => {
    e.preventDefault();
    if (!identifier) {
      toast.error("Please provide your email or phone number.");
      return;
    }

    try {
      setLoading(true);
      const response = await client.post('/api/login/forgot-password', {
        emailOrPhone: identifier,
      });
      toast.success(response?.data?.message || "OTP sent successfully!");
      setStep(2); // Move to the OTP step
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e:any) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await client.post('/api/login/reset-password', {
        emailOrPhone: identifier,
        otp,
        newPassword,
      });
      toast.success(response?.data?.message || "Password reset successfully!");
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginandSignupHeader />
      <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-b from-cyan-200 to-white">
        <div className="w-96 p-6 mx-5 lg:mx-0 bg-white rounded-lg shadow-lg">
          <h3 className="text-center text-lg font-semibold mb-4">
            {step === 1 ? "Send OTP" : "Reset Password"}
          </h3>
          <form
            onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
            className="space-y-5"
          >
            {step === 1 && (
              <div className="flex justify-center items-center gap-3">
                <img src={number} alt="Identifier icon" className="w-7 h-7" />
                <input
                  type="text"
                  placeholder="Enter Email or Mobile Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            )}

            {step === 2 && (
              <>
                <div className="flex justify-center items-center gap-3">
                  <img src={pass} alt="OTP icon" className="w-7 h-7" />
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex justify-center items-center gap-3">
                  <img src={pass} alt="Password icon" className="w-7 h-7" />
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Processing..." : step === 1 ? "Send OTP" : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

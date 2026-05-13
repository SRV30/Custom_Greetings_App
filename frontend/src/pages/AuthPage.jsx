import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const AuthPage = ({ setIsLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [profileImage, setProfileImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let response;

      if (isSignup) {
        const formData = new FormData();

        formData.append("name", name);

        formData.append("email", email);

        formData.append("password", password);

        formData.append("profileImage", profileImage);

        response = await axios.post(`${API_URL}/signup`, formData);

        toast.success("Account created successfully");
      } else {
        response = await axios.post(`${API_URL}/login`, {
          email,
          password,
        });

        toast.success("Login successful");
      }

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsLoggedIn(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
      "
      style={{ backgroundColor: "#e5e7eb" }}
    >
      <div
        className="
          w-full
          max-w-105
          bg-white
          rounded-4xl
          shadow-2xl
          p-8
        "
      >
        <h1 className="text-4xl font-bold mb-3">Greetings App</h1>

        <p className="text-gray-600 mb-8">Create personalized greeting cards</p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div className="mb-5">
                <label className="block mb-2 font-medium">Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                  "
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-medium">Profile Image</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  className="w-full"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-5">
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-4
                py-3
                outline-none
              "
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-4
                  py-3
                  pr-12
                  outline-none
                "
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-2xl
              font-semibold
              text-lg
              mb-4
            "
          >
            {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="
            w-full
            border
            border-black
            py-4
            rounded-2xl
            font-semibold
            text-lg
          "
        >
          {isSignup ? "Already have an account?" : "Create new account"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;

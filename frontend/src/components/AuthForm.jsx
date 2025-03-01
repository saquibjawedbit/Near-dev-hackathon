import React, { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(formData).finally(() => setLoading(false));
  };

  const handleGuestLogin = () => {
    setFormData({
      email: "guestuser@gmail.com",
      password: "12345678",
    });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-16 flex flex-col items-center w-full max-w-lg p-8 bg-gradient-to-br from-[#3c2719] to-[#000000] shadow-2xl rounded-3xl font-lilita border-b-4 border-r-4 border-amber-950 text-white space-y-6"
    >
      
      <h2 className="text-3xl  text-yellow-500 mb-2 border-b-2 border-yellow-400 w-3/4 pb-2 text-center">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

     
      <div className="w-full">
        <label htmlFor="email" className="block text-lg  text-yellow-500 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="w-full p-3 rounded-full bg-yellow-700/30  text-yellow-300 shadow-sm focus:ring-2 focus:ring-[#D7A86E] focus:outline-none"
        />
      </div>

    
      <div className="w-full">
        <label htmlFor="password" className="block text-lg  text-yellow-500 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="w-full p-3 rounded-full bg-yellow-700/30  text-yellow-300 shadow-sm focus:ring-2 focus:ring-[#D7A86E] focus:outline-none"
        />
      </div>

     
      <div className="flex flex-col sm:flex-row w-full gap-4">
        
        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-full bg-gradient-to-r border-b-2 border-lime-500 from-[#388134]  to-[#556B2F] text-white  shadow-lg transition-all duration-300 hover:scale-105"
          disabled={loading}
        >
          {loading ? "Loading..." : mode === "login" ? "Login" : "Sign Up"}
        </button>

      
        {mode === "login" && (
          <button
            type="button"
            onClick={handleGuestLogin}
            className="mt-4 w-full py-3 rounded-full bg-gradient-to-r border-b-2 border-red-500 from-red-600 to-[#380303] text-white  shadow-lg transition-all duration-300 hover:scale-105"
          >
            Login as Guest
          </button>
        )}
      </div>
    </form>
  );
};

export default AuthForm;

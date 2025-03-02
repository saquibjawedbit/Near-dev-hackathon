import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import authImage from "../assets/AI.png";
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { sign } from "viem/accounts";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { signedAccountId, signIn, signOut } = useWalletSelector();

  const handleAuth = async (formData) => {
    try {
      signIn();
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (signedAccountId) {
      navigate("/home");
    }
  }, [signedAccountId]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#231205] to-[#3d1a00] flex flex-col">
      <Header />

      <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen p-4 lg:px-20">


        <div className="hidden md:flex w-1/2 justify-center">
          <img
            src={authImage}
            alt="Auth Illustration"
            className="max-w-full h-auto object-cover rounded-2xl shadow-lg"
          />
        </div>


        <div className="w-full md:w-1/2 flex flex-col items-center">
          <AuthForm mode={isLogin ? "login" : "signup"} onSubmit={handleAuth} />


          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-yellow-400 font-lilita underline hover:text-custom-red"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default AuthPage;

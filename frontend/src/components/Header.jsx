import { useState, useEffect } from "react";
import logo from "../assets/logob.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`p-2 fixed top-3 left-3 right-3 md:left-5 md:right-5 rounded-full w-auto  flex items-center justify-between border-b-4 border-r-4 border-[#99582a] px-4 z-50 transition-all duration-300
        ${isScrolled ? "bg-amber-400/10 backdrop-blur-md text-yellow-400" : "bg-[#bb9457] text-[#231205]"}`}
    >
      <div className="flex items-center gap-3">
        <img src={logo} alt="Chess AI Battle Logo" className="h-12 w-12" />
        <h1 className="text-3xl font-lilita font-medium tracking-widest">
          Chess AI Battle
        </h1>
      </div>
      <nav className="hidden md:flex space-x-6 font-mono font-bold">
        <a href="#" className="hover:text-amber-700 transition duration-200">
          Home
        </a>
        <a href="#" className="hover:text-amber-700 transition duration-200">
          About
        </a>
        <a href="#" className="hover:text-amber-700 transition duration-200">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;

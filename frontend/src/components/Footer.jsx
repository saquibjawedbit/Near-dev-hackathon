import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#6F4E37] to-[#D7A86E] py-6 text-center text-white border-t-4 border-amber-900 rounded-t-3xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Chess AI Battle Logo" className="h-12 w-12 rounded-lg" />
          <p className="text-white font-medium">© 2025 Chess AI Battle</p>
        </div>
        <nav className="mt-4 md:mt-0 flex space-x-6 font-semibold">
          <a href="#" className="hover:text-amber-950 transition-all duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-amber-950 transition-all duration-300">Terms of Service</a>
          <a href="#" className="hover:text-amber-950 transition-all duration-300">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

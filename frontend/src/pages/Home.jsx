import { useState } from "react";
import StartNewMatch from "../components/StartNewMatch";
import WalletStats from "../components/WalletStats";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PreviousMatches from "../components/PreviousMatches";
import MatchSetup from "../components/MatchSetup"; 

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#231205] to-[#3d1a00] w-full min-h-screen relative">
      <Header />
      <div className="pt-24 flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-12">
      
        <StartNewMatch openModal={() => setIsModalOpen(true)} />
        <WalletStats />
      </div>

      <div>
        <PreviousMatches />
      </div>

      <Footer />

    
      {isModalOpen && <MatchSetup closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Home;

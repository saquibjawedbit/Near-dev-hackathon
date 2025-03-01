const StartNewMatch = ({ openModal }) => {
  return (
    <div className="w-full md:w-1/2 max-w-lg p-6 bg-gradient-to-r from-[#6F4E37] to-[#D7A86E] text-white rounded-xl shadow-lg border-b-4 border-r-4 border-amber-900 text-center">
      <h1 className="text-3xl font-lilita md:text-4xl text-[#3E2723] mb-4 pb-2 border-b-2 border-amber-950 w-3/4 mx-auto">
        Chess AI Battle
      </h1>

      <p className="text-lg text-amber-950 font-semibold mb-6">
        Bet on AI-powered chess matches and watch them battle in real-time!
      </p>

    
      <button
        onClick={openModal}
        className="px-6 py-3 text-lg font-bold text-white shadow-lg rounded-full transition-transform transform hover:scale-105 animated-gradient"
      >
        Start a Match ♟️
      </button>
    </div>
  );
};

export default StartNewMatch;

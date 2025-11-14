import { useState } from "react";
import InputModal from "./components/InputModal";  

function App() {
  const [riskLevel, setRiskLevel] = useState(null); // null, 'low', 'high'

  const getBackgroundClass = () => {
    if (riskLevel === 'high') {
      return 'bg-gradient-to-br from-red-900 via-red-800 to-orange-900';
    } else if (riskLevel === 'low') {
      return 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900';
    }
    return 'bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800';
  };

  return (
    <div className={`w-screen min-h-screen ${getBackgroundClass()} animate-gradient flex justify-center items-center relative overflow-hidden transition-all duration-1000`}>
      {/* Animated background circles */}
      <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl animate-float transition-colors duration-1000 ${
        riskLevel === 'high' ? 'bg-red-500/20' : riskLevel === 'low' ? 'bg-green-500/20' : 'bg-blue-500/20'
      }`}></div>
      <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl animate-float transition-colors duration-1000 ${
        riskLevel === 'high' ? 'bg-orange-500/20' : riskLevel === 'low' ? 'bg-teal-500/20' : 'bg-indigo-500/20'
      }`} style={{ animationDelay: '1s' }}></div>
      <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl animate-float transition-colors duration-1000 ${
        riskLevel === 'high' ? 'bg-pink-500/20' : riskLevel === 'low' ? 'bg-emerald-500/20' : 'bg-purple-500/20'
      }`} style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full px-6 py-8 flex flex-col gap-8 relative z-10 max-w-6xl">
        <div className="text-center animate-slide-in">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            Stroke Predictor
          </h1>
          <p className="text-xl text-white/80 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            AI-powered health risk assessment
          </p>
        </div>
        <InputModal onRiskChange={setRiskLevel} />
      </div>
    </div>
  )
}

export default App;

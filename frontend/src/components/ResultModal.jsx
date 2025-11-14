const ResultModal = ({ result, onClose }) => {
  if (!result) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-slide-in"
      onClick={handleBackdropClick}
    >
      <div className={`relative w-full max-w-2xl p-8 rounded-3xl animate-bounce-in backdrop-blur-xl border-2 shadow-2xl transition-all duration-500 ${
        result.error 
          ? 'bg-red-500/30 border-red-400 shadow-red-500/50' 
          : result.prediction === 1 
            ? 'bg-red-500/30 border-red-400 shadow-red-500/50' 
            : 'bg-green-500/30 border-green-400 shadow-green-500/50'
      }`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 hover:scale-110 text-white font-bold text-xl"
          aria-label="Close"
        >
          ×
        </button>

        {result.error ? (
          <div className="text-center animate-shake text-white">
            <p className="text-3xl font-bold text-red-100 mb-4">Error</p>
            <p className="text-red-200 text-lg">{result.error}</p>
          </div>
        ) : (
          <div className="text-center text-white">
            <p className="text-4xl font-bold mb-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              {result.prediction === 1 ? "High Risk of Stroke" : "Low Risk of Stroke"}
            </p>
            {result.probability && (
              <div className="mt-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <p className="text-xl opacity-90 mb-4">Risk Probability</p>
                <div className="w-full bg-white/20 rounded-full h-8 overflow-hidden backdrop-blur-sm">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-base font-bold ${
                      result.prediction === 1 
                        ? 'bg-linear-to-r from-red-500 to-red-600' 
                        : 'bg-linear-to-r from-green-500 to-green-600'
                    }`}
                    style={{ width: `${result.probability * 100}%` }}
                  >
                    {result.probability * 100 > 15 && `${(result.probability * 100).toFixed(1)}%`}
                  </div>
                </div>
                <p className="text-base mt-3 opacity-70">
                  {(result.probability * 100).toFixed(2)}% probability
                </p>
              </div>
            )}
            <p className="text-base mt-8 opacity-90 italic animate-slide-in" style={{ animationDelay: '0.3s' }}>
              {result.prediction === 1 
                ? "Please consult with a healthcare professional for proper evaluation" 
                : "Keep maintaining a healthy lifestyle!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;

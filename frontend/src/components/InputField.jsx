const InputField = ({ label, type, name, value, onChange, options, placeholder }) => {
  
  return (
    <div className="flex flex-col gap-2 animate-slide-in">
      <label className="text-sm font-semibold text-white/90 tracking-wide">{label}</label>
      <div className="border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-xl p-3 transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/30 focus-within:border-white focus-within:bg-white/20 focus-within:shadow-xl focus-within:shadow-purple-500/50">
        {type === "select" ? (
          <select 
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-transparent text-white outline-none cursor-pointer font-medium"
          >
            <option value="" className="bg-purple-900">Select {label}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value} className="bg-purple-900">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={type === "number" ? "0.01" : undefined}
            className="w-full bg-transparent text-white outline-none placeholder-white/40 font-medium"
          />
        )}
      </div>
    </div>
  )
}

export default InputField

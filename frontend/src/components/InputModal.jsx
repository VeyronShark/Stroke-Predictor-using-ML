import { useState, useEffect } from "react"
import InputField from "./InputField"
import ResultModal from "./ResultModal"

const InputModal = ({ onRiskChange }) => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: ""
  })

  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (result && !result.error) {
      onRiskChange(result.prediction === 1 ? 'high' : 'low');
      setShowModal(true);
    } else if (result && result.error) {
      setShowModal(true);
    }
  }, [result, onRiskChange]);

  const handleCloseModal = () => {
    setShowModal(false);
    setResult(null);
    onRiskChange(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setShowModal(false)

    try {
      const response = await fetch(`http://localhost:5000/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: "Failed to get prediction" })
    } finally {
      setLoading(false)
    }
  }

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ]

  const binaryOptions = [
    { value: "0", label: "No" },
    { value: "1", label: "Yes" }
  ]

  const workTypeOptions = [
    { value: "Private", label: "Private" },
    { value: "Self-employed", label: "Self-employed" },
    { value: "Govt_job", label: "Government Job" },
    { value: "children", label: "Children" },
    { value: "Never_worked", label: "Never Worked" }
  ]

  const residenceOptions = [
    { value: "Urban", label: "Urban" },
    { value: "Rural", label: "Rural" }
  ]

  const smokingOptions = [
    { value: "formerly smoked", label: "Formerly Smoked" },
    { value: "never smoked", label: "Never Smoked" },
    { value: "smokes", label: "Smokes" },
    { value: "Unknown", label: "Unknown" }
  ]

  return (
    <>
      <div className="border-2 border-white/40 backdrop-blur-xl bg-white/10 rounded-3xl text-white p-8 max-w-5xl mx-auto shadow-2xl animate-slide-in hover:shadow-blue-500/30 transition-all duration-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField 
            label="Gender"
            type="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
          />

          <InputField 
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter age"
          />

          <InputField 
            label="Hypertension"
            type="select"
            name="hypertension"
            value={formData.hypertension}
            onChange={handleChange}
            options={binaryOptions}
          />

          <InputField 
            label="Heart Disease"
            type="select"
            name="heart_disease"
            value={formData.heart_disease}
            onChange={handleChange}
            options={binaryOptions}
          />

          <InputField 
            label="Ever Married"
            type="select"
            name="ever_married"
            value={formData.ever_married}
            onChange={handleChange}
            options={binaryOptions}
          />

          <InputField 
            label="Work Type"
            type="select"
            name="work_type"
            value={formData.work_type}
            onChange={handleChange}
            options={workTypeOptions}
          />

          <InputField 
            label="Residence Type"
            type="select"
            name="Residence_type"
            value={formData.Residence_type}
            onChange={handleChange}
            options={residenceOptions}
          />

          <InputField 
            label="Average Glucose Level"
            type="number"
            name="avg_glucose_level"
            value={formData.avg_glucose_level}
            onChange={handleChange}
            placeholder="Enter glucose level (mg/dL)"
          />

          <InputField 
            label="BMI"
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            placeholder="Enter BMI"
          />

          <InputField 
            label="Smoking Status"
            type="select"
            name="smoking_status"
            value={formData.smoking_status}
            onChange={handleChange}
            options={smokingOptions}
          />
        </div>

          <button 
            type="submit"
            disabled={loading}
            className="mt-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 disabled:scale-100 disabled:shadow-none text-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Predict Stroke Risk"
              )}
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>
      </div>

      {showModal && <ResultModal result={result} onClose={handleCloseModal} />}
    </>
  )
}

export default InputModal

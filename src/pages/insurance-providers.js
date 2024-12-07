import { useState } from "react";
import NavBar from "./components/NavBar";

const InsuranceProvider = () => {
  // States for managing forms and data
  const [nonCoveredDiseases, setNonCoveredDiseases] = useState([]);
  const [diseaseInput, setDiseaseInput] = useState("");
  const [isDefiningPolicy, setIsDefiningPolicy] = useState(false);
  const [isQueryingRecords, setIsQueryingRecords] = useState(false);
  const [isProcessingClaim, setIsProcessingClaim] = useState(false);
  const [record, setRecord] = useState(null);
  const [patientId, setPatientId] = useState(""); // State for storing patient ID
  const [queriedRecords, setQueriedRecords] = useState([]);

  // Handle dynamic disease addition
  const addDisease = (e) => {
    e.preventDefault();
    if (diseaseInput.trim()) {
      setNonCoveredDiseases((prev) => [...prev, diseaseInput.trim()]);
      setDiseaseInput("");
    }
  };

  // Handle Define Policy
  const handleDefinePolicy = async (e) => {
    e.preventDefault();
    setIsDefiningPolicy(true);

    const formData = new FormData(e.target);
    let cjson = `{\"IsNonSmoker\": ${formData.get("isSmoker") === "no"},\"HasDisease\": ${formData.get("hasDisease") === "yes"}}`;

    const policyData = {
      policyID: formData.get("policyID"),
      policyType: formData.get("policyType"),
      coverAmount: parseInt(formData.get("coverAmount"), 10),
      premium: parseInt(formData.get("premium"), 10),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      criteriaJSON: cjson,
      diseasesJSON: JSON.stringify(nonCoveredDiseases),
    };

    try {
      const response = await fetch("http://localhost:3001/insurance/definePolicy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policyData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      alert(`Policy defined successfully! `);
    } catch (error) {
      console.error("Error defining policy:", error);
      alert("Failed to define policy. Please try again later.");
    } finally {
      setIsDefiningPolicy(false);
    }
  };

  // Handle Query Health Records (GET request)
  const handleQueryRecords = async (e) => {
    e.preventDefault();
    setIsQueryingRecords(true);

    if (!patientId.trim()) {
      alert("Please enter a valid Patient ID.");
      setIsQueryingRecords(false);
      return;
    }



    try {
      // Dynamically constructing the URL using the patient ID
      const response = await fetch(`http://localhost:3001/insurance/queryHealthRecordsorg1/${patientId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      // Since the data is a single record, we directly set it
      if (data && data.id) {
        setRecord(data);
      } else {
        console.error("Unexpected data format:", data);
        setRecord(null);
      }
      //setQueriedRecords(data);
    } catch (error) {
      console.error("Error querying records:", error);
      alert("Failed to query records. Please try again later.");
    } finally {
      setIsQueryingRecords(false);
    }
  };

  // Handle Process Claim
  const handleProcessClaim = async (e) => {
    e.preventDefault();
    setIsProcessingClaim(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessingClaim(false);
    alert("Claim processed successfully!");
  };

  return (
    <div>
      <NavBar />

      {/* Header */}
      <header className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Insurance Provider Dashboard</h1>
        <p className="text-lg">
          Define policies, query health records, and process claims effortlessly.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        {/* Define Policy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Define a Policy</h2>
          <div className="bg-white p-6 shadow-md rounded-md">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleDefinePolicy}
            >
              <input
                type="text"
                name="policyID"
                placeholder="Policy ID"
                className="p-3 text-gray-900 border rounded-md"
                required
              />
              <input
                type="text"
                name="policyType"
                placeholder="Policy Type"
                className="p-3 text-gray-900 border rounded-md"
                required
              />
              <input
                type="number"
                name="coverAmount"
                placeholder="Cover Amount"
                className="p-3 text-gray-900 border rounded-md"
                required
              />
              <input
                type="number"
                name="premium"
                placeholder="Premium"
                className="p-3 text-gray-900 border rounded-md"
                required
              />
              <input
                type="date"
                name="startDate"
                className="p-3 text-gray-900 border rounded-md"
                placeholder="Start Date"
                required
              />
              <input
                type="date"
                name="endDate"
                className="p-3 text-gray-900 border rounded-md"
                placeholder="End Date"
                required
              />
              <select
                name="isSmoker"
                className="p-3 text-gray-900 border rounded-md"
                required
              >
                <option value="">Is Smoker</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <select
                name="hasDisease"
                className="p-3 text-gray-900 border rounded-md"
                required
              >
                <option value="">Has Disease</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              {/* Non-Covered Diseases */}
              <div className="md:col-span-2">
                <label className="block  mb-2 font-medium text-gray-600">
                  Add Covered Diseases
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={diseaseInput}
                    onChange={(e) => setDiseaseInput(e.target.value)}
                    placeholder="Enter disease and press Enter"
                    className="p-3 text-gray-900 border rounded-md flex-1"
                  />
                  <button
                    onClick={addDisease}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-4">
                  {nonCoveredDiseases.map((disease, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isDefiningPolicy}
                >
                  {isDefiningPolicy ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Define Policy"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Query Health Records Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Query Health Records</h2>
          <div className="bg-white p-6 shadow-md rounded-md">
            <form onSubmit={handleQueryRecords}>
              <div className="flex items-center mb-6">
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}  // Capture the patient ID
                  placeholder="Enter Patient ID"
                  className="p-3 text-gray-900 border rounded-md flex-1"
                  required
                />
                <button
                  type="submit"
                  className="ml-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isQueryingRecords}
                >
                  {isQueryingRecords ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Query Records"
                  )}
                </button>
              </div>
            </form>

            {/* Display Queried Records in Table */}
            {record ? (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border text-gray-900  px-4 py-2 text-left">Field</th>
              <th className="border text-gray-900 px-4 py-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-gray-900 px-4 py-2">ID</td>
              <td className="border text-gray-900 px-4 py-2">{record.id}</td>
              
            </tr>
            <tr>
              <td className="border text-gray-900 px-4 py-2">Non-Smoker</td>
              <td className="border text-gray-900 px-4 py-2">{record.isNonSmoker ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td className="border text-gray-900 px-4 py-2">Has Disease</td>
              <td className="border text-gray-900 px-4 py-2">{record.hasDisease ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td className="border text-gray-900 px-4 py-2">Timestamp</td>
              <td className="border text-gray-900 px-4 py-2">{new Date(record.timestamp * 1000).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>No record found.</div>
      )}
          </div>
        </section>

        {/* Process Claim Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Process Claim</h2>
          <div className="bg-white p-6 shadow-md rounded-md">
            <form onSubmit={handleProcessClaim}>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 flex items-center justify-center"
                  disabled={isProcessingClaim}
                >
                  {isProcessingClaim ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Process Claim"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InsuranceProvider;

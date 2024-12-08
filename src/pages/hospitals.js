import { useState } from "react";
import NavBar from "./components/NavBar";

const Hospitals = () => {
  // State for loading status
  const [isUploading, setIsUploading] = useState(false);
  const [isRequestingClaim, setIsRequestingClaim] = useState(false);

  // Handle Upload Health Details
  const handleUploadDetails = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Get form data
    const formData = new FormData(e.target);

    // Prepare the data to be sent
    const data = {
      id: formData.get("patientId"),
      isNonSmoker: formData.get("isSmoker") === "no" ? "true" : "false", // Assuming "no" means non-smoker
      hasDisease: formData.get("hasDisease") === "yes" ? "true" : "false", // Assuming "yes" means has disease
    };

    // Send POST request to upload health details
    try {
      const response = await fetch("http://localhost:3001/insurance/uploadHealthRecords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to upload health details");
      }

      setIsUploading(false);
      alert("Health details uploaded successfully!");
    } catch (error) {
      setIsUploading(false);
      alert("Error uploading health details: " + error.message);
    }
  };

  // Handle Request Claim
// Handle Request Claim
const handleRequestClaim = async (e) => {
  e.preventDefault();
  setIsRequestingClaim(true);

  // Get form data
  const formData = new FormData(e.target);

  // Prepare the data to be sent
  const data = {
    userID: formData.get("userId"),
    diseaseDiagnosis: formData.get("diseaseDiagnosis"),
    treatmentPlan: formData.get("treatmentPlan"),
    hospitalName: formData.get("hospitalName"),
    admissionDate: formData.get("admissionDate"),
    dischargeDate: formData.get("dischargeDate"),
  };

  console.log(data)

  // Send POST request to upload patient details
  try {
    const response = await fetch("http://localhost:3001/claims/uploadPatientDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

    });
    
    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to request claim");
    }

    setIsRequestingClaim(false);
    alert("Claim requested successfully!");
  } catch (error) {
    setIsRequestingClaim(false);
    alert("Error requesting claim: " + error.message);
  }
};


  return (
    <div>
      <NavBar />

      {/* Header Section */}
      <header className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Hospital Dashboard</h1>
        <p className="text-lg">
          Upload patient details and request claims seamlessly.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        {/* Section: Upload Health Details */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Upload Health Details
          </h2>
          <div className="bg-white p-6 shadow-md rounded-md">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleUploadDetails}
            >
              {/* Patient ID */}
              <div>
                <label htmlFor="patientId" className="block text-gray-600 mb-2 font-medium">
                  Patient ID
                </label>
                <input
                  type="text"
                  id="patientId"
                  name="patientId"  // Added name attribute
                  placeholder="Enter Patient ID"
                  className="w-full text-gray-900 p-3 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Smoker Status */}
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  Is the patient a smoker?
                </label>
                <select
                  className="w-full text-gray-900 p-3 border rounded-md focus:outline-blue-500"
                  defaultValue=""
                  name="isSmoker"  // Added name attribute
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Disease Status */}
              <div>
                <label className="block text-gray-600 mb-2 font-medium">
                  Does the patient have any disease?
                </label>
                <select
                  className="w-full p-3 text-gray-900 border rounded-md focus:outline-blue-500"
                  defaultValue=""
                  name="hasDisease"  // Added name attribute
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Upload Details"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Section: Request Claim */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">
            Request Claim
          </h2>
          <div className="bg-white p-6 shadow-md rounded-md">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleRequestClaim}
            >
              {/* User ID */}
              <div>
                <label htmlFor="userId" className="block text-gray-600 mb-2 font-medium">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"  // Added name attribute
                  placeholder="Enter User ID"
                  className="w-full text-gray-900 p-3 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Disease Diagnosis */}
              <div>
                <label htmlFor="diseaseDiagnosis" className="block text-gray-600 mb-2 font-medium">
                  Disease Diagnosis
                </label>
                <input
                  type="text"
                  id="diseaseDiagnosis"
                  name="diseaseDiagnosis"  // Added name attribute
                  placeholder="Enter Disease Diagnosis"
                  className="w-full text-gray-900 p-3 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Treatment Plan */}
              <div>
                <label htmlFor="treatmentPlan" className="block text-gray-600 mb-2 font-medium">
                  Treatment Plan
                </label>
                <input
                  type="text"
                  id="treatmentPlan"
                  name="treatmentPlan"  // Added name attribute
                  placeholder="Enter Treatment Plan"
                  className="w-full text-gray-900 p-3 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label htmlFor="hospitalName" className="block text-gray-600 mb-2 font-medium">
                  Hospital Name
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"  // Added name attribute
                  placeholder="Enter Hospital Name"
                  className="w-full p-3 text-gray-900 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Admission Date */}
              <div>
                <label htmlFor="admissionDate" className="block text-gray-600 mb-2 font-medium">
                  Admission Date
                </label>
                <input
                  type="date"
                  id="admissionDate"
                  name="admissionDate"  // Added name attribute
                  className="w-full p-3 text-gray-900 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Discharge Date */}
              <div>
                <label htmlFor="dischargeDate" className="block text-gray-600 mb-2 font-medium">
                  Discharge Date
                </label>
                <input
                  type="date"
                  id="dischargeDate"
                  name="dischargeDate"  // Added name attribute
                  className="w-full p-3 text-gray-900 border rounded-md focus:outline-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isRequestingClaim}
                >
                  {isRequestingClaim ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Request Claim"
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

export default Hospitals;

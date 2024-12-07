import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";

const Client = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for form data
  const [userId, setUserId] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [premiumPaid, setPremiumPaid] = useState("");
  const [isSmoker, setIsSmoker] = useState("");
  const [hasDisease, setHasDisease] = useState("");
  const [consent, setConsent] = useState(false);

  // Fetch policies from the API
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch("http://localhost:3001/insurance/queryAllPolicies");
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
        alert("Failed to fetch policies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Handle policy registration
  const handleRegisterPolicy = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    const requestBody = {
      userID: String(userId), // Convert userId to string
      policyID: String(policyId), // Convert policyId to string
      premiumPaid: String(parseFloat(premiumPaid)), // Convert premiumPaid to string
      isNonSmoker: String(isSmoker === "no"), // Convert boolean to string
      hasDisease: String(hasDisease === "yes"), // Convert boolean to string
      consent: String(consent) // Convert consent to string
    };

    try {
      const response = await fetch("http://localhost:3001/insurance/registerForPolicy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        alert("Policy registered successfully!");
      } else {
        const errorData = await response.json();
        console.log(errorData.message)
        alert(`Error registering policy: ${errorData.message || "Records mismatch"}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register policy. Please try again later.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div>
      <NavBar />

      {/* Header */}
      <header className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Client Dashboard</h1>
        <p className="text-lg">
          Explore available policies and register for one that suits your needs.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-6">
        {/* Available Policies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Available Policies</h2>
          {loading ? (
            <p>Loading policies...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {policies.map((policy) => (
                <div
                  key={policy.policyId}
                  className="bg-white text-gray-900 shadow-md rounded-md p-6 text-center"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">
                    {policy.policyType}
                  </h3>
                  <p>
                    <strong>Policy ID:</strong> {policy.policyId}
                  </p>
                  <p>
                    <strong>Cover Amount:</strong> ₹{policy.coverAmount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Premium:</strong> ₹{policy.premium.toLocaleString()}/year
                  </p>
                  <p>
                    <strong>Start Date:</strong> {policy.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {policy.endDate}
                  </p>
                  <p>
                    <strong>Criteria:</strong>{" "}
                    {policy.criteria.isNonSmoker ? "Non-Smoker" : "Smoker"} -{" "}
                    {policy.criteria.hasDisease ? "Has Disease" : "No Disease"}
                  </p>
                  <p>
                    <strong>Covered Diseases:</strong> {policy.coveredDiseases.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Register for Policy Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Register for a Policy</h2>
          <div className="bg-white shadow-md rounded-md p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleRegisterPolicy}>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Policy ID"
                value={policyId}
                onChange={(e) => setPolicyId(e.target.value)}
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Premium Paid"
                value={premiumPaid}
                onChange={(e) => setPremiumPaid(e.target.value)}
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <select
                className="p-3 text-gray-700 border rounded-md"
                value={isSmoker}
                onChange={(e) => setIsSmoker(e.target.value)}
                required
              >
                <option value="">Is Smoker</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <select
                className="p-3 text-gray-700 border rounded-md"
                value={hasDisease}
                onChange={(e) => setHasDisease(e.target.value)}
                required
              >
                <option value="">Has Disease</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div className="md:col-span-2">
                <label className="flex text-gray-700 items-center">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mr-2"
                    required
                  />
                  I consent to share my data with the insurance provider.
                </label>
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center"
                  disabled={isRegistering}
                >
                  {isRegistering ? (
                    <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6"></div>
                  ) : (
                    "Register"
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

export default Client;

import { useState } from "react";
import NavBar from "./components/NavBar";

const Client = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [policies] = useState([
    {
      policyId: "P001",
      policyType: "Health Shield",
      coverAmount: "5,00,000",
      premium: "10,000/year",
      startDate: "2024-01-01",
      endDate: "2029-12-31",
    },
    {
      policyId: "P002",
      policyType: "Family Care",
      coverAmount: "10,00,000",
      premium: "18,000/year",
      startDate: "2024-02-01",
      endDate: "2030-01-31",
    },
    {
      policyId: "P003",
      policyType: "Senior Citizen Plan",
      coverAmount: "3,00,000",
      premium: "8,000/year",
      startDate: "2024-03-01",
      endDate: "2028-12-31",
    },
  ]);

  // Handle policy registration
  const handleRegisterPolicy = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsRegistering(false);
    alert("Policy registered successfully!");
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
                  <strong>Cover Amount:</strong> {policy.coverAmount}
                </p>
                <p>
                  <strong>Premium:</strong> {policy.premium}
                </p>
                <p>
                  <strong>Start Date:</strong> {policy.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {policy.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Register for Policy Section */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Register for a Policy</h2>
          <div className="bg-white shadow-md rounded-md p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleRegisterPolicy}>
              <input
                type="text"
                placeholder="User ID"
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Policy ID"
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Premium Paid"
                className="p-3 text-gray-700 border rounded-md"
                required
              />
              <select className="p-3 text-gray-700 border rounded-md" required>
                <option value="">Is Smoker</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <select className="p-3 text-gray-700 border rounded-md" required>
                <option value="">Has Disease</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <div className="md:col-span-2">
                <label className="flex text-gray-700 items-center">
                  <input
                    type="checkbox"
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
import NavBar from "./components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />

      {/* Hero Section */}
      <header className="bg-blue-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Your Health, Our Priority</h1>
        <p className="text-2xl max-w-3xl mx-auto">
          Explore the best health insurance plans, hospitals, and services tailored to your needs.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-100">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <main className="">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 mt-9 ">
          {/* Card 1 */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <img
              src="/images/hospitals.jpeg"
              alt="Hospitals"
              className="mx-auto w-32 h-32 mb-4"
            />
            <h2 className="text-xl text-gray-900 font-semibold mb-2">Top Hospitals</h2>
            <p className="text-gray-600">
              Find the best hospitals near you for quality treatment and care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <img
              src="/images/iproviders.jpeg"
              alt="Insurance Providers"
              className="mx-auto w-32 h-32 mb-4"
            />
            <h2 className="text-xl text-gray-900 font-semibold mb-2">Insurance Providers</h2>
            <p className="text-gray-600">
              Compare and choose from trusted health insurance providers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white shadow-md rounded-md">
            <img
              src="/images/customers.png"
              alt="Clients"
              className="mx-auto w-32 h-32 mb-4"
            />
            <h2 className="text-xl text-gray-900 font-semibold mb-2">Our Clients</h2>
            <p className="text-gray-600">
              Join a growing network of satisfied customers.
            </p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-300 max-w-4xl mx-auto">
            We provide a seamless and transparent experience in finding the best insurance options for you. 
            Partnering with top hospitals and trusted insurance providers, we ensure your health and financial security.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-gray-900 font-semibold mb-2">100+ Hospitals</h3>
              <p className="text-gray-600">Extensive network across the country.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-gray-900 font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">We’re here to help, anytime, anywhere.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-gray-900 font-semibold mb-2">Affordable Plans</h3>
              <p className="text-gray-600">Plans that fit every budget.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl text-gray-900 font-semibold mb-2">Trusted by Millions</h3>
              <p className="text-gray-600">Join our growing community of clients.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-blue-50 py-6 ">
          <h2 className="text-3xl text-gray-900 font-bold text-center mb-6">What Our Clients Say</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-5 pr-5">
            <div className="bg-white  p-6 shadow-md rounded-md">
              <p className="text-gray-600 italic">
                "The insurance plans were perfect for my family. Excellent service and great support!"
              </p>
              <h4 className="mt-4 text-blue-500 font-bold">— Sarah K.</h4>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="text-gray-600 italic">
                "Seamless experience and the team was very professional. Highly recommend."
              </p>
              <h4 className="mt-4 text-blue-500 font-bold">— Rohan M.</h4>
            </div>
            <div className="bg-white p-6 shadow-md rounded-md">
              <p className="text-gray-600 italic">
                "Thanks to their plans, I found the perfect hospital for my treatment. A lifesaver!"
              </p>
              <h4 className="mt-4 text-blue-500 font-bold">— Anita P.</h4>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-blue-500 text-white py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Health?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Sign up now to explore the best plans, connect with top hospitals, and take control of your health journey.
          </p>
          <button className="px-8 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-100">
            Get Started
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4 mt-5 text-center">
        <p>© 2024 Health Insurance App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

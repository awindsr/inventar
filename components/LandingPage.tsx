import React from "react";


const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-3xl font-bold">Your Project Name</h1>
        <div>
          <Link to="/login" className="bg-primary text-black font-semibold px-4 py-2 rounded-lg mr-4">
            Login
          </Link>
          <Link to="/signup" className="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
        <p className="text-lg mb-6">
          Discover amazing features that help you manage your products efficiently and effectively.
        </p>
        <Link to="/get-started" className="bg-primary text-black font-semibold px-6 py-3 rounded-lg transition duration-200 hover:bg-opacity-80">
          Get Started
        </Link>

        <section className="mt-12 max-w-4xl">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>✔️ User-friendly interface for managing products</li>
            <li>✔️ Real-time inventory tracking</li>
            <li>✔️ Detailed analytics and reporting</li>
            <li>✔️ Secure login and user management</li>
            <li>✔️ Responsive design for all devices</li>
            <li>✔️ Integration with popular payment gateways</li>
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Project Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 
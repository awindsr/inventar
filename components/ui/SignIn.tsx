import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faChartLine,
  faUsers,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic here
      console.log("Login attempted with:", email, password);
    } else {
      // Handle signup logic here
      console.log("Signup attempted with:", email, password);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gradient text-white font-raleway">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-end justify-center gap-2">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="inventar logo"
            className="object-contain"
          />
          <h1 className="text-white font-raleway font-bold text-2xl">
            inventar
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="hover:text-green-500 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a
                href="#login"
                className="hover:text-green-500 transition-colors">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Streamline Your Inventory Management
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Effortlessly track, manage, and optimize your inventory with
            Inevntar. Boost efficiency and reduce costs with our powerful
            tools.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Get Started
          </button>
        </section>

        <section id="login" className="bg-green-500 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {isLogin ? "Login to Your Account" : "Create an Account"}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors">
                      {isLogin ? "Log In" : "Sign Up"}
                    </button>
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-green-500 hover:underline focus:outline-none">
                        {isLogin
                          ? "Need an account? Sign up"
                          : "Already have an account? Log in"}
                      </button>
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
                        Sign In with Google
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faChartLine}
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-300">
                Get instant insights into your inventory levels and performance.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faUsers}
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Multi-user Access</h3>
              <p className="text-gray-300">
                Collaborate with your team seamlessly with role-based access
                control.
              </p>
            </div>
            <div className="text-center">
              <FontAwesomeIcon
                icon={faLock}
                className="h-12 w-12 text-green-500 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Secure Data</h3>
              <p className="text-gray-300">
                Your inventory data is encrypted and securely stored in the
                cloud.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 InvenTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

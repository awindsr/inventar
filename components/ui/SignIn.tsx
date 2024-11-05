import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from 'react-icons/fc';


export function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleGoogleSignIn = async () => {
    const response = await signIn("google", { redirect: false });

    if (response?.ok === false) {
      // Redirect to onboarding if user does not exist in the database
      router.push("/onboarding");
    } else if (response?.ok && session?.user) {
      // Redirect to dashboard if user exists
      router.push("/dashboard");
    }
  };

  return (
<div className="flex h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-custom-gradient text-white">
        <img src="/logo.png" alt="Inventar Logo" className="mb-4" />
        <h1 className="text-4xl font-bold">Unlock Your Inventory Potential</h1>
        <p className="mb-6 text-gray-300">Sign in to access powerful tools and insights.</p>
      </div>
      {/* Right Side */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-white">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to Inventar</h2>
        <p className="mb-6 text-gray-600">Take control of your inventory with our user-friendly platform.</p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex items-center px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <FcGoogle className="mr-2" size={24} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

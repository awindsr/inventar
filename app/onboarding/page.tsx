"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '../../utils/supabase/client';
import { useSession } from "next-auth/react";



interface Organization {
  id: string;
  name: string;
}


export default function Onboarding() {
  const [organizationId, setOrganizationId] = useState<string>("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });
  const supabase = createClient();

  useEffect(() => {
    // Redirect to dashboard if user already has an organization
    if (session?.user?.organizationId) {
      router.push('/dashboard');
    }
  }, [session, router]);


  
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const { data, error } = await supabase
          .from("organizations")
          .select("id, name");
        
        if (error) throw error;
        setOrganizations(data || []);
      } catch (err) {
        console.error("Error fetching organizations:", err);
        setError("Failed to load organizations. Please try again later.");
      }
    };

    if (status === "authenticated") {
      fetchOrganizations();
    }
  }, [status]);

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!session?.user?.email) {
        throw new Error("No user session found");
      }

      // Update the existing user record
      const { error: updateError, status } = await supabase
        .from("users")
        .update({
          organization_id: parseInt(organizationId),
          mobile_number: mobileNumber,
          updated_at: new Date().toISOString()
        })
        .eq('email', session.user.email);
      if(status===204){
        router.push('/dashboard');
        return;
      }
      if (updateError) {
        throw updateError;
      }

      // Redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to complete onboarding. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please provide your organization and contact details
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleOnboardingSubmit} className="space-y-6">
            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-gray-900">
                Organization
              </label>
              <div className="mt-1">
                <select
                  id="organization"
                  value={organizationId}
                  onChange={(e) => setOrganizationId(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-9s00 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  disabled={loading}
                >
                  <option value="">Select your organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-black">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Complete Onboarding'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}